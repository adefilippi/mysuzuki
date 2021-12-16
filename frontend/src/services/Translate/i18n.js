import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        load: "currentOnly",
        lng: `fr`,
        fallbackLng: "fr",
        ns: ["common"],
        defaultNS: "common",
        debug: false,
        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true
        }
    });

export { i18n };
