<?php

namespace App\Entity\Contract;

use Doctrine\Common\Collections\Collection;

interface OwnedInterface
{
    function getUsers(): Collection;
    function setUsers($user): void;
}
