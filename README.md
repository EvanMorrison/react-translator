# SIMPLE TRANSLATOR REACT
## A simple react-aware translation utility

Based on the simple-translator library. Provides the same functionality but can accept JSX entries in language files.

Can be used stand alone in place of simple-translator. Alternatively, it exports a function to add the functionality to instances of simple-translator for easy migration of existing apps.

```js

import Translator from 'simple-translator';
import { simpleTranslatorReactPlugin } from 'react-translator';

...

simpleTranslatorReactPlugin(Translator);

Translator.registerDefaultLanguage("en", English);
Translator.registerLanguage("zh", Chinese);

...

```
