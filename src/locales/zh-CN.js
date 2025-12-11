export default {
  app: {
    title: 'ByteAB',
    subtitle: '搜索引擎高级参数助手',
    description: '帮助你快速构建精准的搜索语句，无需记忆复杂语法'
  },
  search: {
    placeholder: '输入搜索关键词...',
    button: '搜索',
    exactMatch: '精确匹配',
    exactMatchTip: '关键词不分词，作为整体搜索',
    excludeKeyword: '排除关键词',
    excludeKeywordPlaceholder: '输入要排除的词...',
    excludeKeywordTip: '搜索结果中不包含这些词',
    siteFilter: '站点筛选',
    siteFilterTip: '只搜索指定网站的内容',
    excludeSite: '排除站点',
    excludeSiteTip: '搜索结果中排除这些网站',
    fileType: '文件类型',
    fileTypeTip: '只搜索指定类型的文件',
    timeRange: '时间范围',
    timeRangeTip: '限制搜索结果的时间范围',
    inTitle: '标题包含',
    inTitleTip: '关键词必须出现在标题中',
    inUrl: 'URL包含',
    inUrlTip: '关键词必须出现在URL中',
    orKeywords: '或关系词',
    orKeywordsTip: '包含任意一个关键词即可'
  },
  engine: {
    label: '搜索引擎',
    google: 'Google',
    bing: 'Bing',
    baidu: '百度',
    duckduckgo: 'DuckDuckGo',
    yandex: 'Yandex',
    yahoo: 'Yahoo',
    sogou: '搜狗',
    so360: '360搜索'
  },
  site: {
    add: '添加站点',
    addPlaceholder: '输入网站域名，如 example.com',
    saved: '已保存的站点',
    custom: '自定义站点',
    remove: '移除',
    clear: '清空全部'
  },
  fileTypes: {
    pdf: 'PDF文档',
    doc: 'Word文档',
    xls: 'Excel表格',
    ppt: 'PPT演示',
    txt: '文本文件',
    csv: 'CSV文件'
  },
  timeRanges: {
    any: '不限',
    day: '过去24小时',
    week: '过去一周',
    month: '过去一月',
    year: '过去一年'
  },
  preview: {
    title: '搜索语句预览',
    copy: '复制',
    copied: '已复制!'
  },
  language: {
    label: '语言',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'es': 'Español',
    'ko': '한국어',
    'ja': '日本語'
  },
  tips: {
    title: '使用提示',
    tip1: '输入关键词后按回车添加，点击已添加的关键词可切换精确匹配',
    tip2: '自定义站点会自动保存到本地，下次访问可直接使用',
    tip3: '所有操作均在本地完成，不会发送任何数据到服务器'
  },
  keyword: {
    title: '搜索关键词',
    hint: '输入完整查询，选中文字后点击按钮标记类型',
    placeholder: '输入完整搜索查询，例如：怎样在安卓中部署yolo\n选中部分文字后点击下方按钮标记类型（精确/排除）\n未选中的部分将作为普通关键词',
    normal: '普通',
    exact: '精确',
    exclude: '排除',
    normalTooltip: '选中文字标记为普通，或标记整句话为普通',
    exactTooltip: '选中文字标记为精确匹配，或标记整句话为精确匹配',
    excludeTooltip: '选中文字标记为排除，或标记整句话为排除',
    markedKeywords: '已标记的关键词：',
    clickToToggle: '点击切换类型'
  },
  filter: {
    excludeSites: '排除站点',
    excludeSitesCount: '个站点已排除',
    excludeSitesClick: '点击选择要排除的站点',
    timeRange: '时间范围',
    fileType: '文件类型',
    otherFormat: '其他格式',
    excludeTip: '搜索结果将不会包含以下网站的内容',
    excludeClick: '点击选择要排除的站点：',
    excluded: '已排除:',
    done: '完成'
  },
  advanced: {
    title: '更多高级选项',
    onlySites: '仅搜索指定站点',
    onlySitesDesc: '搜索结果将只来自选中的网站',
    addCustomSite: '添加自定义站点...',
    orKeywordsDesc: '包含任意一个词即可匹配',
    position: '位置限定',
    positionDesc: '关键词必须出现在指定位置',
    body: '正文',
    special: '特殊搜索',
    similar: '相似网站',
    define: '定义',
    range: '数字范围',
    language: '结果语言',
    reset: '重置',
    done: '确定'
  },
  action: {
    remember: '记住条件',
    reset: '重置',
    moreOptions: '更多高级选项'
  },
  trust: {
    local: '100%本地运行，数据不上传',
    standard: '标准语法，搜索引擎100%识别'
  }
}

