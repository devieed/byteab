<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { searchEngines, buildSearchUrl } from '../utils/searchEngines.js'
import { useCustomSites, useLocaleStorage, useSearchSettings } from '../composables/useStorage.js'

const { t, locale } = useI18n()
const { saveLocale } = useLocaleStorage()
const { customSites, addSite, removeSite } = useCustomSites()
const { saveSettings, loadSettings } = useSearchSettings()

// ========== 搜索引擎 ==========
const selectedEngine = ref('google')

// ========== 关键词管理 ==========
// 词列表 { id, text, type: 'normal' | 'exact' | 'exclude', start, end }
const keywords = ref([])
// 主搜索框文本
const mainSearchText = ref('')
// 搜索框引用
const searchInputRef = ref(null)

// ========== 站点筛选 ==========
const includeSites = ref([])
const excludeSites = ref([])
const newSite = ref('')
const siteMode = ref('include')
const showSitePanel = ref(false)

// ========== 常用筛选 ==========
const timeRange = ref('any')
const fileType = ref('')
const customFileType = ref('')

// ========== 高级筛选 ==========
const showAdvancedModal = ref(false)
const inTitle = ref(false)
const inUrl = ref(false)
const inText = ref(false)
const relatedSite = ref('')
const defineSearch = ref('')
const numberRange = ref({ min: '', max: '' })
const orKeywords = ref([])
const newOrKeyword = ref('')
const language = ref('')

// ========== 记住设置 ==========
const rememberSettings = ref(false)

// ========== UI ==========
const copied = ref(false)

// ========== 配置 ==========
const baseUrl = import.meta.env.BASE_URL
const availableLocales = ['zh-CN', 'zh-TW', 'en', 'es', 'ko', 'ja']

const fileTypes = [
  { value: 'pdf', label: 'PDF' },
  { value: 'doc', label: 'DOC' },
  { value: 'xls', label: 'XLS' },
  { value: 'ppt', label: 'PPT' },
  { value: 'txt', label: 'TXT' },
  { value: 'md', label: 'MD' }
]

const timeRanges = [
  { value: 'any', zh: '不限', en: 'Any' },
  { value: 'day', zh: '24h', en: '24h' },
  { value: 'week', zh: '一周', en: 'Week' },
  { value: 'month', zh: '一月', en: 'Month' },
  { value: 'year', zh: '一年', en: 'Year' }
]

const popularSites = [
  { domain: 'github.com', label: 'GitHub' },
  { domain: 'stackoverflow.com', label: 'StackOverflow' },
  { domain: 'reddit.com', label: 'Reddit' },
  { domain: 'medium.com', label: 'Medium' },
  { domain: 'wikipedia.org', label: 'Wikipedia' },
  { domain: 'zhihu.com', label: '知乎' },
  { domain: 'csdn.net', label: 'CSDN' },
  { domain: 'juejin.cn', label: '掘金' }
]

const languages = [
  { value: '', label: '不限 / Any' },
  { value: 'lang_zh-CN', label: '简体中文' },
  { value: 'lang_zh-TW', label: '繁體中文' },
  { value: 'lang_en', label: 'English' },
  { value: 'lang_ja', label: '日本語' },
  { value: 'lang_ko', label: '한국어' }
]

// ========== 关键词操作 ==========
// 标记选中文本或整句话
function markKeywordWithType(type) {
  const input = searchInputRef.value
  if (!input) return
  
  const text = mainSearchText.value
  if (!text.trim()) return
  
  // 获取选中范围
  const start = input.selectionStart
  const end = input.selectionEnd
  const hasSelection = start !== end && start >= 0 && end > start
  
  if (hasSelection) {
    // 有选中文本，标记选中部分
    const selectedText = text.substring(start, end).trim()
    if (!selectedText) return
    
    // 检查是否与已有标记重叠
    const overlaps = keywords.value.some(kw => {
      return (start >= kw.start && start < kw.end) ||
             (end > kw.start && end <= kw.end) ||
             (start <= kw.start && end >= kw.end)
    })
    
    if (overlaps) {
      // 如果重叠，先移除重叠的标记
      keywords.value = keywords.value.filter(kw => {
        return !(start < kw.end && end > kw.start)
      })
    }
    
    keywords.value.push({
      id: Date.now(),
      text: selectedText,
      type,
      start,
      end
    })
    
    // 按位置排序
    keywords.value.sort((a, b) => a.start - b.start)
    
    // 清除选中
    input.setSelectionRange(end, end)
  } else {
    // 没有选中，标记整句话
    const fullText = text.trim()
    if (!fullText) return
    
    // 检查是否已有整句标记
    const hasFullMark = keywords.value.some(kw => kw.start === 0 && kw.end === text.length)
    
    if (hasFullMark) {
      // 更新现有标记
      const existing = keywords.value.find(kw => kw.start === 0 && kw.end === text.length)
      if (existing) {
        existing.type = type
        existing.text = fullText
      }
    } else {
      // 清除所有标记，添加新的整句标记
      keywords.value = [{
        id: Date.now(),
        text: fullText,
        type,
        start: 0,
        end: text.length
      }]
    }
  }
}

// 切换词的类型：normal -> exact -> exclude -> normal
function cycleKeywordType(id) {
  const kw = keywords.value.find(k => k.id === id)
  if (kw) {
    if (kw.type === 'normal') {
      kw.type = 'exact'
    } else if (kw.type === 'exact') {
      kw.type = 'exclude'
    } else {
      kw.type = 'normal'
    }
  }
}

