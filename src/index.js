import React from 'react';
import { get, isNil, isString, isNumber } from 'lodash';

const ReactTranslator = {
  defaultLanguageKey: null,
  defaultLanguageLibrary: null,

  language: null,

  languages: {},

  changeLanguage(language) {
    if (!isNil(this.languages[language])) {
      this.language = language;
    } else {
      this.language = this.defaultLanguageKey;
    }
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
    this.languages[key] = library;
    if (isNil(this.language)) {
      this.language = key;
    }
  },

  translate(path, values = {}) {
    const translation = get(this.languages[this.language], path, get(this.defaultLanguageLibrary, path, null));

    if (isNil(translation)) {
      return path;
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
