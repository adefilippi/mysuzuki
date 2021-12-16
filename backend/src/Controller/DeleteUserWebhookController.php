<?php

namespace App\Controller;

use App\Entity\AccessToken;
use App\Entity\Attachment;
use App\Entity\AuthCode;
use App\Entity\EmailConfirmationToken;
use App\Entity\Issue;
use App\Entity\Offer;
use App\Entity\Participation;
use App\Entity\PasswordChange;
use App\Entity\PasswordRequestToken;
use App\Entity\RefreshToken;
use App\Entity\User;
use App\Entity\Vin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DeleteUserWebhookController extends AbstractController
{
    private const UNAUTHORIZED_MESSAGE = 'Wrong or missing Api Key';

    /** @var EntityManagerInterface */
    private $manager;

    /** @var string */
    private $deleteUserWebhookApiKey;

    /** @var LoggerInterface */
    private $logger;

    public function __construct(
        string $deleteUserWebhookApiKey,
        LoggerInterface $logger,
        EntityManagerInterface $manager
    )
    {
        $this->deleteUserWebhookApiKey = $deleteUserWebhookApiKey;
        $this->logger = $logger;
        $this->manager = $manager;
    }

    /**
     * @Route(
     *     name    = "webhook_users_delete",
     *     path    = "/webhooks/users/{externalId}",
     *     methods = {"DELETE"}
     * )
     *
     * @param Request $request
     * @param User    $user
     *
     * @return JsonResponse
     */
    public function deleteUser(
        Request $request,
        User $user
    ): JsonResponse
    {
        $apiKey = $request->headers->get('X-Api-Key');

        if (null === $apiKey || $apiKey !== $this->deleteUserWebhookApiKey) {
            return new JsonResponse(['message' => self::UNAUTHORIZED_MESSAGE], Response::HTTP_UNAUTHORIZED);
        }

        $this->remove($user);

        return new JsonResponse([], Response::HTTP_NO_CONTENT);
    }

    /**
     * Deletes a Doctrine entity only if it isn't null
     *
     * @param $object
     */
    private function removeIfExists($object): void
    {
        if (null === $object) {
            return;
        }
        
        $this->manager->remove($object);
    }

    /**
     * Deletes several Doctrine entities
     *
     * @param iterable $objects
     */
    private function removeMultiple(iterable $objects): void
    {
        if (count($objects) === 0) {
            return;
        }

        $this->logger->info('Deleting '.get_class($objects[0]));
        foreach ($objects as $object) {
            $this->removeIfExists($object);
        }
        $this->logger->info('Deleted '.get_class($objects[0]));
    }

    /**
     * Deletes every user-related entities based on the provided user, then removes the user itself
     *
     * @param User $user
     */
    private function remove(User $user): void
    {
        $this->logger->info('Deleting user '.$user->getId());
        $this->logger->info('-------');

        /** @var Offer[] $offers */
        $offers = $this->manager->getRepository(Offer::class)->findAllByUser($user);

        $this->logger->info('Deleting offers_users entries');
        foreach ($offers as $offer) {
            $offer->removeUser($user);
        }
        $this->logger->info('Deleted offers_users_entries');

        $this->logger->info('Deleting offers PDFs');
        array_map('unlink', glob(Offer::FILE_UPLOAD_ROOT . "/offer_{$user->getExternalId()}_*"));
        $this->logger->info('Deleted offers PDFs');

        $this->logger->info('Deleting issues and attachments');
        /** @var Issue[] $issues */
        $issues = $this->manager->getRepository(Issue::class)->findByEmail($user->getEmail());
        foreach ($issues as $issue) {
            if (null !== $issue->getAttachment()) {
                unlink(__DIR__ . '/../../public' . $issue->getAttachment()->getContentUrl());
                $this->manager->remove($issue->getAttachment());
            }

            $this->manager->remove($issue);
        }
        $this->logger->info('Deletes issues and attachments');

        $this->logger->info('Deleting vehicles');
        foreach ($user->getVehicles() as $vehicle) {
            foreach ($vehicle->getMaintenances() as $maintenance) {
                $this->removeIfExists($maintenance);
                $this->logger->info('Deleted maintenance '.$maintenance->getId());
            }

            $this->removeIfExists($vehicle);
            $this->logger->info('Deleted vehicle '.$vehicle->getId());
        }
        $this->logger->info('Deleted vehicles');

        $this->removeMultiple($this->manager->getRepository(Vin::class)->findByClientId($user->getExternalId()));
        $this->removeMultiple($this->manager->getRepository(PasswordChange::class)->findByUser($user));
        $this->removeMultiple($this->manager->getRepository(Participation::class)->findByUser($user));
        $this->removeIfExists($user);

        $this->logger->info('Deleted user '.$user->getId());

        $this->manager->flush();
    }
}
