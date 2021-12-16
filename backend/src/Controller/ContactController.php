<?php

namespace App\Controller;

use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use App\Entity\Attachment;
use App\Form\AttachmentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class ContactController extends Controller
{
    /** @var ValidatorInterface */
    private $validator;

    /**
     * @param ValidatorInterface $validator
     */
    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    /**
     * @Route(
     *     name     = "api_attachments_post_collection",
     *     path     = "/api/attachments",
     *     methods  = {"POST"},
     *     defaults = {
     *         "_format"                  = "jsonld",
     *         "_api_resource_class"      = Attachment::class,
     *         "_api_item_operation_name" = "post",
     *         "_api_receive"             = false
     *     }
     * )
     *
     * @param Request $request
     *
     * @return Attachment
     */
    public function create(Request $request)
    {
        $attachment = new Attachment();

        $form = $this->createForm(AttachmentType::class, $attachment);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($attachment);
            $em->flush();

            // Prevent the serialization of the file property
            $attachment->setFile(null);

            return $attachment;
        }

        // This will be handled by API Platform and returns a validation error.
        throw new ValidationException($this->validator->validate($attachment));
    }
}
