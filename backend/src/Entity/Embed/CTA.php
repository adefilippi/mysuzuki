<?php

namespace App\Entity\Embed;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author Thibault Richard <thibault@widop.com>
 *
 * @ORM\Embeddable
 */
class CTA
{
    /**
     * @var string
     *
     * @Assert\Expression(
     *     expression = "(this.getType() != 'link') or (this.getType() == 'link' and (this.getContent() != ''))",
     *     groups     = {"question_validation", "offer_validation"}
     * )
     *
     * @ORM\Column(type = "string", nullable = true)
     * @Groups("offer_read")
     */
    protected $content;

    /**
     * @var string
     *
     * @Assert\Choice(callback={"App\Enum\CTATypeEnum", "toArray"}, groups = {"offer_validation"})
     * @Assert\Choice(callback={"App\Enum\QuestionCTATypeEnum", "toArray"}, groups = {"question_validation"})
     *
     * @ORM\Column(type = "string", nullable = true)
     * @Groups("offer_read")
     */
    protected $type;

    /**
     * @var string
     *
     * @Assert\Expression(
     *     expression = "(this.getType() != 'link') or (this.getType() == 'link' && this.getLabel() != '')",
     *     groups     = {"question_validation", "offer_validation"}
     * )
     *
     * @ORM\Column(type = "string", nullable = true)
     * @Groups("offer_read")
     */
    protected $label;

    public function __construct(?string $type = null, ?string $content = null)
    {
        $this->setType($type);
        $this->setContent($content);
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
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
}
