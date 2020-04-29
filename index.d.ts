import * as React from 'react';

declare module "simple-translator-react" {
  export interface Translator {
    defaultLanguageKey: string | null;
    defaultLanguageLibrary: object | null;
    language: string | null;
    languages: object;
    /** Switch from the current language to a another registered language. */
    changeLanguage(languageKey: string): void;
    /** Returns the library data object for the given language key */
    getLibrary(languageKey: string): object;
  }

  interface SimpleTranslatorLibrary {
    [pathToEntry: string] : string | SimpleTranslatorLibrary;
  }

  interface ReactTranslatorLibrary {
    [pathToEntry: string] : React.ReactNode | ReactTranslatorLibrary;
  }

  interface SimpleTranslator extends Translator {
    /** Sets the default language and library data set for this instance of Translator */
    registerDefaultLanguage(languageKey: string, library: SimpleTranslatorLibrary): void;
    /** Adds a language data set to the set of available languages.  */
    registerLanguage(languageKey: string, library: SimpleTranslatorLibrary): void;
    /** Returns the translation entry for a given key or path in the library data structure. Optional 'values' object contains key-value pairs for dynamic substitution. If no entry is found, path is returned. */
    translate(path: string, values?: object): string;

  }

  export interface ReactTranslator extends Translator {
    /** Sets the default language and library data set for this instance of Translator */
    registerDefaultLanguage(languageKey: string, library: ReactTranslatorLibrary): void;
    /** Adds a language data set to the set of available languages.  */
    registerLanguage(languageKey: string, library: ReactTranslatorLibrary): void;
    /** Returns the translation entry for a given key or path in the library data structure. Optional 'values' object contains key-value pairs for dynamic substitution. If no entry is found, path is returned. */
    translate(path: string, values?: object): React.ReactNode;

  }

  /** Modifies a simple translator instance to enable React JSX entries in library files. */
  export function simpleTranslatorReactPlugin(Translator: SimpleTranslator): void;

  const ReactTranslator: ReactTranslator;
  export default ReactTranslator;
}
