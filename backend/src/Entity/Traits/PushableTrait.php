<?php

namespace App\Entity\Traits;

/**
 * @author svianney <vianney@widop.com>
 */
trait PushableTrait
{
    /**
     * @var bool
     */
    protected $toBePushed = false;

    /**
     * @return bool
     */
    public function hasToBePushed()
    {
        return $this->toBePushed;
    }

    /**
     * @param bool $toBePushed
     */
    public function setToBePushed($toBePushed)
    {
        $this->toBePushed = $toBePushed;
    }
}