// 移除词
function removeKeyword(id) {
  const idx = keywords.value.findIndex(k => k.id === id)
  if (idx > -1) keywords.value.splice(idx, 1)
}

// 获取文本中未标记的部分（作为普通关键词）
function getUnmarkedParts() {
  if (!mainSearchText.value) return []
  
  const text = mainSearchText.value
  const parts = []
  
  // 如果没有标记，整句话都是普通关键词
  if (keywords.value.length === 0) {
    const trimmed = text.trim()
    if (trimmed) {
      return [{ text: trimmed, type: 'normal', start: 0, end: text.length }]
    }
    return []
  }
  
  // 按位置排序
  const sorted = [...keywords.value].sort((a, b) => a.start - b.start)
  
  // 检查开头是否有未标记部分
  if (sorted[0].start > 0) {
    const part = text.substring(0, sorted[0].start).trim()
    if (part) parts.push({ text: part, type: 'normal', start: 0, end: sorted[0].start })
  }
  
  // 检查标记之间的未标记部分
  for (let i = 0; i < sorted.length - 1; i++) {
    const end = sorted[i].end
    const nextStart = sorted[i + 1].start
    if (end < nextStart) {
      const part = text.substring(end, nextStart).trim()
      if (part) parts.push({ text: part, type: 'normal', start: end, end: nextStart })
    }
  }
  
  // 检查结尾是否有未标记部分
  const last = sorted[sorted.length - 1]
  if (last.end < text.length) {
    const part = text.substring(last.end).trim()
    if (part) parts.push({ text: part, type: 'normal', start: last.end, end: text.length })
  }
  
  return parts
}

// ========== OR 关键词 ==========
function addOrKeyword() {
  const text = newOrKeyword.value.trim()
  if (text && !orKeywords.value.includes(text)) {
    orKeywords.value.push(text)
    newOrKeyword.value = ''
  }
}

function removeOrKeyword(word) {
  const idx = orKeywords.value.indexOf(word)
  if (idx > -1) orKeywords.value.splice(idx, 1)
}

// ========== 站点操作 ==========
function handleAddSite() {
  const site = newSite.value.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  if (site) {
    addSite(site)
    newSite.value = ''
  }
}

function toggleSite(site) {
  if (siteMode.value === 'include') {
    const exIdx = excludeSites.value.indexOf(site)
    if (exIdx > -1) excludeSites.value.splice(exIdx, 1)
    const idx = includeSites.value.indexOf(site)
    if (idx > -1) {
      includeSites.value.splice(idx, 1)
    } else {
      includeSites.value.push(site)
    }
  } else {
    const inIdx = includeSites.value.indexOf(site)
    if (inIdx > -1) includeSites.value.splice(inIdx, 1)
    const idx = excludeSites.value.indexOf(site)
    if (idx > -1) {
      excludeSites.value.splice(idx, 1)
    } else {
      excludeSites.value.push(site)
    }
  }
}

function getSiteStatus(site) {
  if (includeSites.value.includes(site)) return 'include'
  if (excludeSites.value.includes(site)) return 'exclude'
  return 'none'
}

function removeFromInclude(site) {
  const idx = includeSites.value.indexOf(site)
  if (idx > -1) includeSites.value.splice(idx, 1)
}

function removeFromExclude(site) {
  const idx = excludeSites.value.indexOf(site)
  if (idx > -1) excludeSites.value.splice(idx, 1)
}

// 切换仅搜索站点
function toggleIncludeSite(site) {
  const idx = includeSites.value.indexOf(site)
  if (idx > -1) {
    includeSites.value.splice(idx, 1)
  } else {
    includeSites.value.push(site)
  }
}

// 切换排除站点
function toggleExcludeSite(site) {
  const idx = excludeSites.value.indexOf(site)
  if (idx > -1) {
    excludeSites.value.splice(idx, 1)
  } else {
    excludeSites.value.push(site)
  }
}

// ========== 文件类型 ==========
function selectFileType(type) {
  fileType.value = fileType.value === type ? '' : type
  if (fileType.value) customFileType.value = ''
}

const effectiveFileType = computed(() => {
  return customFileType.value.trim().replace('.', '') || fileType.value
})

