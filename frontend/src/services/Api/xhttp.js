import { Config } from "./config";
import { APIUtils } from "./index";
import * as Sentry from '@sentry/browser';

const UNSIGNED_AUTHORIZATION = "Authorization";

function signParams(params, unsigned) {
    let signedParams = { ...params };
    if (!signedParams.headers) signedParams.headers = {};

    if (unsigned) {
        signedParams.headers[UNSIGNED_AUTHORIZATION] = `Bearer ${Config.appToken}`;
    }

    return signedParams;
}

export function XHTTP(endPoint, params, unsigned) {
    return new Promise((resolve, reject) => {
        const fullUrl = APIUtils.generateUrl(endPoint);
        let signedParams = signParams(params, unsigned);

        if (signedParams.body && typeof signedParams.body === 'string') {
            // FIXME: remove or anonymize data here
            Sentry.addBreadcrumb({
                category: 'fetch',
                data: {request: JSON.parse(signedParams.body)},
                type: 'http',
            })
        }

        fetch(fullUrl, signedParams)
            .then((response) => {
                const toCall = response.status < 400 ? resolve : reject;
                response.json().then((json) => {
                    // FIXME: remove or anonymize data here
                    Sentry.addBreadcrumb({
                        category: 'fetch',
                        data: {response: json},
                        type: 'http',
                    })

                    if (response.status >= 400) Sentry.captureException(new Error(json['hydra:description'] || JSON.stringify(json)));

                    return toCall(json)
                }).catch(toCall);
            })
            .catch((error) => {
                Sentry.captureException(error);
                reject(error);
            });
    });
}
