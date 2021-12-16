<?php

namespace App\Entity\Traits;

use Symfony\Component\HttpFoundation\File\UploadedFile;

trait TargetFileTrait
{
    /**
     * Unmapped property to handle file uploads
     */
    public $vinsFile;

    /**
     * Unmapped property to handle file uploads
     */
    public $clientIdsFile;

    /**
     * @return UploadedFile
     */
    public function getClientIdsFile()
    {
        return $this->clientIdsFile;
    }

    /**
     * @param mixed $clientIdsFile
     */
    public function setClientIdsFile(UploadedFile $clientIdsFile = null): void
    {
        $this->clientIdsFile = $clientIdsFile;
    }

    /**
     * @return UploadedFile
     */
    public function getVinsFile()
    {
        return $this->vinsFile;
    }

    /**
     * @param UploadedFile $vinsFile
     */
    public function setVinsFile(UploadedFile $vinsFile = null): void
    {
        $this->vinsFile = $vinsFile;
    }
}
