import i18next from './node_modules/i18next/dist/esm/i18next.js';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        "greet": "Hello World!"
      }
    },
    es: {
      translation: {
        "greet": "Hola Mundo!"
      }
    }
  }
});

console.log(i18next.t('greet'));
console.log(i18next.t('greet', { lng: 'es' }));