// ========== 构建查询 ==========
const searchQuery = computed(() => {
  let parts = []
  
  // 获取所有关键词（包括标记的和未标记的）
  const allKeywords = []
  
  // 合并标记的关键词和未标记的部分
  const sortedMarked = [...keywords.value].sort((a, b) => a.start - b.start)
  const unmarked = getUnmarkedParts()
  
  // 合并并排序
  allKeywords.push(...sortedMarked, ...unmarked)
  allKeywords.sort((a, b) => a.start - b.start)
  
  // 构建查询字符串
  allKeywords.forEach(kw => {
    if (kw.type === 'exact') {
      parts.push(`"${kw.text}"`)
    } else if (kw.type === 'exclude') {
      parts.push(`-${kw.text}`)
    } else {
      parts.push(kw.text)
    }
  })
  
  // OR 关键词
  if (orKeywords.value.length > 0) {
    parts.push(`(${orKeywords.value.join(' OR ')})`)
  }
  
  // 站点
  if (includeSites.value.length > 0) {
    if (includeSites.value.length === 1) {
      parts.push(`site:${includeSites.value[0]}`)
    } else {
      parts.push(`(${includeSites.value.map(s => `site:${s}`).join(' OR ')})`)
    }
  }
  excludeSites.value.forEach(s => parts.push(`-site:${s}`))
  
  // 文件类型
  if (effectiveFileType.value) {
    parts.push(`filetype:${effectiveFileType.value}`)
  }
  
  // 位置限定
  const mainWord = keywords.value.find(k => k.type !== 'exclude')?.text
  if (mainWord) {
    if (inTitle.value) parts.push(`intitle:${mainWord}`)
    if (inUrl.value) parts.push(`inurl:${mainWord}`)
    if (inText.value) parts.push(`intext:${mainWord}`)
  }
  
  // 特殊搜索
  if (relatedSite.value.trim()) parts.push(`related:${relatedSite.value.trim()}`)
  if (defineSearch.value.trim()) parts.push(`define:${defineSearch.value.trim()}`)
  if (numberRange.value.min && numberRange.value.max) {
    parts.push(`${numberRange.value.min}..${numberRange.value.max}`)
  }
  
  return parts.join(' ')
})

const searchUrl = computed(() => {
  if (!searchQuery.value) return ''
  let url = buildSearchUrl(selectedEngine.value, searchQuery.value, timeRange.value)
  if (language.value && selectedEngine.value === 'google') {
    url += `&lr=${language.value}`
  }
  return url
})

const hasContent = computed(() => {
  return mainSearchText.value.trim().length > 0 || 
         includeSites.value.length > 0 || 
         excludeSites.value.length > 0 ||
         effectiveFileType.value ||
         orKeywords.value.length > 0
})

const advancedCount = computed(() => {
  let count = 0
  if (inTitle.value || inUrl.value || inText.value) count++
  if (relatedSite.value) count++
  if (defineSearch.value) count++
  if (numberRange.value.min || numberRange.value.max) count++
  if (orKeywords.value.length > 0) count++
  if (language.value) count++
  if (includeSites.value.length > 0) count++ // 仅搜索站点
  return count
})

// 仅搜索站点数量（用于高级选项）
const includeSiteCount = computed(() => includeSites.value.length)
// 排除站点数量
const excludeSiteCount = computed(() => excludeSites.value.length)

// ========== 操作 ==========
function changeLocale(loc) {
  locale.value = loc
  saveLocale(loc)
}

function doSearch() {
  if (searchUrl.value) {
    if (rememberSettings.value) {
      saveSettings({
        engine: selectedEngine.value,
        includeSites: includeSites.value,
        excludeSites: excludeSites.value,
        fileType: fileType.value,
        customFileType: customFileType.value,
        timeRange: timeRange.value,
        inTitle: inTitle.value,
        inUrl: inUrl.value,
        inText: inText.value,
        relatedSite: relatedSite.value,
        defineSearch: defineSearch.value,
        language: language.value
      })
    }
    window.open(searchUrl.value, '_blank')
  }
}

async function copyQuery() {
  if (searchQuery.value) {
    try {
      await navigator.clipboard.writeText(searchQuery.value)
      copied.value = true
      setTimeout(() => copied.value = false, 2000)
    } catch (e) {
      console.error('Copy failed:', e)
    }
  }
}

function resetAll() {
  keywords.value = []
  mainSearchText.value = ''
  includeSites.value = []
  excludeSites.value = []
  fileType.value = ''
  customFileType.value = ''
  timeRange.value = 'any'
  orKeywords.value = []
  inTitle.value = false
  inUrl.value = false
  inText.value = false
  relatedSite.value = ''
  defineSearch.value = ''
  numberRange.value = { min: '', max: '' }
  language.value = ''
}

function resetAdvanced() {
  orKeywords.value = []
  inTitle.value = false
  inUrl.value = false
  inText.value = false
  relatedSite.value = ''
  defineSearch.value = ''
  numberRange.value = { min: '', max: '' }
  language.value = ''
}

// ========== 键盘 ==========
function handleSearchKeydown(e) {
  if (e.key === 'Enter' && e.ctrlKey) {
    // Ctrl+Enter 触发搜索
    e.preventDefault()
    if (hasContent.value) {
      doSearch()
    }
  }
}

function handleEsc(e) {
  if (e.key === 'Escape') {
    showAdvancedModal.value = false
    showSitePanel.value = false
  }
}

// ========== 监听文本变化，清理无效标记 ==========
watch(mainSearchText, (newText) => {
  // 清理超出文本长度的标记
  keywords.value = keywords.value.filter(kw => {
    return kw.start >= 0 && kw.end <= newText.length && kw.start < kw.end
  })
  
  // 更新标记的文本内容（如果文本被修改）
  keywords.value.forEach(kw => {
    if (kw.start >= 0 && kw.end <= newText.length) {
      const newTextContent = newText.substring(kw.start, kw.end)
      if (newTextContent !== kw.text) {
        kw.text = newTextContent
      }
    }
  })
})

