import i18next from './node_modules/i18next/dist/esm/i18next.js';

async function fetchLangMock(lang) {
  if (lang === 'es') {
    return {
      "greet": "¡Hola!",
      "greet_with_name": "¡Hola, {{name}}!",
      "user_one": "usuario",
      "user_other": "usuarios"
    };
  }

  return {
    "greet": "Hello!",
    "greet_with_name": "Hello, {{name}}!",
    "user_one": "user",
    "user_other": "users"
  };
}

i18next.init();

Promise.all([
  fetchLangMock('en'),
  fetchLangMock('es')
]).then(([en, es]) => {
  i18next.addResources('en', 'translation', en);
  i18next.addResources('es', 'translation', es);
}).then(() => {
  // english
  i18next.changeLanguage('en');
  console.log(i18next);
  console.log(i18next.t('greet'));
  console.log(i18next.t('greet_with_name', { name: 'Alejandro' }));
  console.log(i18next.t('user', { count: 0 }));
  console.log(i18next.t('user', { count: 1 }));
  console.log(i18next.t('user', { count: 2 }));
  // spanish
  i18next.changeLanguage('es');
  console.log(i18next.t('greet'));
  console.log(i18next.t('greet_with_name', { name: 'Alejandro' }));
  console.log(i18next.t('user', { count: 0 }));
  console.log(i18next.t('user', { count: 1 }));
  console.log(i18next.t('user', { count: 2 }));
});
