export default {
  app: {
    title: 'ByteAB',
    subtitle: '고급 검색 매개변수 도우미',
    description: '복잡한 구문을 외우지 않고도 정확한 검색 쿼리를 빠르게 작성하세요'
  },
  search: {
    placeholder: '검색 키워드 입력...',
    button: '검색',
    exactMatch: '정확히 일치',
    exactMatchTip: '키워드를 전체 구문으로 검색',
    excludeKeyword: '키워드 제외',
    excludeKeywordPlaceholder: '제외할 단어 입력...',
    excludeKeywordTip: '결과에 이 단어가 포함되지 않습니다',
    siteFilter: '사이트 필터',
    siteFilterTip: '지정된 웹사이트 내에서만 검색',
    excludeSite: '사이트 제외',
    excludeSiteTip: '결과에서 이 웹사이트 제외',
    fileType: '파일 유형',
    fileTypeTip: '특정 파일 유형만 검색',
    timeRange: '시간 범위',
    timeRangeTip: '특정 기간으로 결과 제한',
    inTitle: '제목에 포함',
    inTitleTip: '키워드가 제목에 나타나야 함',
    inUrl: 'URL에 포함',
    inUrlTip: '키워드가 URL에 나타나야 함',
    orKeywords: 'OR 키워드',
    orKeywordsTip: '이 키워드 중 하나와 일치'
  },
  engine: {
    label: '검색 엔진',
    google: 'Google',
    bing: 'Bing',
    baidu: 'Baidu',
    duckduckgo: 'DuckDuckGo',
    yandex: 'Yandex',
    yahoo: 'Yahoo',
    sogou: 'Sogou',
    so360: '360 검색'
  },
  site: {
    add: '사이트 추가',
    addPlaceholder: '도메인 입력, 예: example.com',
    saved: '저장된 사이트',
    custom: '사용자 정의 사이트',
    remove: '제거',
    clear: '모두 지우기'
  },
  fileTypes: {
    pdf: 'PDF 문서',
    doc: 'Word 문서',
    xls: 'Excel 스프레드시트',
    ppt: 'PowerPoint',
    txt: '텍스트 파일',
    csv: 'CSV 파일'
  },
  timeRanges: {
    any: '전체 기간',
    day: '지난 24시간',
    week: '지난 주',
    month: '지난 달',
    year: '지난 해'
  },
  preview: {
    title: '쿼리 미리보기',
    copy: '복사',
    copied: '복사됨!'
  },
  language: {
    label: '언어',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'es': 'Español',
    'ko': '한국어',
    'ja': '日本語'
  },
  tips: {
    title: '팁',
    tip1: 'Enter를 눌러 키워드 추가, 추가된 키워드를 클릭하여 정확히 일치 전환',
    tip2: '사용자 정의 사이트는 로컬에 저장되며 다음 방문 시 사용 가능합니다',
    tip3: '모든 작업은 로컬에서 수행되며 서버로 데이터가 전송되지 않습니다'
  },
  keyword: {
    title: '검색 키워드',
    hint: '전체 쿼리 입력, 텍스트 선택 후 버튼 클릭하여 유형 표시',
    placeholder: '전체 검색 쿼리 입력, 예: Android에서 yolo 배포 방법\n텍스트 선택 후 아래 버튼 클릭하여 유형 표시(정확/제외)\n선택하지 않은 부분은 일반 키워드가 됩니다',
    normal: '일반',
    exact: '정확',
    exclude: '제외',
    normalTooltip: '선택한 텍스트 또는 전체 문장을 일반으로 표시',
    exactTooltip: '선택한 텍스트 또는 전체 문장을 정확 일치로 표시',
    excludeTooltip: '선택한 텍스트 또는 전체 문장을 제외로 표시',
    markedKeywords: '표시된 키워드:',
    clickToToggle: '클릭하여 유형 변경'
  },
  filter: {
    excludeSites: '사이트 제외',
    excludeSitesCount: '개 사이트 제외됨',
    excludeSitesClick: '제외할 사이트 선택',
    timeRange: '시간 범위',
    fileType: '파일 유형',
    otherFormat: '기타 형식',
    excludeTip: '검색 결과에 다음 사이트의 콘텐츠가 포함되지 않습니다',
    excludeClick: '제외할 사이트 선택:',
    excluded: '제외됨:',
    done: '완료'
  },
  advanced: {
    title: '더 많은 옵션',
    onlySites: '이 사이트만 검색',
    onlySitesDesc: '결과는 선택한 사이트에서만 나옵니다',
    addCustomSite: '사용자 정의 사이트 추가...',
    orKeywordsDesc: '이 키워드 중 하나와 일치',
    position: '위치 제한',
    positionDesc: '키워드가 다음 위치에 나타나야 함',
    body: '본문',
    special: '특수',
    similar: '유사',
    define: '정의',
    range: '범위',
    language: '언어',
    reset: '재설정',
    done: '완료'
  },
  action: {
    remember: '조건 기억',
    reset: '재설정',
    moreOptions: '더 많은 옵션'
  },
  trust: {
    local: '100% 로컬 실행, 데이터 업로드 없음',
    standard: '표준 구문, 100% 인식'
  }
}