// ========== 初始化 ==========
onMounted(() => {
  document.addEventListener('keydown', handleEsc)
  const saved = loadSettings()
  if (saved) {
    rememberSettings.value = true
    selectedEngine.value = saved.engine || 'google'
    includeSites.value = saved.includeSites || []
    excludeSites.value = saved.excludeSites || []
    fileType.value = saved.fileType || ''
    customFileType.value = saved.customFileType || ''
    timeRange.value = saved.timeRange || 'any'
    inTitle.value = saved.inTitle || false
    inUrl.value = saved.inUrl || false
    inText.value = saved.inText || false
    relatedSite.value = saved.relatedSite || ''
    defineSearch.value = saved.defineSearch || ''
    language.value = saved.language || ''
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
})
</script>

<template>
  <div class="home">
    <!-- 头部 -->
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <img :src="`${baseUrl}favicon.svg`" alt="ByteAB" class="logo-img" />
          <span class="logo-name">ByteAB</span>
        </div>
        <select class="lang-sel" :value="locale" @change="changeLocale($event.target.value)">
          <option v-for="loc in availableLocales" :key="loc" :value="loc">{{ t(`language.${loc}`) }}</option>
        </select>
      </div>
    </header>

    <main class="main">
      <!-- Hero -->
      <div class="hero">
        <h1>{{ t('app.subtitle') }}</h1>
        <p>{{ t('app.description') }}</p>
      </div>

      <!-- 搜索引擎 -->
      <div class="engines">
        <button
          v-for="(cfg, key) in searchEngines"
          :key="key"
          class="engine-btn"
          :class="{ active: selectedEngine === key }"
          @click="selectedEngine = key"
        >{{ cfg.name }}</button>
      </div>

      <!-- 主卡片 -->
      <div class="card">
        <!-- 关键词区域 -->
        <div class="kw-section">
          <div class="kw-header">
            <span class="kw-title">🔤 {{ t('keyword.title') }}</span>
            <span class="kw-hint-inline">{{ t('keyword.hint') }}</span>
          </div>

          <!-- 主搜索框 -->
          <div class="main-search-wrapper">
            <textarea
              ref="searchInputRef"
              v-model="mainSearchText"
              class="main-search-input"
              :placeholder="t('keyword.placeholder')"
              rows="4"
              @keydown="handleSearchKeydown"
            ></textarea>
            
            <!-- 类型按钮 -->
            <div class="type-selector-main">
              <button 
                class="type-btn-main" 
                :class="{ highlight: mainSearchText.trim() }"
                @click="markKeywordWithType('normal')"
                :title="t('keyword.normalTooltip')"
              >
                {{ t('keyword.normal') }}
              </button>
              <button 
                class="type-btn-main exact" 
                :class="{ highlight: mainSearchText.trim() }"
                @click="markKeywordWithType('exact')"
                :title="t('keyword.exactTooltip')"
              >
                "{{ t('keyword.exact') }}"
              </button>
              <button 
                class="type-btn-main exclude" 
                :class="{ highlight: mainSearchText.trim() }"
                @click="markKeywordWithType('exclude')"
                :title="t('keyword.excludeTooltip')"
              >
                -{{ t('keyword.exclude') }}
              </button>
            </div>
          </div>

          <!-- 已标记的关键词列表 -->
          <div class="kw-list" v-if="keywords.length > 0">
            <div class="kw-list-header">{{ t('keyword.markedKeywords') }}</div>
            <div 
              v-for="kw in keywords" 
              :key="kw.id" 
              class="kw-tag"
              :class="kw.type"
              @click="cycleKeywordType(kw.id)"
              :title="t('keyword.clickToToggle')"
            >
              <span class="tag-prefix" v-if="kw.type === 'exact'">"</span>
              <span class="tag-prefix" v-if="kw.type === 'exclude'">-</span>
              <span class="tag-text">{{ kw.text }}</span>
              <span class="tag-suffix" v-if="kw.type === 'exact'">"</span>
              <button class="tag-del" @click.stop="removeKeyword(kw.id)">×</button>
            </div>
          </div>
        </div>

        <!-- 筛选区 -->
        <div class="filters-vertical">
          <!-- 排除站点 -->
          <div class="filter-row">
            <div class="filter-label">
              <span class="filter-icon">🚫</span>
              <span>{{ t('filter.excludeSites') }}</span>
            </div>
            <button class="site-btn-row exclude-site-btn" @click="showSitePanel = true; siteMode = 'exclude'">
              <span v-if="excludeSiteCount > 0">{{ excludeSiteCount }} {{ t('filter.excludeSitesCount') }}</span>
              <span v-else>{{ t('filter.excludeSitesClick') }}</span>
              <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>

          <!-- 时间 -->
          <div class="filter-row">
            <div class="filter-label">
              <span class="filter-icon">⏰</span>
              <span>{{ t('filter.timeRange') }}</span>
            </div>
            <div class="filter-opts-row">
              <button
                v-for="tr in timeRanges"
                :key="tr.value"
                class="opt-btn-row"
                :class="{ active: timeRange === tr.value }"
                @click="timeRange = tr.value"
              >{{ locale.startsWith('zh') ? tr.zh : tr.en }}</button>
            </div>
          </div>

          <!-- 文件类型 -->
          <div class="filter-row">
            <div class="filter-label">
              <span class="filter-icon">📄</span>
              <span>{{ t('filter.fileType') }}</span>
            </div>
            <div class="filter-opts-row file-row">
              <button
                v-for="ft in fileTypes"
                :key="ft.value"
                class="opt-btn-row"
                :class="{ active: fileType === ft.value && !customFileType }"
                @click="selectFileType(ft.value)"
              >{{ ft.label }}</button>
              <input
                v-model="customFileType"
                type="text"
                class="custom-ft-row"
                :placeholder="t('filter.otherFormat')"
                @input="fileType = ''"
              />
            </div>
          </div>
        </div>

        <!-- 高级入口 -->
        <button class="advanced-entry" @click="showAdvancedModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>{{ t('action.moreOptions') }}</span>
          <span class="adv-badge" v-if="advancedCount">{{ advancedCount }}</span>
        </button>

        <!-- 预览和搜索 -->
        <div class="action-area" v-if="hasContent">
          <div class="preview">
            <div class="preview-head">
              <span>{{ t('preview.title') }}</span>
              <div class="preview-acts">
                <label class="remember">
                  <input type="checkbox" v-model="rememberSettings" />
                  {{ t('action.remember') }}
                </label>
                <button @click="copyQuery">{{ copied ? '✓' : '' }} {{ t('preview.copy') }}</button>
                <button @click="resetAll">{{ t('action.reset') }}</button>
              </div>
            </div>
            <code>{{ searchQuery }}</code>
          </div>
          <button class="search-btn" @click="doSearch" :disabled="!searchQuery">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            {{ t('search.button') }}
          </button>
        </div>
      </div>

      <!-- 信任 -->
      <div class="trust">
        <div class="trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          {{ t('trust.local') }}
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          {{ t('trust.standard') }}
        </div>
      </div>
    </main>

    <!-- 排除站点面板 -->
    <Teleport to="body">
      <div class="overlay" v-if="showSitePanel" @click.self="showSitePanel = false">
        <div class="panel">
          <div class="panel-head">
            <h3>🚫 {{ t('filter.excludeSites') }}</h3>
            <button @click="showSitePanel = false">×</button>
          </div>
          <div class="panel-body">
            <p class="exclude-tip">{{ t('filter.excludeTip') }}</p>

            <!-- 站点列表 -->
            <p class="sites-tip">{{ t('filter.excludeClick') }}</p>
            <div class="sites-list">
              <button
                v-for="s in popularSites"
                :key="s.domain"
                class="site-chip"
                :class="{ exclude: excludeSites.includes(s.domain) }"
                @click="toggleExcludeSite(s.domain)"
              >{{ s.label }}</button>
              <button
                v-for="s in customSites"
                :key="s"
                class="site-chip custom"
                :class="{ exclude: excludeSites.includes(s) }"
                @click="toggleExcludeSite(s)"
              >
                {{ s }}
                <span class="del" @click.stop="removeSite(s)">×</span>
              </button>
            </div>

            <!-- 添加 -->
            <div class="add-row">
              <input v-model="newSite" :placeholder="t('site.addPlaceholder')" @keydown.enter="handleAddSite" />
              <button @click="handleAddSite" :disabled="!newSite.trim()">+</button>
            </div>

            <!-- 已选排除 -->
            <div class="selected" v-if="excludeSites.length > 0">
              <div class="sel-group">
                <span class="sel-label exc">{{ t('filter.excluded') }}</span>
                <span v-for="s in excludeSites" :key="s" class="sel-tag exc" @click="removeFromExclude(s)">{{ s }} ×</span>
              </div>
            </div>
          </div>
          <div class="panel-foot">
            <button @click="showSitePanel = false">{{ t('filter.done') }}</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 高级选项 -->
    <Teleport to="body">
      <div class="overlay" v-if="showAdvancedModal" @click.self="showAdvancedModal = false">
        <div class="modal">
          <div class="modal-head">
            <h2>⚙️ {{ t('advanced.title') }}</h2>
            <button @click="showAdvancedModal = false">×</button>
          </div>
          <div class="modal-body">
            <!-- 仅搜索站点 -->
            <div class="m-section">
              <div class="m-title">🌐 {{ t('advanced.onlySites') }}</div>
              <p class="m-desc">{{ t('advanced.onlySitesDesc') }}</p>
              <div class="sites-list-mini">
                <button
                  v-for="s in popularSites"
                  :key="s.domain"
                  class="site-chip-mini"
                  :class="{ active: includeSites.includes(s.domain) }"
                  @click="toggleIncludeSite(s.domain)"
                >{{ s.label }}</button>
                <button
                  v-for="s in customSites"
                  :key="s"
                  class="site-chip-mini custom"
                  :class="{ active: includeSites.includes(s) }"
                  @click="toggleIncludeSite(s)"
                >{{ s }}</button>
              </div>
              <div class="add-row-mini">
                <input v-model="newSite" :placeholder="t('advanced.addCustomSite')" @keydown.enter="handleAddSite" />
                <button @click="handleAddSite" :disabled="!newSite.trim()">+</button>
              </div>
              <div class="m-tags" v-if="includeSites.length">
                <span v-for="s in includeSites" :key="s" class="m-tag site" @click="removeFromInclude(s)">{{ s }} ×</span>
              </div>
            </div>

            <!-- OR -->
            <div class="m-section">
              <div class="m-title">🔀 {{ t('search.orKeywords') }}</div>
              <p class="m-desc">{{ t('advanced.orKeywordsDesc') }}</p>
              <div class="m-input">
                <input v-model="newOrKeyword" placeholder="keyword" @keydown.enter="addOrKeyword" />
                <button @click="addOrKeyword" :disabled="!newOrKeyword.trim()">+</button>
              </div>
              <div class="m-tags" v-if="orKeywords.length">
                <span v-for="w in orKeywords" :key="w" class="m-tag or" @click="removeOrKeyword(w)">{{ w }} ×</span>
              </div>
            </div>

            <!-- 位置 -->
            <div class="m-section">
              <div class="m-title">📍 {{ t('advanced.position') }}</div>
              <p class="m-desc">{{ t('advanced.positionDesc') }}</p>
              <div class="m-checks">
                <label><input type="checkbox" v-model="inTitle" /> {{ t('search.inTitle') }} <code>intitle:</code></label>
                <label><input type="checkbox" v-model="inUrl" /> {{ t('search.inUrl') }} <code>inurl:</code></label>
                <label><input type="checkbox" v-model="inText" /> {{ t('advanced.body') }} <code>intext:</code></label>
              </div>
            </div>

            <!-- 特殊 -->
            <div class="m-section">
              <div class="m-title">🔧 {{ t('advanced.special') }}</div>
              <div class="m-specials">
                <div class="m-sp-row">
                  <label><code>related:</code> {{ t('advanced.similar') }}</label>
                  <input v-model="relatedSite" placeholder="github.com" />
                </div>
                <div class="m-sp-row">
                  <label><code>define:</code> {{ t('advanced.define') }}</label>
                  <input v-model="defineSearch" placeholder="algorithm" />
                </div>
                <div class="m-sp-row">
                  <label><code>..</code> {{ t('advanced.range') }}</label>
                  <div class="range-inputs">
                    <input v-model="numberRange.min" placeholder="100" />
                    <span>~</span>
                    <input v-model="numberRange.max" placeholder="500" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 语言 -->
            <div class="m-section" v-if="selectedEngine === 'google'">
              <div class="m-title">🌍 {{ t('advanced.language') }}</div>
              <select v-model="language">
                <option v-for="l in languages" :key="l.value" :value="l.value">{{ l.label }}</option>
              </select>
            </div>
          </div>
          <div class="modal-foot">
            <button class="reset-btn" @click="resetAdvanced">{{ t('advanced.reset') }}</button>
            <button class="done-btn" @click="showAdvancedModal = false">{{ t('advanced.done') }}</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-links">
        <router-link to="/about">About</router-link>
        <router-link to="/privacy">Privacy</router-link>
        <router-link to="/terms">Terms</router-link>
      </div>
      <p>© 2024 ByteAB</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

/* Header */
.header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.logo-img {
  width: 36px;
  height: 36px;
}
.logo-name {
  font-size: 1.375rem;
  font-weight: 700;
  color: #1e293b;
}
.lang-sel {
  padding: 0.5rem 2rem 0.5rem 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 0.625rem center;
  font-size: 0.9rem;
  cursor: pointer;
  appearance: none;
}

/* Main */
.main {
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Hero */
.hero {
  text-align: center;
  margin-bottom: 1.5rem;
}
.hero h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.375rem;
}
.hero p {
  color: #64748b;
  font-size: 1rem;
}

/* Engines */
.engines {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.engine-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background: #fff;
  color: #6b7280;
  font-size: 0.9rem;
  transition: all 0.15s;
}
.engine-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}
.engine-btn.active {
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  border-color: transparent;
  color: #fff;
}

