import { createContext, useContext } from 'react';

//Note that whatever is used as separator will not be supported as part of a key
const TRANSLATION_KEY_SEPARATOR = '.';
export type LocaleData = {
    [key: string]: string | LocaleData
}
export type I18nContextData = {
    setLocale: (data: LocaleData) => void;
    locale: LocaleData;
}

/**
 * This takes a locale object and a function to change the locale. How the locale is retrieved and managed as state is left up to the consumer of this library,
 * A simple way is to do it with a useState on the root application and to import the json files with the locales.
 */
export const I18nContext = createContext({} as I18nContextData);

export type I18nTextProps = {
    text: string
}

export const useTranslate = () => {
    const i18nContext = useContext(I18nContext);
    /**
     * The translation key should be a valid key (containing valid strings separated with a dot). If the key is not found on the currently selected locale the fallback if provided will be returned, otherwise the key will be returned instead
     */
    return (translationKey: string, fallback: string) => {
        const parts = translationKey.split(TRANSLATION_KEY_SEPARATOR);
        let translated: string | undefined = undefined;
        let lastObj = i18nContext.locale;
        for (let key of parts) {
            const currentObj = lastObj[key];
            if (typeof currentObj === 'object') {
                lastObj = currentObj;
            } else if (typeof currentObj === 'string') {
                translated = currentObj;
            } else {
                break;
            }
        }
        if (translated) {
            return translated;
        } else if (fallback) {
            return fallback;
        } else {
            return translationKey;

        }
    }
}