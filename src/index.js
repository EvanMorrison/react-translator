import React from 'react';
import { isNil, isString, isNumber } from 'lodash';

const ReactTranslator = {
  defaultLanguageKey: null,
  defaultLanguageLibrary: null,

  language: null,

  languages: {},

  changeLanguage(language) {
    if (this.languages.hasOwnProperty(language)) {
      this.language = language;
    } else {
      this.language = this.defaultLanguageKey;
    }
  },

  findTranslation(translation, id) {
    const idPieces = id.split('.');

    for (let i = 0; i < idPieces.length; i++) {
      const piece = idPieces[i];
      if (isNil(translation[piece])) {
        return null;
      } else {
        translation = translation[piece];
      }
    }

    return translation;
  },

  registerDefaultLanguage(key, library) {
    this.defaultLanguageKey = key;
    this.defaultLanguageLibrary = library;
    if (this.language === null) {
      this.language = this.defaultLanguageKey;
    }
    this.registerLanguage(key, library);
  },

  registerLanguage(key, library) {
    const languages = this.languages;
    languages[key] = library;
    this.languages = languages;
  },

  translate(id, values = {}) {
    const library = this.getLibrary();
    if (typeof library === 'undefined') {
      return id;
    }

    let translation = this.findTranslation(library, id);

    // defaults
    if (isNil(translation) && this.language !== this.defaultLanguageKey) {
      translation = this.findTranslation(this.getLibrary(this.defaultLanguageKey), id);
    }
    if (isNil(translation)) {
      translation = id;
    }

    function interpolate(part, values) {
      if (isNumber(part)) return part;
      if (isString(part)) {
        for (const key in values) {
          part = part.split('${' + key + '}').join(values[key]);
        }
        return part;
      } else if (typeof part === 'function') {
        part = part(values);
        if (React.isValidElement(part)) {
          const children = React.Children.map(part.props.children, child => interpolate(child, values));
          return React.cloneElement(part, {}, ...children);
        }
      }
      return part;
    }

    return interpolate(translation, values);
  },

  getLibrary(language = this.language) {
    return this.languages[language];
  },
};

export function simpleTranslatorReactPlugin(Translator) {
  Translator.translate = ReactTranslator.translate.bind(Translator);
}

export default ReactTranslator;