/* Card */
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  padding: 1.5rem;
}

/* Keyword Section */
.kw-section {
  margin-bottom: 1.5rem;
}
.kw-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.875rem;
}
.kw-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
}
.kw-hint-inline {
  font-size: 0.8rem;
  color: #9ca3af;
}

/* 主搜索框 */
.main-search-wrapper {
  margin-bottom: 1rem;
}
.main-search-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.2s;
}
.main-search-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}

/* 类型选择器 - 主搜索框下方 */
.type-selector-main {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  justify-content: center;
}
.type-btn-main {
  padding: 0.75rem 1.25rem;
  background: #f1f5f9;
  color: #64748b;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: all 0.15s;
  white-space: nowrap;
  border: 2px solid transparent;
  font-weight: 500;
}
.type-btn-main:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}
.type-btn-main.highlight {
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #3b82f6;
}
.type-btn-main.highlight:hover {
  background: #3b82f6;
  color: #fff;
}
.type-btn-main.exact {
  color: #7c3aed;
}
.type-btn-main.exact.highlight {
  background: #f3e8ff;
  border-color: #7c3aed;
}
.type-btn-main.exact.highlight:hover {
  background: #7c3aed;
  color: #fff;
}
.type-btn-main.exclude {
  color: #dc2626;
}
.type-btn-main.exclude.highlight {
  background: #fee2e2;
  border-color: #dc2626;
}
.type-btn-main.exclude.highlight:hover {
  background: #dc2626;
  color: #fff;
}

