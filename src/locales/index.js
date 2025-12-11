import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.js'
import zhTW from './zh-TW.js'
import en from './en.js'
import es from './es.js'
import ko from './ko.js'
import ja from './ja.js'

// 获取浏览器语言或本地存储的语言设置
function getDefaultLocale() {
  const savedLocale = localStorage.getItem('byteab-locale')
  if (savedLocale) return savedLocale
  
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang.startsWith('zh')) {
    return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN'
  }
  if (browserLang.startsWith('ja')) return 'ja'
  if (browserLang.startsWith('ko')) return 'ko'
  if (browserLang.startsWith('es')) return 'es'
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en': en,
    'es': es,
    'ko': ko,
    'ja': ja
  }
})

export default i18n

