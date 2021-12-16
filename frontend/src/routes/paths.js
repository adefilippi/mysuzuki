export const PATHS = {
    ROOT: "/",
    SIGN_UP: {
        ROOT: "/inscription/",
        SERIAL_STEP: "/inscription/vin/",
        CREDENTIAL_STEP: "/inscription/email/",
        VEHICULE_STEP: "/inscription/vehicule/",
        PERSONAL_STEP: "/inscription/personnel/"
    },
    WELCOME: "/bienvenue/",
    FORGOT_PASSWORD: "/mot-de-passe-oublie/",
    DEALERSHIPS: {
        ROOT: "/ma-concession/"
    },
    VEHICLES: {
        ROOT: "/mes-vehicules/",
        VEHICLE: {
            ROOT: "/mes-vehicules/:vehicleId",
            buildPathFromVehicleId: (vehicleId) => `/mes-vehicules/${vehicleId}/`
        }
    },
    ACCOUNT: {
        ROOT: "/mon-compte/"
    },
    DEALS: {
        ROOT: "/offres-et-avantages/"
    },
    ARTICLES: {
        ROOT: "/tutos-et-conseils/",
        TUTORIAL: "/tutos-et-conseils/nos-tutoriels/",
        ADVICE: "/tutos-et-conseils/nos-conseils/",
    },
    NEWS: {
        ROOT: "/actualites/"
    },
    ARTICLE: {
        ROOT: "/tutos-et-conseils/:slug",
        NEWS_ROOT: "/actualites/:slug",
        buildPath: (slug) => PATHS.ARTICLE.ROOT.replace(':slug', slug),
        buildNewsPath: (slug) => PATHS.ARTICLE.NEWS_ROOT.replace(':slug', slug),
    },
    FAQ: {
        ROOT: "/faq",
        TOPIC: {
            ROOT:"/faq/topic/:topicId",
            buildPath: (topicId) => PATHS.FAQ.TOPIC.ROOT.replace(':topicId', topicId),
            QUESTION: {
                ROOT: "/faq/topic/:topicId/question/:questionId",
                buildPath: (topicId, questionId) =>
                  PATHS.FAQ.TOPIC.QUESTION.ROOT
                    .replace(':topicId', topicId)
                    .replace(':questionId', questionId)
            }
        }
    },
    ADMIN_SESSION: {
        ROOT: "/login-as/token=:token/",
        buildPath: (token) => PATHS.FAQ.TOPIC.ROOT.replace(':token', token),
    }
};
