<?php

namespace App\Soap\Transformer;

/**
 * @author svianney <vianney@widop.com>
 */
class TransformerContext
{
    const USER_CREATE = 'user_create';
    const USER_CREATE_ALT = 'user_create_alt';
    const VIN = 'vin';
    const USER_UPDATE = 'user_update';
    const JOB_UPDATE = 'job_update';
    const VEHICLE_UPDATE = 'vehicle_update';
    const PULL_USER_VEHICLES = 'pull_user_vehicles';
    const DEALERSHIP = 'dealership';
    const WEB_DEALERSHIP = 'web_dealership';
    const MAINTENANCE = 'maintenance';
    const OFFER = 'offer';
}