/* Keyword List */
.kw-list {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.kw-list-header {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
}
.kw-list .kw-tag {
  display: inline-flex;
}
.kw-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.15s;
  background: #f1f5f9;
  color: #334155;
}
.kw-tag:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.kw-tag.exact {
  background: #f3e8ff;
  color: #7c3aed;
}
.kw-tag.exclude {
  background: #fee2e2;
  color: #dc2626;
}
.tag-prefix, .tag-suffix {
  font-weight: 600;
}
.tag-del {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.875rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25rem;
}
.tag-del:hover {
  background: #fee2e2;
  color: #ef4444;
}

/* Legend */
.kw-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.875rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: #9ca3af;
}
.legend-label {
  color: #6b7280;
}
.legend-item {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.legend-item.normal {
  background: #f1f5f9;
  color: #334155;
}
.legend-item.exact {
  background: #f3e8ff;
  color: #7c3aed;
}
.legend-item.exclude {
  background: #fee2e2;
  color: #dc2626;
}
.legend-arrow {
  color: #d1d5db;
}

/* Filters - 垂直布局 */
.filters-vertical {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 0;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 1.25rem;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
}
.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 100px;
  font-weight: 500;
  color: #374151;
  font-size: 0.95rem;
}
.filter-icon {
  font-size: 1.1rem;
}
.filter-opts-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}
.opt-btn-row {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #6b7280;
  font-size: 0.875rem;
  transition: all 0.15s;
  cursor: pointer;
}
.opt-btn-row:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}
.opt-btn-row.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}
.file-row {
  align-items: center;
}
.custom-ft-row {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  width: 100px;
}
.custom-ft-row:focus {
  border-color: #3b82f6;
  outline: none;
}
.site-btn-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s;
  flex: 1;
}
.site-btn-row:hover {
  border-color: #3b82f6;
}
.site-btn-row svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #9ca3af;
  stroke-width: 2;
  margin-left: auto;
}
.exclude-site-btn {
  border-color: #fecaca;
  background: #fef2f2;
  color: #dc2626;
}
.exclude-site-btn:hover {
  border-color: #dc2626;
  background: #fee2e2;
}
.filter-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.filter-icon {
  font-size: 1rem;
}
.filter-opts {
  display: flex;
  gap: 0.25rem;
}
.opt-btn {
  padding: 0.375rem 0.625rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  color: #6b7280;
  font-size: 0.8rem;
  transition: all 0.15s;
}
.opt-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}
.opt-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}

