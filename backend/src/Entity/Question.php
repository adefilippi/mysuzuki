<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Embed\QuestionCTA;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

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
 *          "order" = {"priority": "ASC"},
 *      }
 * )
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class Question {

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
     *
     * @ORM\Column(type = "text")
     *
     * @Assert\NotBlank
     *
     * @Groups({"t_read"})
     */
    private $question;

    /**
     * @var string
     *
     * @ORM\Column(type = "text")
     *
     * @Assert\NotBlank
     *
     * @Groups({"t_read"})
     */
    private $answer;

    /**
     * @var Topic
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\Topic", inversedBy = "questions")
     *
     * @Assert\NotNull(message = "question.topic.not_null")
     */
    private $topic;

    /**
     * @var int
     *
     * @ORM\Column(type = "integer")
     *
     * @Assert\NotBlank
     * @Assert\Type("integer")
     *
     * @Groups({"t_read"})
     *
     * @Gedmo\SortablePosition
     */
    private $position = 50;

    /**
     * @var Question[]|ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity = "App\Entity\Question")
     *
     * @Groups({"t_read"})
     */
    private $associatedQuestions;

    /**
     * @var QuestionCTA
     *
     * @ORM\Embedded(class = "App\Entity\Embed\QuestionCTA")
     *
     * @Assert\Valid(groups={"question_validation"})
     */
    private $cta;

    public function __construct()
    {
        $this->associatedQuestions = new ArrayCollection();
        $this->cta = new QuestionCTA();
    }

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
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * @param string $question
     */
    public function setQuestion($question)
    {
        $this->question = $question;
    }

    /**
     * @return string
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * @param string $answer
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;
    }

    /**
     * @return Topic
     */
    public function getTopic()
    {
        return $this->topic;
    }

    /**
     * @param Topic $topic
     */
    public function setTopic($topic)
    {
        $this->topic = $topic;
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
     * {@inheritdoc}
     */
    public function __toString()
    {
        return "Question : $this->question";
    }

    /**
     * @return Question[]|ArrayCollection
     */
    public function getAssociatedQuestions()
    {
        return $this->associatedQuestions;
    }

    /**
     * @param Question[]|ArrayCollection $associatedQuestions
     */
    public function setAssociatedQuestions($associatedQuestions)
    {
        $this->associatedQuestions = $associatedQuestions;
    }

    /**
     * @param $question
     */
    public function addAssociatedQuestion($question)
    {
        if ($this->associatedQuestions->contains($question) || $question === $this) {
            return;
        }

        $this->associatedQuestions->add($question);
    }

    /**
     * @param $question
     */
    public function removeAssociatedQuestion($question)
    {
        $this->associatedQuestions->removeElement($question);
    }

    /**
     * @return QuestionCTA
     */
    public function getCta()
    {
        return $this->cta;
    }

    /**
     * @param QuestionCTA $cta
     */
    public function setCta($cta)
    {
        $this->cta = $cta;
    }
}
