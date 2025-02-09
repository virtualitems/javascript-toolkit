// You can import modules using the import keyword.
// The module should be exported using the export keyword.
import * as Example from './export.js';

Example.example();

// Or, if you prefer to use dynamic imports:
import('./export.js').then(Example => {
  Example.example();
});
