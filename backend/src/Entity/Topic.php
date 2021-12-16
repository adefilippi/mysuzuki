<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Serializer\Annotation\Files;
use ApplicationSonataMediaBundle\Entity\Media;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="Gedmo\Sortable\Entity\Repository\SortableRepository")
 *
 * @ApiResource(
 *      itemOperations = {"get"},
 *      collectionOperations = {"get"},
 *      attributes = {
 *          "normalization_context" = {
 *              "groups" = {"t_read"}
 *          },
 *      }
 * )
 *
 * @Files(fileFields = {"icon"})
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class Topic {

    /**
     * @var integer
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     *
     * @Groups({"t_read"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(type = "string")
     *
     * @Groups({"t_read"})
     */
    private $label;

    /**
     * @var Question[]|ArrayCollection
     *
     * @ORM\OneToMany(targetEntity = "App\Entity\Question", mappedBy = "topic", cascade = {"persist"})
     * @ORM\OrderBy({"position" = "ASC"})
     *
     * @Groups({"t_read"})
     */
    private $questions;

    /**
     * @var int
     *
     * @ORM\Column(type = "integer")
     *
     * @Groups({"t_read"})
     *
     * @Gedmo\SortablePosition
     */
    private $position = 50;

    /**
     * @var Media
     *
     * @ORM\ManyToOne(
     *     targetEntity = "ApplicationSonataMediaBundle\Entity\Media",
     *     cascade      = {"persist"},
     *     fetch        = "EAGER"
     * )
     */
    private $media;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * @param string $label
     */
    public function setLabel($label)
    {
        $this->label = $label;
    }

    /**
     * @return Question[]|ArrayCollection
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * @param Question[]|ArrayCollection $questions
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;
    }

    /**
     * @param Question $question
     */
    public function addQuestion($question)
    {
        if ($question->getTopic() === null) {
            $question->setTopic($this);
        }

        if (!$this->questions->contains($question)) {
            $this->questions->add($question);
        }
    }

    /**
     * @param Question $question
     */
    public function removeQuestion($question)
    {
        if ($this->questions->contains($question)) {
            $question->setTopic(null);
            $this->questions->removeElement($question);
        }
    }

    /**
     * @return int
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * @param int $position
     */
    public function setPosition($position)
    {
        $this->position = $position;
    }

    /**
     * @return Media
     */
    public function getMedia()
    {
        return $this->media;
    }

    /**
     * @param Media $media
     */
    public function setMedia($media)
    {
        $this->media = $media;
    }

    /**
     * @return null|string
     *
     * @Groups({"t_read"})
     */
    public function getIcon()
    {
        return $this->media ? $this->media->getPath() : null;
    }

    /**
     * {@inheritdoc}
     */
    public function __toString()
    {
        return "Sujet : $this->label";
    }
}
