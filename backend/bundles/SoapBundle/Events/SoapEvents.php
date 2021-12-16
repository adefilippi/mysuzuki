<?php

namespace SoapBundle\Events;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 */
class SoapEvents
{
    const SET_WSDL = 'soap_factory.set_wsdl';
    const PRE_CALL = 'soap_client.pre';
    const REQUEST = 'soap_client.request';
    const POST_CALL = 'soap_client.post';
    const EXCEPTION = 'soap_client.exception';
}
