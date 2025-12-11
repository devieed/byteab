import { ref, watch } from 'vue'

const STORAGE_KEY = 'byteab-custom-sites'
const SETTINGS_KEY = 'byteab-search-settings'

// 自定义站点存储
export function useCustomSites() {
  const customSites = ref([])

  function loadSites() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        customSites.value = JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to load custom sites:', e)
      customSites.value = []
    }
  }

  function saveSites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customSites.value))
    } catch (e) {
      console.error('Failed to save custom sites:', e)
    }
  }

  function addSite(site) {
    const cleanSite = site.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    if (cleanSite && !customSites.value.includes(cleanSite)) {
      customSites.value.push(cleanSite)
      saveSites()
      return true
    }
    return false
  }

  function removeSite(site) {
    const index = customSites.value.indexOf(site)
    if (index > -1) {
      customSites.value.splice(index, 1)
      saveSites()
    }
  }

  function clearSites() {
    customSites.value = []
    saveSites()
  }

  loadSites()

  return {
    customSites,
    addSite,
    removeSite,
    clearSites
  }
}

// 语言设置存储
export function useLocaleStorage() {
  function saveLocale(locale) {
    localStorage.setItem('byteab-locale', locale)
  }

  function getLocale() {
    return localStorage.getItem('byteab-locale')
  }

  return {
    saveLocale,
    getLocale
  }
}

// 搜索参数存储
export function useSearchSettings() {
  const defaultSettings = {
    engine: 'google',
    includeSites: [],
    excludeSites: [],
    fileType: '',
    customFileType: '',
    timeRange: 'any',
    inTitle: false,
    inUrl: false,
    inText: false,
    relatedSite: '',
    defineSearch: '',
    language: ''
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch (e) {
      console.error('Failed to save settings:', e)
    }
  }

  function loadSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY)
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) }
      }
    } catch (e) {
      console.error('Failed to load settings:', e)
    }
    return null
  }

  function clearSettings() {
    localStorage.removeItem(SETTINGS_KEY)
  }

  function hasSettings() {
    return localStorage.getItem(SETTINGS_KEY) !== null
  }

  return {
    saveSettings,
    loadSettings,
    clearSettings,
    hasSettings,
    defaultSettings
  }
}
