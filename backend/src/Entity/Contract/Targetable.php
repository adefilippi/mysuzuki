<?php

namespace App\Entity\Contract;

use Doctrine\Common\Collections\Collection;

interface Targetable extends OwnedInterface
{
    function getTargetType(): string;
    function getClientIdsFile();
    function getVinsFile();
}
