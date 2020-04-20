function updateContent() {
  update();
  $('body').localize();
}
const defaultLanguage = 'en';
i18next
.use(i18nextXHRBackend)
.use(i18nextBrowserLanguageDetector)
.init({
  fallbackLng: defaultLanguage,
  debug: true,
  backend: {
    loadPath: 'locales/{{lng}}.json',
  },
}, (err, t) => {
  const languages = [
    ['de', 'Deutsch'],
    ['en', 'English'],
    ['es-ES', 'Español'],
    ['fr', 'Français'],
    ['it', 'Italiano'],
    ['ru', 'Русский'],
    ['ja', '日本語'],
    ['pt-BR', 'Português'],
    ['zh-CN', '简体中文'],
    ['zh-TW', '繁體中文']
  ],
  languageSelector = $('#language');
  languages.map(([code, name]) => {
    languageSelector.append(`<option value="${code}"${code == i18next.language ? ' selected' : ''}>${name}</option>`);
  });
  if (!languageSelector.find('[selected]').length)
    languageSelector.val(defaultLanguage);
  languageSelector.on('change', function () {
    if (this.value == i18next.language)
      return;
    i18next.changeLanguage(this.value);
  });
  jqueryI18next.init(i18next, $);
  i18next.on('languageChanged', lng => {
    if (!languageSelector.find(`[value=${lng}]`).length) {
      i18next.changeLanguage(defaultLanguage);
      return;
    }
    languageSelector.val(lng);
    updateContent();
  });
  // init set content
  $(document).ready(initialize);
  $(document).on('input', updateContent);
  $('input[type = radio]').on('change', updateContent);
});
