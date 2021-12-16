<?php

namespace App\Soap\Transformer;

use App\Entity\Embed\Job;
use App\Entity\StaffSize;
use App\Entity\User;
use App\Soap\Repository\AbstractRepository;
use function Sodium\add;

/**
 * @author svianney <vianney@widop.com>
 */
class JobTransformer extends AbstractTransformer
{
    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return
            Job::class === $class
            && in_array($context, [TransformerContext::USER_CREATE, TransformerContext::JOB_UPDATE])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function transform($job, $modified = [])
    {
        /** @var Job $job */
        $user = $job->getUser();
        $date = (new \DateTime())->add(new \DateInterval('PT3H'));

        $contacts = $this->formatContacts($job, $user);

        return [
            'date_Modification' => $date->format(DATE_ATOM),
            'id_utilisateur'    => AbstractTransformer::SOURCE_ID,
            'id_client'         => $this->getTopDecider($job->getOrganization()->getContacts()) ?? $user->getExternalId(),
            'source'            => AbstractTransformer::SOURCE_ID,
            'ObjetContactsEntreprise'     => [
                'List_ContactEntreprise' => [
                    'contact_entreprise' => $contacts
                ]
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($data, $job = null)
    {
        if(null === $job) {
            $job = new Job();
        }

        $this->updateContacts($data, $job);

        $organization = $job->getOrganization();
        $organization->setContacts($data->contacts_entreprise->contact_entreprise ?? []);
        $organization->setName($data->raison_sociale2 ?? null);
        $organization->setSiret($data->siret ?? null);
        $organization->setSize($data->id_tranche_effectif ?? null);
        $organization->setNumberOfVehicles($data->nombre_vehicules_flotte ?? null);

        $naf = $organization->getNaf();
        $naf->setCode($data->APE ?? null);
        $naf->setLabel($data->libelle_APE ?? null);

        return $job;
    }

    /**
     * @param $data
     * @param Job $job
     */
    private function updateContacts($data, Job $job)
    {
        $contacts = $data->contacts_entreprise;

        if (empty($contacts) || empty($contacts->contact_entreprise)) {
            return;
        }

        foreach ($contacts->contact_entreprise as $contact) {
            // We can't match on external id as it will never be the same as company's contact id
            if ($contact->email === $data->email) {
                $job->setName($contact->fonction ?? null);
                $job->setDepartment($contact->service ?? null);
            }
        }
    }

    private function formatContacts(Job $job, User $user): array
    {
        $organization = $job->getOrganization();

        if (empty($organization->getName())) {
            return $this->removeUserFromContacts($organization->getContacts(), $user);
        }

        return $this->updateUserInContacts($organization->getContacts(), $user, $job);
    }

    private function removeUserFromContacts(array $contacts, User $user): array
    {
        foreach ($contacts as $key => $contact) {
            if ($contact['email'] === $user->getEmail()) {
                array_splice($contacts, $key, 1);
            }
        }

        return $contacts;
    }

    private function updateUserInContacts(array $contacts, User $user, Job $job): array
    {
        $userContact['nom']       = $user->getLastName();
        $userContact['prenom']    = $user->getFirstName();
        $userContact['email']     = $user->getEmail();
        $userContact['fonction']  = $job->getName();
        $userContact['service']   = $job->getDepartment();
        $userContact['telephone'] = $user->getNationalLandlinePhone();

        if (count($contacts) === 0) {
            $userContact['top_decideur'] = true;
            $contacts[] = $userContact;
            return $contacts;
        }

        foreach ($contacts as &$contact) {
            if ($contact['email'] === $user->getEmail()) {
                $contact = array_merge($contact, $userContact);
            }
        }

        return $contacts;
    }

    private function getTopDecider(array $contacts): ?int
    {
        foreach ($contacts as $contact) {
            if ($contact['top_decideur']) {
                return $contact['id_contact_entreprise'];
            }
        }

        return null;
    }
}
