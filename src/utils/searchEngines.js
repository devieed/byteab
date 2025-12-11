// 搜索引擎配置
export const searchEngines = {
  google: {
    name: 'Google',
    baseUrl: 'https://www.google.com/search',
    queryParam: 'q',
    // Google 时间范围参数
    timeParams: {
      day: '&tbs=qdr:d',
      week: '&tbs=qdr:w',
      month: '&tbs=qdr:m',
      year: '&tbs=qdr:y'
    }
  },
  bing: {
    name: 'Bing',
    baseUrl: 'https://www.bing.com/search',
    queryParam: 'q',
    timeParams: {
      day: '&filters=ex1:"ez1"',
      week: '&filters=ex1:"ez2"',
      month: '&filters=ex1:"ez3"',
      year: ''
    }
  },
  baidu: {
    name: '百度',
    baseUrl: 'https://www.baidu.com/s',
    queryParam: 'wd',
    timeParams: {
      day: '&gpc=stf%3D' + encodeURIComponent(getTimeStamp(1)) + '%2C' + encodeURIComponent(Date.now()) + '%7Cstftype%3D1',
      week: '&gpc=stf%3D' + encodeURIComponent(getTimeStamp(7)) + '%2C' + encodeURIComponent(Date.now()) + '%7Cstftype%3D1',
      month: '&gpc=stf%3D' + encodeURIComponent(getTimeStamp(30)) + '%2C' + encodeURIComponent(Date.now()) + '%7Cstftype%3D1',
      year: '&gpc=stf%3D' + encodeURIComponent(getTimeStamp(365)) + '%2C' + encodeURIComponent(Date.now()) + '%7Cstftype%3D1'
    }
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    baseUrl: 'https://duckduckgo.com/',
    queryParam: 'q',
    timeParams: {
      day: '&df=d',
      week: '&df=w',
      month: '&df=m',
      year: '&df=y'
    }
  },
  yandex: {
    name: 'Yandex',
    baseUrl: 'https://yandex.com/search/',
    queryParam: 'text',
    timeParams: {
      day: '&within=1',
      week: '&within=2',
      month: '&within=3',
      year: ''
    }
  },
  yahoo: {
    name: 'Yahoo',
    baseUrl: 'https://search.yahoo.com/search',
    queryParam: 'p',
    timeParams: {
      day: '&fr2=time&btf=d',
      week: '&fr2=time&btf=w',
      month: '&fr2=time&btf=m',
      year: ''
    }
  },
  sogou: {
    name: '搜狗',
    baseUrl: 'https://www.sogou.com/web',
    queryParam: 'query',
    timeParams: {
      day: '&tsn=1',
      week: '&tsn=2',
      month: '&tsn=3',
      year: '&tsn=4'
    }
  },
  so360: {
    name: '360搜索',
    baseUrl: 'https://www.so.com/s',
    queryParam: 'q',
    timeParams: {
      day: '&adv_t=1',
      week: '&adv_t=2',
      month: '&adv_t=3',
      year: '&adv_t=4'
    }
  }
}

// 获取时间戳（天数前）
function getTimeStamp(daysAgo) {
  return Date.now() - daysAgo * 24 * 60 * 60 * 1000
}

// 构建搜索查询字符串
export function buildSearchQuery(options) {
  const {
    keyword = '',
    exactMatch = false,
    excludeKeywords = [],
    includeSites = [],
    excludeSites = [],
    fileType = '',
    inTitle = false,
    inUrl = false,
    orKeywords = []
  } = options

  let query = ''

  // 主关键词（精确匹配用引号包裹）
  if (keyword) {
    query += exactMatch ? `"${keyword}"` : keyword
  }

  // OR 关键词
  if (orKeywords.length > 0) {
    const orPart = orKeywords.filter(k => k.trim()).join(' OR ')
    if (orPart) {
      query += query ? ` (${orPart})` : `(${orPart})`
    }
  }

  // 排除关键词
  excludeKeywords.forEach(word => {
    if (word.trim()) {
      query += ` -${word.trim()}`
    }
  })

  // 站点筛选
  if (includeSites.length > 0) {
    const sitePart = includeSites.map(s => `site:${s}`).join(' OR ')
    query += ` (${sitePart})`
  }

  // 排除站点
  excludeSites.forEach(site => {
    if (site.trim()) {
      query += ` -site:${site.trim()}`
    }
  })

  // 文件类型
  if (fileType) {
    query += ` filetype:${fileType}`
  }

  // 标题包含
  if (inTitle && keyword) {
    query += ` intitle:${exactMatch ? `"${keyword}"` : keyword}`
  }

  // URL包含
  if (inUrl && keyword) {
    query += ` inurl:${keyword}`
  }

  return query.trim()
}

// 构建完整的搜索URL
export function buildSearchUrl(engine, query, timeRange = 'any') {
  const engineConfig = searchEngines[engine]
  if (!engineConfig) return ''

  const baseUrl = engineConfig.baseUrl
  const queryParam = engineConfig.queryParam
  const encodedQuery = encodeURIComponent(query)

  let url = `${baseUrl}?${queryParam}=${encodedQuery}`

  // 添加时间范围参数
  if (timeRange !== 'any' && engineConfig.timeParams[timeRange]) {
    url += engineConfig.timeParams[timeRange]
  }

  return url
}

