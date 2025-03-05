import i18next from './node_modules/i18next/dist/esm/i18next.js';

async function fetchLangMock(lang) {
  if (lang === 'es') {
    return {
      "greet": "¡hola!",
      "greet_with_name": "¡hola, {{name}}!",
      "user_one": "usuario",
      "user_other": "usuarios",
      "module": {
        "component": "texto del componente"
      }
    };
  }

  return {
    "greet": "hello!",
    "greet_with_name": "hello, {{name}}!",
    "user_one": "user",
    "user_other": "users",
    "module": {
      "component": "component text"
    }
  };
}

i18next.init();

Promise.all([
  fetchLangMock('en'),
  fetchLangMock('es')
]).then(([en, es]) => {
  // i18next.addResourceBundle(lng, ns, resources, deep, overwrite)
  i18next.addResourceBundle('en', 'translation', en, true, true);
  i18next.addResourceBundle('es', 'translation', es, true, true);
}).then(() => {
  // english
  i18next.changeLanguage('en');
  console.log(i18next.t('greet'));
  console.log(i18next.t('greet_with_name', { name: 'Alejandro' }));
  console.log(i18next.t('user', { count: 0 }));
  console.log(i18next.t('user', { count: 1 }));
  console.log(i18next.t('user', { count: 2 }));
  console.log(i18next.t('module.component'));
  // spanish
  i18next.changeLanguage('es');
  console.log(i18next.t('greet'));
  console.log(i18next.t('greet_with_name', { name: 'Alejandro' }));
  console.log(i18next.t('user', { count: 0 }));
  console.log(i18next.t('user', { count: 1 }));
  console.log(i18next.t('user', { count: 2 }));
  console.log(i18next.t('module.component'));
});