/* Site Button */
.site-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 0.9rem;
  cursor: pointer;
}
.site-btn:hover {
  border-color: #3b82f6;
}
.site-btn svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #9ca3af;
  stroke-width: 2;
}
/* 排除站点按钮样式 */
.exclude-site-btn {
  border-color: #fecaca;
  background: #fef2f2;
  color: #dc2626;
}
.exclude-site-btn:hover {
  border-color: #dc2626;
  background: #fee2e2;
}

/* File Box */
.file-box {
  flex-wrap: wrap;
}
.custom-ft {
  width: 60px;
  padding: 0.375rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.8rem;
}
.custom-ft:focus {
  border-color: #3b82f6;
  outline: none;
}

/* Advanced Entry */
.advanced-entry {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%);
  border: 2px solid #c7d2fe;
  border-radius: 12px;
  color: #4f46e5;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  transition: all 0.2s;
}
.advanced-entry:hover {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(79,70,229,0.3);
}
.advanced-entry svg {
  width: 20px;
  height: 20px;
}
.adv-badge {
  background: #ef4444;
  color: #fff;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
}

/* Action Area */
.action-area {
  padding-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
}
.preview {
  margin-bottom: 1rem;
}
.preview-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #6b7280;
}
.preview-acts {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.remember {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  cursor: pointer;
}
.remember input {
  accent-color: #6366f1;
}
.preview-acts button {
  padding: 0.25rem 0.625rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #6b7280;
}
.preview-acts button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}
.preview code {
  display: block;
  padding: 0.875rem 1rem;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 0.9rem;
  color: #0ea5e9;
  word-break: break-all;
  line-height: 1.5;
}
.search-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 1rem;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  border-radius: 12px;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  transition: all 0.2s;
}
.search-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99,102,241,0.4);
}
.search-btn:disabled {
  opacity: 0.5;
}
.search-btn svg {
  width: 22px;
  height: 22px;
}

/* Trust */
.trust {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  padding: 0.875rem;
  background: #f0fdf4;
  border-radius: 10px;
  border: 1px solid #bbf7d0;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #166534;
}
.trust-item svg {
  width: 18px;
  height: 18px;
  color: #22c55e;
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

/* Panel */
.panel {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 460px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}
.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}
.panel-head h3 {
  font-size: 1.125rem;
  font-weight: 600;
}
.panel-head button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 1.25rem;
  color: #6b7280;
}
.panel-head button:hover {
  background: #f3f4f6;
}
.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}
.mode-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.mode-btn {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  text-align: left;
  transition: all 0.15s;
}
.mode-btn:hover {
  border-color: #22c55e;
}
.mode-btn.active {
  border-color: #22c55e;
  background: #f0fdf4;
}
.mode-btn:last-child:hover {
  border-color: #ef4444;
}
.mode-btn:last-child.active {
  border-color: #ef4444;
  background: #fef2f2;
}
.mode-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}
.mode-icon.inc {
  background: #dcfce7;
  color: #16a34a;
}
.mode-icon.exc {
  background: #fee2e2;
  color: #dc2626;
}
.mode-btn div {
  display: flex;
  flex-direction: column;
}
.mode-btn strong {
  font-size: 0.9rem;
  color: #1e293b;
}
.mode-btn small {
  font-size: 0.75rem;
  color: #6b7280;
}
.sites-tip {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.625rem;
}
.exclude-tip {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}
.sites-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.site-chip {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 0.875rem;
  transition: all 0.15s;
  position: relative;
}
.site-chip:hover {
  border-color: #3b82f6;
}
.site-chip.include {
  background: #dcfce7;
  border-color: #22c55e;
  color: #166534;
}
.site-chip.exclude {
  background: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}
