import React from 'react';
import { isNil, isString, isNumber } from 'lodash';

function translate(id, values = {}) {
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
}

function ReactTranslator(Translator) {
  Translator.translate = translate.bind(Translator);
}

export default ReactTranslator;
