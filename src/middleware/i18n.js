/* eslint-disable no-param-reassign */
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import locale from 'locale'
import Gettext from 'node-gettext'
import IntlMessageFormat from 'intl-messageformat'

export default function i18nMiddleware() {
  const supportedLocales = new locale.Locales(['en', 'ru'])
  const locales = path.join(__dirname, '../../locales/')
  const pattern = path.join(locales, '**/*.po')
  const gt = new Gettext()

  const files = glob.sync(pattern)

  files.forEach(file => {
    const [lang] = file.replace(locales, '').split('/')
    const content = fs.readFileSync(file)

    gt.addTextdomain(lang, content)
  })

  return function i18n(req, res, next) {
    const langs = new locale.Locales(req.headers['accept-language'] || 'en')
    const { normalized } = langs.best(supportedLocales)

    req.i18n = {
      msgFormat: (msgid, values) => {
        const msg = new IntlMessageFormat(gt.dgettext(normalized, msgid), normalized)

        return msg.format(values)
      },
    }

    next()
  }
}
