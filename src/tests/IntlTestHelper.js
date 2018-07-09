import React from "react";
import {IntlProvider} from "react-intl";

const enTranslationData = require("./../localisation/locales/en/en.json");

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider(
    { locale: 'en', messages: enTranslationData }, {}
);
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
export function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}