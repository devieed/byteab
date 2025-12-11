export default {
  app: {
    title: 'ByteAB',
    subtitle: 'Advanced Search Parameter Helper',
    description: 'Build precise search queries quickly without memorizing complex syntax'
  },
  search: {
    placeholder: 'Enter search keywords...',
    button: 'Search',
    exactMatch: 'Exact Match',
    exactMatchTip: 'Search keywords as a whole phrase',
    excludeKeyword: 'Exclude Keywords',
    excludeKeywordPlaceholder: 'Enter words to exclude...',
    excludeKeywordTip: 'Results will not contain these words',
    siteFilter: 'Site Filter',
    siteFilterTip: 'Only search within specified websites',
    excludeSite: 'Exclude Sites',
    excludeSiteTip: 'Exclude these websites from results',
    fileType: 'File Type',
    fileTypeTip: 'Only search for specific file types',
    timeRange: 'Time Range',
    timeRangeTip: 'Limit results to a specific time period',
    inTitle: 'In Title',
    inTitleTip: 'Keywords must appear in the title',
    inUrl: 'In URL',
    inUrlTip: 'Keywords must appear in the URL',
    orKeywords: 'OR Keywords',
    orKeywordsTip: 'Match any of these keywords'
  },
  engine: {
    label: 'Search Engine',
    google: 'Google',
    bing: 'Bing',
    baidu: 'Baidu',
    duckduckgo: 'DuckDuckGo',
    yandex: 'Yandex',
    yahoo: 'Yahoo',
    sogou: 'Sogou',
    so360: '360 Search'
  },
  site: {
    add: 'Add Site',
    addPlaceholder: 'Enter domain, e.g. example.com',
    saved: 'Saved Sites',
    custom: 'Custom Sites',
    remove: 'Remove',
    clear: 'Clear All'
  },
  fileTypes: {
    pdf: 'PDF Document',
    doc: 'Word Document',
    xls: 'Excel Spreadsheet',
    ppt: 'PowerPoint',
    txt: 'Text File',
    csv: 'CSV File'
  },
  timeRanges: {
    any: 'Any time',
    day: 'Past 24 hours',
    week: 'Past week',
    month: 'Past month',
    year: 'Past year'
  },
  preview: {
    title: 'Query Preview',
    copy: 'Copy',
    copied: 'Copied!'
  },
  language: {
    label: 'Language',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'es': 'Español',
    'ko': '한국어',
    'ja': '日本語'
  },
  tips: {
    title: 'Tips',
    tip1: 'Press Enter to add keywords, click added keywords to toggle exact match',
    tip2: 'Custom sites are saved locally and available on your next visit',
    tip3: 'All operations run locally, no data is sent to any server'
  },
  keyword: {
    title: 'Keywords',
    hint: 'Type full query, select text and mark type',
    placeholder: 'Type full search query, e.g.: How to deploy yolo on Android\nSelect text and click buttons below to mark type (exact/exclude)\nUnselected parts will be normal keywords',
    normal: 'Normal',
    exact: 'Exact',
    exclude: 'Excl',
    normalTooltip: 'Mark selected text or whole sentence as normal',
    exactTooltip: 'Mark selected text or whole sentence as exact match',
    excludeTooltip: 'Mark selected text or whole sentence as exclude',
    markedKeywords: 'Marked keywords:',
    clickToToggle: 'Click to change type'
  },
  filter: {
    excludeSites: 'Exclude Sites',
    excludeSitesCount: 'sites excluded',
    excludeSitesClick: 'Click to exclude sites',
    timeRange: 'Time Range',
    fileType: 'File Type',
    otherFormat: 'Other',
    excludeTip: 'Search results will NOT include content from these sites',
    excludeClick: 'Click to exclude:',
    excluded: 'Excluded:',
    done: 'Done'
  },
  advanced: {
    title: 'More Options',
    onlySites: 'Search Only These Sites',
    onlySitesDesc: 'Results will only come from selected sites',
    addCustomSite: 'Add custom site...',
    orKeywordsDesc: 'Match ANY of these words',
    position: 'Position',
    positionDesc: 'Keywords must appear in',
    body: 'Body',
    special: 'Special',
    similar: 'Similar',
    define: 'Define',
    range: 'Range',
    language: 'Language',
    reset: 'Reset',
    done: 'Done'
  },
  action: {
    remember: 'Remember',
    reset: 'Reset',
    moreOptions: 'More Options'
  },
  trust: {
    local: '100% local, no upload',
    standard: 'Standard syntax, 100% recognized'
  }
}

