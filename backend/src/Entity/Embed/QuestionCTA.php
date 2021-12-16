<?php

namespace App\Entity\Embed;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author Thibault Richard <thibault@widop.com>
 *
 * @ORM\Embeddable
 */
class QuestionCTA extends CTA
{
    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     */
    private $issueType;

    /**
     * @return string
     */
    public function getIssueType()
    {
        return $this->issueType;
    }

    /**
     * @param string $issueType
     */
    public function setIssueType($issueType)
    {
        $this->issueType = $issueType;
    }
}
