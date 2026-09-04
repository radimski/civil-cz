<?php
/**
 * Copy to config.php and fill in. Never commit config.php.
 * SMTP host is from the live civil.cz MX/SPF (smtp.arkal.cz) — confirm in the panel.
 */
return array(
    'secret' => 'CHANGE-ME-to-64-random-hex-chars',
    'allowedOrigins' => array(
        'www.civil.cz',
        'civil.cz',
        'localhost',
    ),
    'turnstileSecretKey' => '',
    'dataDir' => __DIR__ . '/data',
    'retentionDays' => 365,
    'nonceTtl' => 7200,
    'store' => true,
    'mail' => array(
        'enabled' => true,
        'transport' => 'auto',
        'from' => 'podatelna@civil.cz',
        'fromName' => 'CIVIL PROJECTS web',
        'smtp' => array(
            'host' => 'smtp.arkal.cz',
            'port' => 587,
            'security' => 'tls',
            'user' => 'podatelna@civil.cz',
            'pass' => 'CHANGE-ME',
            'timeout' => 15,
        ),
    ),
    'exportToken' => '',
    'debug' => false,
);
