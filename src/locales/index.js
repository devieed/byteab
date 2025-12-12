import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.js'
import zhTW from './zh-TW.js'
import en from './en.js'
import es from './es.js'
import ko from './ko.js'
import ja from './ja.js'

// 支持的语言列表
const supportedLocales = ['zh-CN', 'zh-TW', 'en', 'es', 'ko', 'ja']

// 浏览器语言到应用语言的映射（键统一为小写）
const browserLangMap = {
  'zh': 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
  'zh-hk': 'zh-TW',
  'zh-mo': 'zh-TW',
  'ja': 'ja',
  'ja-jp': 'ja',
  'ko': 'ko',
  'ko-kr': 'ko',
  'es': 'es',
  'es-es': 'es',
  'es-mx': 'es',
  'es-ar': 'es',
  'es-co': 'es',
  'es-cl': 'es',
  'es-pe': 'es',
  'es-ve': 'es',
  'en': 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'en-au': 'en',
  'en-ca': 'en'
}

// 获取浏览器语言或本地存储的语言设置
function getDefaultLocale() {
  // 1. 优先使用本地存储的语言设置
  const savedLocale = localStorage.getItem('byteab-locale')
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale
  }
  
  // 2. 检测浏览器语言
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase()
  
  // 精确匹配（如 'zh-CN', 'en-US'）
  if (browserLangMap[browserLang]) {
    return browserLangMap[browserLang]
  }
  
  // 前缀匹配（如 'zh' 匹配 'zh-CN'）
  const langPrefix = browserLang.split('-')[0]
  if (browserLangMap[langPrefix]) {
    return browserLangMap[langPrefix]
  }
  
  // 3. 默认返回英文
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

