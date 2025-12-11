export default {
  app: {
    title: 'ByteAB',
    subtitle: '搜尋引擎進階參數助手',
    description: '幫助你快速構建精準的搜尋語句，無需記憶複雜語法'
  },
  search: {
    placeholder: '輸入搜尋關鍵詞...',
    button: '搜尋',
    exactMatch: '精確匹配',
    exactMatchTip: '關鍵詞不分詞，作為整體搜尋',
    excludeKeyword: '排除關鍵詞',
    excludeKeywordPlaceholder: '輸入要排除的詞...',
    excludeKeywordTip: '搜尋結果中不包含這些詞',
    siteFilter: '站點篩選',
    siteFilterTip: '只搜尋指定網站的內容',
    excludeSite: '排除站點',
    excludeSiteTip: '搜尋結果中排除這些網站',
    fileType: '檔案類型',
    fileTypeTip: '只搜尋指定類型的檔案',
    timeRange: '時間範圍',
    timeRangeTip: '限制搜尋結果的時間範圍',
    inTitle: '標題包含',
    inTitleTip: '關鍵詞必須出現在標題中',
    inUrl: 'URL包含',
    inUrlTip: '關鍵詞必須出現在URL中',
    orKeywords: '或關係詞',
    orKeywordsTip: '包含任意一個關鍵詞即可'
  },
  engine: {
    label: '搜尋引擎',
    google: 'Google',
    bing: 'Bing',
    baidu: '百度',
    duckduckgo: 'DuckDuckGo',
    yandex: 'Yandex',
    yahoo: 'Yahoo',
    sogou: '搜狗',
    so360: '360搜尋'
  },
  site: {
    add: '添加站點',
    addPlaceholder: '輸入網站域名，如 example.com',
    saved: '已保存的站點',
    custom: '自訂站點',
    remove: '移除',
    clear: '清空全部'
  },
  fileTypes: {
    pdf: 'PDF文檔',
    doc: 'Word文檔',
    xls: 'Excel表格',
    ppt: 'PPT演示',
    txt: '文字檔案',
    csv: 'CSV檔案'
  },
  timeRanges: {
    any: '不限',
    day: '過去24小時',
    week: '過去一週',
    month: '過去一月',
    year: '過去一年'
  },
  preview: {
    title: '搜尋語句預覽',
    copy: '複製',
    copied: '已複製!'
  },
  language: {
    label: '語言',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'es': 'Español',
    'ko': '한국어',
    'ja': '日本語'
  },
  tips: {
    title: '使用提示',
    tip1: '輸入關鍵詞後按回車添加，點擊已添加的關鍵詞可切換精確匹配',
    tip2: '自訂站點會自動保存到本地，下次訪問可直接使用',
    tip3: '所有操作均在本地完成，不會發送任何數據到伺服器'
  },
  keyword: {
    title: '搜尋關鍵詞',
    hint: '輸入完整查詢，選中文字後點擊按鈕標記類型',
    placeholder: '輸入完整搜尋查詢，例如：怎樣在安卓中部署yolo\n選中部分文字後點擊下方按鈕標記類型（精確/排除）\n未選中的部分將作為普通關鍵詞',
    normal: '普通',
    exact: '精確',
    exclude: '排除',
    normalTooltip: '選中文字標記為普通，或標記整句話為普通',
    exactTooltip: '選中文字標記為精確匹配，或標記整句話為精確匹配',
    excludeTooltip: '選中文字標記為排除，或標記整句話為排除',
    markedKeywords: '已標記的關鍵詞：',
    clickToToggle: '點擊切換類型'
  },
  filter: {
    excludeSites: '排除站點',
    excludeSitesCount: '個站點已排除',
    excludeSitesClick: '點擊選擇要排除的站點',
    timeRange: '時間範圍',
    fileType: '檔案類型',
    otherFormat: '其他格式',
    excludeTip: '搜尋結果將不會包含以下網站的內容',
    excludeClick: '點擊選擇要排除的站點：',
    excluded: '已排除:',
    done: '完成'
  },
  advanced: {
    title: '更多進階選項',
    onlySites: '僅搜尋指定站點',
    onlySitesDesc: '搜尋結果將只來自選中的網站',
    addCustomSite: '添加自訂站點...',
    orKeywordsDesc: '包含任意一個詞即可匹配',
    position: '位置限定',
    positionDesc: '關鍵詞必須出現在指定位置',
    body: '正文',
    special: '特殊搜尋',
    similar: '相似網站',
    define: '定義',
    range: '數字範圍',
    language: '結果語言',
    reset: '重置',
    done: '確定'
  },
  action: {
    remember: '記住條件',
    reset: '重置',
    moreOptions: '更多進階選項'
  },
  trust: {
    local: '100%本地運行，數據不上傳',
    standard: '標準語法，搜尋引擎100%識別'
  }
}

