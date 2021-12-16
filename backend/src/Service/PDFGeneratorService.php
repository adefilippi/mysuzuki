<?php


namespace App\Service;


use App\Entity\Offer;
use App\Enum\ReductionTypeEnum;
use Symfony\Component\Translation\TranslatorInterface;

class PDFGeneratorService
{
    const PDF_AUTHOR = 'mySuzuki';
    const PDF_KEYWORDS = 'mySuzuki, suzuki, coupon, offer';

    /** @var TranslatorInterface */
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function trans($message, $parameters = [])
    {
        return $this->translator->trans($message, $parameters, 'messages');
    }

    public function createPDF(Offer $offer): ?string
    {
        $tcpdf = new \TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

        $darkblue = [12, 45, 67];
        $white = [255, 255, 255];
        $lightblue = [97, 186, 234];
        $verylightblue = [231, 241, 254];

        // Variables
        $endDate = $offer->getEndDate()->format('d/m/Y');
        $dealership = $offer->getDealership();
        $dealershipName = null === $dealership ? '' : ' '.$dealership->getName();
        $value = '-'.$offer->getValue();
        switch ($offer->getReductionType()) {
            case ReductionTypeEnum::FREE:
                $value = $this->trans('pdf.coupon.value-free');
                break;
            case ReductionTypeEnum::PERCENT:
                $value .= '%';
                break;
            case ReductionTypeEnum::VALUE:
                $value .= '€';
                break;
        }

        $tcpdf->SetCreator(PDF_CREATOR);
        $tcpdf->SetAuthor(self::PDF_AUTHOR);
        $tcpdf->SetTitle($this->trans('pdf.pdf-title', ['{barcode}' => $offer->getBarcode()]));
        $tcpdf->SetKeywords(self::PDF_KEYWORDS);

        $tcpdf->setPrintHeader(false);
        $tcpdf->setPrintFooter(false);

        $tcpdf->SetMargins(PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT);
        $tcpdf->SetAutoPageBreak(true, 0);
        $tcpdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        $tcpdf->SetFont('helvetica', '', 11);

        $tcpdf->AddPage();

        $style3 = ['width' => 1, 'cap' => 'round', 'join' => 'round', 'dash' => '2,10', 'color' => [0, 0, 0]];
        $style4 = [
            'width' => 1, 'cap' => 'round', 'join' => 'round', 'dash' => '2,10', 'color' => [0, 0, 0],
            'T' => ['width' => 0.5, 'cap' => 'butt', 'join' => 'miter', 'dash' => '3,10', 'phase' => 10, 'color' => [0, 0, 0]]
            ];

        $tcpdf->Rect(0, 0, 210, 80, 'DF', $style3, $darkblue);

        $tcpdf->Rect(0, 90, 210, 80, 'DF', $style3, $white);
        $tcpdf->Rect(0, 80, 210, 20, 'DF', $style3, $lightblue);


        $tcpdf->Rect(0, 179, 210, 119, 'DF', $style4, $verylightblue);
        $tcpdf->Rect(5, 186, 200, 105, 'DF', $style3, $white);


        $tcpdf->Rect(5, 183, 200, 20, 'DF', $style3, $darkblue);
        $tcpdf->Rect(25, 183, 180, 20, 'DF', $style3, $lightblue);

        $topLogoProps = ['x'=>0, 'y'=>0, 'w'=>56, 'h'=>28];
        $topLogoBorder = 0.25;
        $tcpdf->Rect($topLogoProps['x'], $topLogoProps['y'], $topLogoProps['w']+$topLogoBorder, $topLogoProps['h']+$topLogoBorder, 'F', [], $white);
        $tcpdf->Image(__DIR__.'/../../resources/img/logo_mysuzuki.png', $topLogoProps['x'], $topLogoProps['y'], $topLogoProps['w'], $topLogoProps['h'], 'PNG', null, '', true, 150, '', false, false, 0, false, false, false);

        $txt = $this->trans('pdf.slogan-translation')."\n";
        $tcpdf->SetFont('helvetica', '', 10, '', 'false');
        $tcpdf->SetTextColor(0,0,0,0);
        $tcpdf->MultiCell(70, 0, $txt, 0, 'L', false, 1, 28, 28, true, 0, false, true, 0, 'T', false);

        $txt = $this->trans('pdf.title')."\n";
        $tcpdf->SetFont('helvetica', 'B', 24, '', 'false');
        $tcpdf->MultiCell(70, 0, $txt, 0, 'J', false, 1, 72, 33, true, 0, false, true, 0, 'T', false);

        $tcpdf->Image(__DIR__.'/../../resources/img/logo.png', 81, 45, 45, 15, 'PNG', null, '', true, 150, '', false, false, 0, false, false, false);

        $txt = "> {$this->trans('pdf.validity', ['{date}' => $endDate])} <";
        $tcpdf->AddFont('', '', 'resources/fonts/SuzukiPROHeadline.otf');
        $tcpdf->MultiCell(180, 0 , $txt, 0, 'L', false, 1, 15, 85, true, 0, false, true, 0, 'T', false);

        $txt = $this->trans('pdf.content.message1')." \n";
        $tcpdf->SetFont('helvetica', 'B', 22, '', 'false');
        $tcpdf->SetTextColor(51,51,51,51);
        $tcpdf->MultiCell(140, 0, $txt, 0, 'C', false, 1, 34, 113, true, 0, false, true, 0, 'T', false);

        $txt = $this->trans('pdf.content.message2', ['{dealershipName}' => $dealershipName]);
        $tcpdf->SetFont('helvetica', '', 22, '', 'false');
        $tcpdf->MultiCell(140, 0, $txt, 0, 'C', false, 1, 34, 126, true, 0, false, true, 0, 'T', false);

        $txt = $this->trans('pdf.content.disclaimer', ['{dealershipName}' => $dealershipName, '{date}' => $endDate]);
        $tcpdf->SetFont('helvetica', '', 14, '', 'false');
        $tcpdf->MultiCell(200, 0, $txt, 0, 'L', false, 1, 5, 160, true, 0, false, true, 0, 'T', false);

        $txt = $this->trans('pdf.coupon.title')." \n";
        $tcpdf->SetFont('helveticaB', 'B', 21, '', 'false');
        $tcpdf->SetTextColor(0,0,0,0);
        $tcpdf->MultiCell(140, 0, $txt, 0, 'J', false, 1, 30, 188, true, 0, false, true, 0, 'T', false);

        $tcpdf->SetFont('helveticaB', 'B', 80, '', 'false');
        $tcpdf->SetTextColor(255,255,255,255);
        $tcpdf->MultiCell(130, 0, $value, 0, 'L', false, 1, 13, 210, true, 0, false, true, 0, 'T', false);

        $tcpdf->SetFont('helveticaB', 'B', 18, '', 'false');
        $tcpdf->MultiCell(110, 0, $offer->getTitle(), 0, 'L', false, 1, 13, 245, true, 0, false, true, 0, 'T', false);

        $txt = $this->trans('pdf.coupon.disclaimer', ['{dealershipName}' => $dealershipName, '{date}' => $endDate]);
        $tcpdf->SetFont('helvetica', '', 12, '', 'false');
        $tcpdf->MultiCell(190, 0, $txt, 0, 'L', false, 1, 8, 277, true, 0, false, true, 0, 'T', false);

        $tcpdf->Image(__DIR__.'/../../resources/img/logo_mysuzuki_1.png', 186, 183, 19, 20, 'PNG', null, '', true, 150, '', false, false, 0, false, false, false);
        $tcpdf->Image(__DIR__.'/../../resources/img/logo_mysuzuki_2.png', 186, 203, 19, 20, 'PNG', null, '', true, 150, '', false, false, 0, false, false, false);

        $txt = $this->trans('pdf.slogan-translation');
        $tcpdf->SetFont('helvetica', '', 7, '', 'false');
        $tcpdf->MultiCell(25, 0, $txt, 0, 'L', false, 1, 186, 223, true, 0, false, true, 0, 'T', false);


        $style = [
            'position' => '',
            'align' => 'C',
            'stretch' => false,
            'fitwidth' => true,
            'cellfitalign' => '',
            'border' => false,
            'hpadding' => 'auto',
            'vpadding' => 'auto',
            'fgcolor' => [0,0,0],
            'bgcolor' => false,
            'text' => true,
            'font' => 'helvetica',
            'fontsize' => 8,
            'stretchtext' => 4
        ];

        //var_dump($offer->getBarcode());
        $tcpdf->write1DBarcode($offer->getBarcode(), 'EAN13', 140, 240, '', 28, 1, $style, 'N');


        $tcpdf->setHeaderFont([PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN]);
        $tcpdf->setFooterFont([PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA]);

        $tcpdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

        $tcpdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        $tcpdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $tcpdf->SetFooterMargin(0);
        
        $tcpdf->Ln();

        $hash = uniqid();
        $fileName = "offer_{$offer->getExternalId()}_{$hash}.pdf";
        $filePath = Offer::FILE_UPLOAD_ROOT.'/'.$fileName;
        try {
            $tcpdf->Output($filePath, 'F');
        } catch (\Exception $e) {
            return null;
        }
        
        return $fileName;
    }
}