.site-chip.custom {
  padding-right: 1.5rem;
}
.site-chip .del {
  position: absolute;
  right: 0.375rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
}
.site-chip .del:hover {
  opacity: 1;
  color: #ef4444;
}
.add-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.add-row input {
  flex: 1;
  padding: 0.625rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
}
.add-row input:focus {
  border-color: #3b82f6;
  outline: none;
}
.add-row button {
  width: 40px;
  background: #3b82f6;
  color: #fff;
  border-radius: 8px;
  font-size: 1.25rem;
}
.add-row button:disabled {
  opacity: 0.5;
}
.selected {
  padding-top: 1rem;
  border-top: 1px dashed #e5e7eb;
}
.sel-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
}
.sel-label {
  font-size: 0.8rem;
  font-weight: 500;
}
.sel-label.inc { color: #166534; }
.sel-label.exc { color: #991b1b; }
.sel-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
}
.sel-tag.inc {
  background: #dcfce7;
  color: #166534;
}
.sel-tag.exc {
  background: #fee2e2;
  color: #991b1b;
}
.panel-foot {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f1f5f9;
}
.panel-foot button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: #fff;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
}

/* Modal */
.modal {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}
.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}
.modal-head h2 {
  font-size: 1.125rem;
  font-weight: 600;
}
.modal-head button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 1.25rem;
  color: #6b7280;
}
.modal-head button:hover {
  background: #f3f4f6;
}
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}
.m-section {
  margin-bottom: 1.5rem;
}
.m-section:last-child {
  margin-bottom: 0;
}
.m-title {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}
.m-desc {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}
.m-input {
  display: flex;
  gap: 0.5rem;
}
.m-input input {
  flex: 1;
  padding: 0.625rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
}
.m-input input:focus {
  border-color: #3b82f6;
  outline: none;
}
.m-input button {
  width: 40px;
  background: #3b82f6;
  color: #fff;
  border-radius: 8px;
  font-size: 1.25rem;
}
.m-input button:disabled {
  background: #e5e7eb;
  color: #9ca3af;
}
.m-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.75rem;
}
.m-tag {
  padding: 0.375rem 0.625rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
}
.m-tag.or {
  background: #fef3c7;
  color: #92400e;
}
.m-tag.site {
  background: #dcfce7;
  color: #166534;
}

/* 高级选项中的站点列表 */
.sites-list-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}
.site-chip-mini {
  padding: 0.375rem 0.625rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  color: #6b7280;
  font-size: 0.8rem;
  transition: all 0.15s;
}
.site-chip-mini:hover {
  border-color: #22c55e;
}
.site-chip-mini.active {
  background: #dcfce7;
  border-color: #22c55e;
  color: #166534;
}
.add-row-mini {
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
}
.add-row-mini input {
  flex: 1;
  padding: 0.5rem 0.625rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.8rem;
}
.add-row-mini input:focus {
  border-color: #3b82f6;
  outline: none;
}
.add-row-mini button {
  width: 32px;
  background: #3b82f6;
  color: #fff;
  border-radius: 6px;
  font-size: 1rem;
}
.add-row-mini button:disabled {
  opacity: 0.5;
}
.m-checks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.m-checks label {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}
.m-checks label:hover {
  border-color: #3b82f6;
}
.m-checks input {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
}
.m-checks code {
  margin-left: auto;
  font-size: 0.75rem;
  color: #6366f1;
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}
.m-specials {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.m-sp-row {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}
.m-sp-row label {
  font-size: 0.85rem;
  color: #6b7280;
}
.m-sp-row label code {
  color: #6366f1;
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  margin-right: 0.375rem;
}
.m-sp-row input {
  padding: 0.625rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
}
.m-sp-row input:focus {
  border-color: #3b82f6;
  outline: none;
}
.range-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.range-inputs input {
  width: 90px;
  text-align: center;
}
.range-inputs span {
  color: #9ca3af;
}
.m-section select {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  background: #fff;
}
.modal-foot {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-top: 1px solid #f1f5f9;
}
.modal-foot .reset-btn {
  padding: 0.625rem 1rem;
  color: #6b7280;
  font-size: 0.875rem;
  border-radius: 8px;
}
.modal-foot .reset-btn:hover {
  background: #f3f4f6;
}
.modal-foot .done-btn {
  padding: 0.625rem 1.5rem;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
}

/* Footer */
.footer {
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid #e5e7eb;
  background: #fff;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}
.footer-links a {
  color: #6b7280;
  font-size: 0.85rem;
}
.footer-links a:hover {
  color: #3b82f6;
}
.footer p {
  font-size: 0.8rem;
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 640px) {
  .main {
    padding: 1.5rem 1rem;
  }
  .hero h1 {
    font-size: 1.5rem;
  }
  .kw-input-area {
    flex-direction: column;
  }
  .parse-btn {
    width: 100%;
  }
  .filters {
    flex-direction: column;
    gap: 0.875rem;
  }
  .filter-box {
    flex-wrap: wrap;
  }
  .mode-row {
    flex-direction: column;
  }
  .trust {
    flex-direction: column;
    gap: 0.5rem;
  }
  .trust-item {
    justify-content: center;
  }
}
</style>
