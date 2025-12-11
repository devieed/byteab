export default {
  app: {
    title: 'ByteAB',
    subtitle: '高度な検索パラメータヘルパー',
    description: '複雑な構文を覚えることなく、正確な検索クエリを素早く構築'
  },
  search: {
    placeholder: '検索キーワードを入力...',
    button: '検索',
    exactMatch: '完全一致',
    exactMatchTip: 'キーワードをフレーズ全体として検索',
    excludeKeyword: 'キーワード除外',
    excludeKeywordPlaceholder: '除外する単語を入力...',
    excludeKeywordTip: '結果にこれらの単語は含まれません',
    siteFilter: 'サイトフィルター',
    siteFilterTip: '指定されたウェブサイト内のみ検索',
    excludeSite: 'サイト除外',
    excludeSiteTip: '結果からこれらのウェブサイトを除外',
    fileType: 'ファイルタイプ',
    fileTypeTip: '特定のファイルタイプのみ検索',
    timeRange: '期間',
    timeRangeTip: '結果を特定の期間に限定',
    inTitle: 'タイトルに含む',
    inTitleTip: 'キーワードがタイトルに含まれる必要があります',
    inUrl: 'URLに含む',
    inUrlTip: 'キーワードがURLに含まれる必要があります',
    orKeywords: 'ORキーワード',
    orKeywordsTip: 'これらのキーワードのいずれかに一致'
  },
  engine: {
    label: '検索エンジン',
    google: 'Google',
    bing: 'Bing',
    baidu: 'Baidu',
    duckduckgo: 'DuckDuckGo',
    yandex: 'Yandex',
    yahoo: 'Yahoo',
    sogou: 'Sogou',
    so360: '360検索'
  },
  site: {
    add: 'サイト追加',
    addPlaceholder: 'ドメインを入力、例: example.com',
    saved: '保存済みサイト',
    custom: 'カスタムサイト',
    remove: '削除',
    clear: 'すべてクリア'
  },
  fileTypes: {
    pdf: 'PDFドキュメント',
    doc: 'Wordドキュメント',
    xls: 'Excelスプレッドシート',
    ppt: 'PowerPoint',
    txt: 'テキストファイル',
    csv: 'CSVファイル'
  },
  timeRanges: {
    any: '指定なし',
    day: '過去24時間',
    week: '過去1週間',
    month: '過去1ヶ月',
    year: '過去1年'
  },
  preview: {
    title: 'クエリプレビュー',
    copy: 'コピー',
    copied: 'コピーしました!'
  },
  language: {
    label: '言語',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'es': 'Español',
    'ko': '한국어',
    'ja': '日本語'
  },
  tips: {
    title: 'ヒント',
    tip1: 'Enterを押してキーワードを追加、追加したキーワードをクリックして完全一致を切り替え',
    tip2: 'カスタムサイトはローカルに保存され、次回訪問時に利用できます',
    tip3: 'すべての操作はローカルで行われ、サーバーにデータは送信されません'
  },
  keyword: {
    title: '検索キーワード',
    hint: '完全なクエリを入力し、テキストを選択してボタンをクリックしてタイプをマーク',
    placeholder: '完全な検索クエリを入力、例：Androidでyoloをデプロイする方法\nテキストを選択し、下のボタンをクリックしてタイプをマーク（完全一致/除外）\n選択されていない部分は通常のキーワードになります',
    normal: '通常',
    exact: '完全一致',
    exclude: '除外',
    normalTooltip: '選択したテキストまたは文全体を通常としてマーク',
    exactTooltip: '選択したテキストまたは文全体を完全一致としてマーク',
    excludeTooltip: '選択したテキストまたは文全体を除外としてマーク',
    markedKeywords: 'マークされたキーワード：',
    clickToToggle: 'クリックしてタイプを変更'
  },
  filter: {
    excludeSites: 'サイト除外',
    excludeSitesCount: 'サイトが除外されました',
    excludeSitesClick: '除外するサイトを選択',
    timeRange: '期間',
    fileType: 'ファイルタイプ',
    otherFormat: 'その他',
    excludeTip: '検索結果に以下のサイトのコンテンツは含まれません',
    excludeClick: '除外するサイトを選択:',
    excluded: '除外済み:',
    done: '完了'
  },
  advanced: {
    title: 'その他のオプション',
    onlySites: 'これらのサイトのみ検索',
    onlySitesDesc: '結果は選択したサイトからのみ表示されます',
    addCustomSite: 'カスタムサイトを追加...',
    orKeywordsDesc: 'これらのキーワードのいずれかに一致',
    position: '位置限定',
    positionDesc: 'キーワードが次の位置に表示される必要があります',
    body: '本文',
    special: '特殊',
    similar: '類似',
    define: '定義',
    range: '範囲',
    language: '言語',
    reset: 'リセット',
    done: '完了'
  },
  action: {
    remember: '条件を記憶',
    reset: 'リセット',
    moreOptions: 'その他のオプション'
  },
  trust: {
    local: '100%ローカル実行、データアップロードなし',
    standard: '標準構文、100%認識'
  }
}

