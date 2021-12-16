<?php

namespace App\Handler;

use App\Entity\ManualOffer;

/**
 * @author Jonathan as Jerry <jonathan.d@widop.com>
 */
class ManualOfferHandler extends TargetFileHandler
{

    public function prepareCtaUpload(ManualOffer &$offer)
    {
        if (null === $offer->getCtaFile()) {
            return;
        }
        $filename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $offer->getTitle());
        $hash = sha1($filename);
        $filename = substr($filename, 0, 20);
        $offer->setFilePath("offer_{$filename}_{$hash}.{$offer->getCtaFile()->guessExtension()}");
    }

    public function uploadCtaFile(ManualOffer $offer)
    {
        // the file property can be empty if the field is not required
        if (null === $offer->getCtaFile()) {
            return;
        }

        // we use the original file name here but you should
        // sanitize it at least to avoid any security issues

        // move takes the target directory and target filename as params
        $file = $offer->getCtaFile()->move(
            ManualOffer::FILE_UPLOAD_ROOT,
            $offer->getFilePath()
        );

        // clean up the file property as you won't need it anymore
        $offer->setCtaFile(null);
    }

}
