<?php

namespace App\Entity\Embed;

use App\Entity\User;
use App\Soap\Annotation\SoapRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Embeddable
 *
 * @SoapRepository(repositoryClass = "App\Soap\Repository\JobRepository")
 */
class Job
{
    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\Length(max = 40, maxMessage = "user.job.name.max_length")
     *
     * @Groups({"read", "update"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\Length(max = 30, maxMessage = "user.job.department.max_length")
     *
     * @Groups({"read", "update"})
     */
    private $department;

    /**
     * @var Organization
     *
     * @ORM\Embedded(class = "App\Entity\Embed\Organization")
     *
     * @Assert\Valid
     *
     * @Groups({"read", "update"})
     */
    private $organization;

    /**
     * @var User
     */
    private $user;

    public function __construct()
    {
        $this->organization = new Organization();
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getDepartment()
    {
        return $this->department;
    }

    /**
     * @param string $department
     */
    public function setDepartment($department)
    {
        $this->department = $department;
    }

    /**
     * @return Organization
     */
    public function getOrganization()
    {
        return $this->organization;
    }

    /**
     * @param Organization $organization
     */
    public function setOrganization(Organization $organization = null)
    {
        $this->organization = $organization;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }
}
