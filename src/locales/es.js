export default {
  app: {
    title: 'ByteAB',
    subtitle: 'Asistente de Parámetros de Búsqueda Avanzada',
    description: 'Construye consultas de búsqueda precisas rápidamente sin memorizar sintaxis compleja'
  },
  search: {
    placeholder: 'Ingresa palabras clave...',
    button: 'Buscar',
    exactMatch: 'Coincidencia Exacta',
    exactMatchTip: 'Buscar palabras clave como frase completa',
    excludeKeyword: 'Excluir Palabras',
    excludeKeywordPlaceholder: 'Ingresa palabras a excluir...',
    excludeKeywordTip: 'Los resultados no contendrán estas palabras',
    siteFilter: 'Filtro de Sitio',
    siteFilterTip: 'Solo buscar dentro de sitios web especificados',
    excludeSite: 'Excluir Sitios',
    excludeSiteTip: 'Excluir estos sitios web de los resultados',
    fileType: 'Tipo de Archivo',
    fileTypeTip: 'Solo buscar tipos de archivo específicos',
    timeRange: 'Rango de Tiempo',
    timeRangeTip: 'Limitar resultados a un período específico',
    inTitle: 'En Título',
    inTitleTip: 'Las palabras clave deben aparecer en el título',
    inUrl: 'En URL',
    inUrlTip: 'Las palabras clave deben aparecer en la URL',
    orKeywords: 'Palabras O',
    orKeywordsTip: 'Coincidir cualquiera de estas palabras'
  },
  engine: {
    label: 'Motor de Búsqueda',
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
    add: 'Agregar Sitio',
    addPlaceholder: 'Ingresa dominio, ej. example.com',
    saved: 'Sitios Guardados',
    custom: 'Sitios Personalizados',
    remove: 'Eliminar',
    clear: 'Limpiar Todo'
  },
  fileTypes: {
    pdf: 'Documento PDF',
    doc: 'Documento Word',
    xls: 'Hoja de Cálculo Excel',
    ppt: 'PowerPoint',
    txt: 'Archivo de Texto',
    csv: 'Archivo CSV'
  },
  timeRanges: {
    any: 'Cualquier momento',
    day: 'Últimas 24 horas',
    week: 'Última semana',
    month: 'Último mes',
    year: 'Último año'
  },
  preview: {
    title: 'Vista Previa de Consulta',
    copy: 'Copiar',
    copied: '¡Copiado!'
  },
  language: {
    label: 'Idioma',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'es': 'Español',
    'ko': '한국어',
    'ja': '日本語'
  },
  tips: {
    title: 'Consejos',
    tip1: 'Presiona Enter para agregar palabras clave, haz clic en ellas para alternar coincidencia exacta',
    tip2: 'Los sitios personalizados se guardan localmente y estarán disponibles en tu próxima visita',
    tip3: 'Todas las operaciones son locales, no se envían datos a ningún servidor'
  },
  keyword: {
    title: 'Palabras Clave',
    hint: 'Escribe la consulta completa, selecciona texto y marca el tipo',
    placeholder: 'Escribe la consulta completa, ej.: Cómo implementar yolo en Android\nSelecciona texto y haz clic en los botones para marcar tipo (exacto/excluir)\nLas partes no seleccionadas serán palabras clave normales',
    normal: 'Normal',
    exact: 'Exacto',
    exclude: 'Excluir',
    normalTooltip: 'Marca el texto seleccionado o toda la oración como normal',
    exactTooltip: 'Marca el texto seleccionado o toda la oración como coincidencia exacta',
    excludeTooltip: 'Marca el texto seleccionado o toda la oración como excluir',
    markedKeywords: 'Palabras clave marcadas:',
    clickToToggle: 'Haz clic para cambiar tipo'
  },
  filter: {
    excludeSites: 'Excluir Sitios',
    excludeSitesCount: 'sitios excluidos',
    excludeSitesClick: 'Haz clic para excluir sitios',
    timeRange: 'Rango de Tiempo',
    fileType: 'Tipo de Archivo',
    otherFormat: 'Otro',
    excludeTip: 'Los resultados de búsqueda NO incluirán contenido de estos sitios',
    excludeClick: 'Haz clic para excluir:',
    excluded: 'Excluidos:',
    done: 'Hecho'
  },
  advanced: {
    title: 'Más Opciones',
    onlySites: 'Buscar Solo Estos Sitios',
    onlySitesDesc: 'Los resultados solo provendrán de sitios seleccionados',
    addCustomSite: 'Agregar sitio personalizado...',
    orKeywordsDesc: 'Coincidir CUALQUIERA de estas palabras',
    position: 'Posición',
    positionDesc: 'Las palabras clave deben aparecer en',
    body: 'Cuerpo',
    special: 'Especial',
    similar: 'Similar',
    define: 'Definir',
    range: 'Rango',
    language: 'Idioma',
    reset: 'Restablecer',
    done: 'Hecho'
  },
  action: {
    remember: 'Recordar',
    reset: 'Restablecer',
    moreOptions: 'Más Opciones'
  },
  trust: {
    local: '100% local, sin carga',
    standard: 'Sintaxis estándar, 100% reconocida'
  }
}

