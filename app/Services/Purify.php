<?php

namespace App\Services;

use HTMLPurifier;
use HTMLPurifier_Config;

class Purify
{
    /**
     * Sanitize content
     */
    public static function sanitizeContent($html): string
    {
        $config = HTMLPurifier_Config::createDefault();
        $config->set('HTML.Allowed', 'div,p,b,i,em,strong,ul,ol,li,a[href],br,h1,h2,h3,h4,h5,h6');
        $config->set('CSS.AllowedProperties', 'color,font-family,font-size,line-height,text-align');
        $config->set('CSS.AllowTricky', false);
        $config->set('URI.AllowedSchemes', ['http' => true, 'https' => true, 'mailto' => true]);
        $config->set('Core.EscapeInvalidTags', true);
        $purifier = new HTMLPurifier($config);
        $sanitizedData = $purifier->purify($html);

        return str_replace('&amp;', '&', $sanitizedData);
    }
}
