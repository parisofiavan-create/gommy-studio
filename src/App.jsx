import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  Copy,
  Crown,
  ExternalLink,
  Heart,
  Moon,
  Rabbit,
  RefreshCw,
  Sparkles,
  Volume2,
  VolumeX,
  WandSparkles,
  X,
} from 'lucide-react'

const categories = [
  {
    id: 'location',
    label: '¿Dónde ocurre?',
    hint: '01 · LUGAR',
    description: 'Elige el lugar de tu fondo.',
    type: 'single',
    options: [
      { id: 'hallway', label: 'Pasillo infinito', emoji: '🚪' },
      { id: 'pool', label: 'Piscina interior', emoji: '🫧' },
      { id: 'mall', label: 'Centro comercial vacío', emoji: '🛍️' },
      { id: 'meadow', label: 'Pradera bajo la luna', emoji: '🌾' },
      { id: 'bedroom', label: 'Habitación de infancia', emoji: '🧸' },
      { id: 'rooftop', label: 'Azotea tranquila', emoji: '🏙️' },
    ],
  },
  {
    id: 'time',
    label: '¿A qué hora?',
    hint: '02 · MOMENTO',
    description: 'Escoge una hora real o imposible.',
    type: 'single',
    options: [
      { id: 'blue-hour', label: 'Hora azul', emoji: '🌘' },
      { id: 'three-am', label: '3:17 de la madrugada', emoji: '🕒' },
      { id: 'golden', label: 'Última luz dorada', emoji: '🌤️' },
      { id: 'eclipse', label: 'Eclipse suave', emoji: '🌑' },
      { id: 'overcast', label: 'Cielo nublado', emoji: '☁️' },
    ],
  },
  {
    id: 'mood',
    label: '¿Qué sensación tiene?',
    hint: '03 · AMBIENTE',
    description: 'Puedes elegir varias sensaciones.',
    type: 'multi',
    options: [
      { id: 'nostalgic', label: 'Nostálgica', emoji: '📼' },
      { id: 'weightless', label: 'Ligera como un sueño', emoji: '🪽' },
      { id: 'unsettling', label: 'Extrañamente familiar', emoji: '🪞' },
      { id: 'tender', label: 'Dulce y delicada', emoji: '🕯️' },
      { id: 'quiet', label: 'Muy tranquila', emoji: '🤍' },
      { id: 'lonely', label: 'Solitario, pero bonito', emoji: '🌙' },
    ],
  },
  {
    id: 'elements',
    label: '¿Qué aparece?',
    hint: '04 · DETALLES',
    description: 'Añade todos los detalles que quieras.',
    type: 'multi',
    options: [
      { id: 'fog', label: 'Niebla bajita', emoji: '🌫️' },
      { id: 'flowers', label: 'Flores silvestres', emoji: '🌼' },
      { id: 'windows', label: 'Ventanas iluminadas', emoji: '🪟' },
      { id: 'water', label: 'Agua en calma', emoji: '💧' },
      { id: 'dust', label: 'Polvo flotando', emoji: '✧' },
      { id: 'bunny', label: 'Un conejito', emoji: '🐇' },
    ],
  },
  {
    id: 'style',
    label: '¿Cómo se ve?',
    hint: '05 · ESTILO',
    description: 'Elige el acabado de la imagen.',
    type: 'single',
    options: [
      { id: 'film', label: 'Película de 35 mm', emoji: '🎞️' },
      { id: 'analog', label: 'Suavidad analógica', emoji: '📺' },
      { id: 'painterly', label: 'Pincelada difusa', emoji: '🖌️' },
      { id: 'vhs', label: 'Sueño VHS', emoji: '📹' },
      { id: 'cinematic', label: 'Escena de película', emoji: '🎬' },
    ],
  },
]

const englishCategories = {
  location: {
    label: 'Where does it happen?', hint: '01 · PLACE', description: 'Choose the place for your wallpaper.',
    options: { hallway: 'Endless hallway', pool: 'Indoor pool', mall: 'Empty shopping mall', meadow: 'Moonlit meadow', bedroom: 'Childhood bedroom', rooftop: 'Quiet rooftop' },
  },
  time: {
    label: 'What time is it?', hint: '02 · TIME', description: 'Pick a real or impossible hour.',
    options: { 'blue-hour': 'Blue hour', 'three-am': '3:17 in the morning', golden: 'Last golden light', eclipse: 'Soft eclipse', overcast: 'Forever cloudy' },
  },
  mood: {
    label: 'How does it feel?', hint: '03 · MOOD', description: 'Choose as many feelings as you like.',
    options: { nostalgic: 'Nostalgic', weightless: 'Light as a dream', unsettling: 'Strangely familiar', tender: 'Sweet and gentle', quiet: 'Very quiet', lonely: 'Lonely, but lovely' },
  },
  elements: {
    label: 'What is in your scene?', hint: '04 · DETAILS', description: 'Add as many little details as you like.',
    options: { fog: 'Soft low fog', flowers: 'Wildflowers', windows: 'Glowing windows', water: 'Still water', dust: 'Floating dust', bunny: 'A tiny bunny' },
  },
  style: {
    label: 'What should it look like?', hint: '05 · STYLE', description: 'Choose the image finish.',
    options: { film: '35mm film', analog: 'Soft analog', painterly: 'Dreamy brushstrokes', vhs: 'VHS dream', cinematic: 'Movie still' },
  },
}

const interfaceText = {
  en: {
    home: 'Gommy Wallpaper Studio home', brand: 'WALLPAPER STUDIO', motto: 'SWEET OUTSIDE, CLEVER INSIDE',
    welcomeTitle: 'Welcome to your dream corner', welcomeCopy: 'Gommy Wallpaper Studio is a free tool that helps you create perfect prompts for Dreamcore and Liminal Spaces wallpapers. Choose options or write what you want; the app creates a ready-to-use prompt. Copy and paste it into Midjourney, DALL·E, Kling, or another AI app to create your image. This app does not generate images. It only creates prompts.', welcomePremium: 'More complete premium prompts without a watermark are available on Gumroad.', welcomeLink: 'EXPLORE GUMROAD',
    language: 'Language', mute: 'Mute selection sounds', unmute: 'Turn on selection sounds',
    builder: 'Wallpaper creator', imagine: 'LET’S IMAGINE', title: 'Dream up', titleEmphasis: 'your wallpaper', intro: 'Choose your favorite ideas and watch your scene change.',
    surprise: 'Surprise me', firstTime: 'First time?', guide: 'Start with a place, then follow the prompts. Some steps let you choose more than one option.', footnote: 'A little world, made your way.',
    preview: 'Dream scene inspiration', previewKicker: 'SCENE INSPIRATION', previewTitle: 'A little dream world', previewRatio: 'INSPIRATION', sceneTop: 'GOMMY’S DREAM WORLD', sceneBottom: 'STAY A LITTLE', sceneLabel: 'DREAM SCENE', sceneCaption: 'a little place to dream', sceneChanges: 'YOUR PROMPT IDEAS SHAPE THIS SCENE',
    bunny: 'A tiny bunny', favoriteRemove: 'Remove from favorites', favoriteSave: 'Save to favorites', favoriteRemovePrompt: 'Remove prompt from favorites', favoriteSavePrompt: 'Save prompt to favorites', another: 'Make another combination',
    promptAside: 'Image prompt and favorites', promptKicker: 'WRITE & COPY', promptTitle: 'Your image prompt', promptHelp: 'Choose chips or write an idea, then press Enter to create a ready-to-copy prompt. This app creates prompts, not images.', promptLabel: 'Your idea', ideaPlaceholder: 'For example: an empty hotel hallway lit by soft pink light…', resultLabel: 'Your ready-to-use prompt', copied: 'COPIED!', copy: 'COPY PROMPT', copyError: 'Could not copy. Select the text and copy it manually.', promptLanguage: 'The prompt is written in English to work with more image generators.', enterHint: 'Press Enter to create a prompt · Shift + Enter for a new line', createPrompt: 'CREATE PROMPT', promptsLeft: 'free prompts left', promptsUsed: 'free prompts used', limitTitle: 'You’ve used all 5 free prompts.', limitMessage: 'Contact Gommy Studio to get a Pro pass for unlimited prompts at $7 USD per month.', contactGommy: 'CONTACT GOMMY STUDIO', getProPass: 'GET THE PRO PASS · $7/MONTH',
    favoritesKicker: 'YOUR FAVORITES', favoritesTitle: 'Saved wallpapers', noFavorites: 'Nothing saved just yet.', saveHint: 'Tap the heart to keep a wallpaper.', restore: 'Use this wallpaper again', removeSaved: 'Remove saved wallpaper', more: 'more', footer: 'MADE WITH A LITTLE GOMMY MAGIC', copyright: '© 2025 GOMMYBUNNY',
    proHeading: 'A little more Gommy magic', proWatermark: 'Explore more complete premium prompts without a watermark.', proCta: 'EXPLORE PREMIUM PROMPTS', proDetails: 'Pro details', proTitle: 'Pro pass: unlimited prompts.', proPrice: '$7 USD per month.', proNote: 'Contact Gommy Studio for your pass. This app does not process payments or sign-ins.', visitGumroad: 'VISIT GUMROAD', close: 'Close',
    moodWeightless: 'nothing has to stay here', moodUnsettling: 'you have been here before', moodTender: 'the quiet is kind here', moodDefault: 'a place you almost remember',
  },
  es: {
    home: 'Inicio de Gommy Wallpaper Studio', brand: 'ESTUDIO DE FONDOS', motto: 'DULCE POR FUERA, INGENIOSA POR DENTRO',
    welcomeTitle: 'Te damos la bienvenida a tu rincón de ensueño', welcomeCopy: 'Gommy Wallpaper Studio es una herramienta gratuita que te ayuda a crear prompts perfectos para generar wallpapers Dreamcore y Liminal Spaces. Elige opciones o escribe lo que quieres; la app crea un prompt listo para usar. Cópialo y pégalo en Midjourney, DALL·E, Kling u otra app de IA para crear tu imagen. Esta app no genera imágenes. Solo crea prompts.', welcomePremium: 'Los prompts premium, más completos y sin marca de agua, están disponibles en Gumroad.', welcomeLink: 'VER PROMPTS PREMIUM',
    language: 'Idioma', mute: 'Silenciar sonidos al elegir', unmute: 'Activar sonidos al elegir',
    builder: 'Creador de fondos de pantalla', imagine: 'VAMOS A IMAGINAR', title: 'Crea tu fondo', titleEmphasis: 'de ensueño', intro: 'Elige tus ideas favoritas; verás el cambio al instante.',
    surprise: 'Sorpréndeme', firstTime: '¿Primera vez?', guide: 'Empieza por el lugar y sigue las preguntas. En algunos pasos puedes elegir más de una opción.', footnote: 'Un fondo hecho a tu manera.',
    preview: 'Inspiración de escena', previewKicker: 'INSPIRACIÓN DE ESCENA', previewTitle: 'Un pequeño mundo de ensueño', previewRatio: 'INSPIRACIÓN', sceneTop: 'EL MUNDO DE GOMMY', sceneBottom: 'QUÉDATE UN RATITO', sceneLabel: 'ESCENA DE ENSUEÑO', sceneCaption: 'un lugar para soñar', sceneChanges: 'TUS IDEAS DAN FORMA A ESTA ESCENA',
    bunny: 'Un conejito', favoriteRemove: 'Quitar de favoritos', favoriteSave: 'Guardar en favoritos', favoriteRemovePrompt: 'Quitar descripción de favoritos', favoriteSavePrompt: 'Guardar descripción en favoritos', another: 'Crear otra combinación',
    promptAside: 'Prompt de imagen y favoritos', promptKicker: 'ESCRIBE Y COPIA', promptTitle: 'Tu prompt de imagen', promptHelp: 'Elige chips o escribe una idea y pulsa Enter para crear un prompt listo para copiar. Esta app crea prompts, no imágenes.', promptLabel: 'Tu idea', ideaPlaceholder: 'Por ejemplo: un pasillo de hotel vacío, con una luz rosa suave…', resultLabel: 'Tu prompt listo para usar', copied: '¡COPIADO!', copy: 'COPIAR PROMPT', copyError: 'No se pudo copiar. Selecciona el texto y cópialo manualmente.', promptLanguage: 'El prompt se redacta en inglés para que sea compatible con más generadores.', enterHint: 'Pulsa Enter para crear un prompt · Mayús + Enter para escribir otra línea', createPrompt: 'CREAR PROMPT', promptsLeft: 'prompts gratis restantes', promptsUsed: 'prompts gratis usados', limitTitle: 'Ya usaste tus 5 prompts gratis.', limitMessage: 'Contacta a Gommy Studio para obtener un pase Pro y crear prompts ilimitados por $7 USD al mes.', contactGommy: 'CONTACTAR A GOMMY STUDIO', getProPass: 'OBTENER PASE PRO · $7/MES',
    favoritesKicker: 'TUS FAVORITOS', favoritesTitle: 'Fondos guardados', noFavorites: 'Aún no has guardado ninguno.', saveHint: 'Pulsa el corazón para guardar tu fondo.', restore: 'Volver a usar este fondo', removeSaved: 'Eliminar fondo guardado', more: 'más', footer: 'HECHO CON UN POQUITO DE MAGIA GOMMY', copyright: '© 2025 GOMMYBUNNY',
    proHeading: 'Un poquito más de magia Gommy', proWatermark: 'Descubre prompts premium más completos y sin marca de agua.', proCta: 'VER PROMPTS PREMIUM', proDetails: 'Detalles Pro', proTitle: 'Pase Pro: prompts ilimitados.', proPrice: '$7 USD al mes.', proNote: 'Contacta a Gommy Studio para obtener tu pase. La app no procesa pagos ni inicia sesión.', visitGumroad: 'IR A GUMROAD', close: 'Cerrar',
    moodWeightless: 'aquí nada tiene que quedarse', moodUnsettling: 'ya habías estado aquí', moodTender: 'aquí la calma te cuida', moodDefault: 'un lugar casi conocido',
  },
}

const sceneImages = {
  hallway: 'photo-1519608487953-e999c86e7455',
  pool: 'photo-1530549387789-4c1017266635',
  mall: 'photo-1519567241046-7f570eee3ce6',
  meadow: 'photo-1470252649378-9c29740c9fa8',
  bedroom: 'photo-1513519245088-0e12902e5a38',
  rooftop: 'photo-1519608487953-e999c86e7455',
}

const initialSelection = {
  location: ['hallway'],
  time: ['blue-hour'],
  mood: ['nostalgic', 'quiet'],
  elements: ['fog', 'windows'],
  style: ['film'],
}

const promptTerms = {
  hallway: 'an endless hallway',
  pool: 'an indoor pool',
  mall: 'an empty shopping mall',
  meadow: 'a moonlit meadow',
  bedroom: 'a childhood bedroom',
  rooftop: 'a quiet rooftop',
  'blue-hour': 'blue hour',
  'three-am': '3:17 am',
  golden: 'the last golden light',
  eclipse: 'a soft eclipse',
  overcast: 'an endlessly overcast sky',
  nostalgic: 'nostalgic',
  weightless: 'weightless',
  unsettling: 'almost familiar',
  tender: 'tender',
  quiet: 'very quiet',
  lonely: 'beautifully lonely',
  fog: 'low drifting fog',
  flowers: 'wildflowers',
  windows: 'glowing windows',
  water: 'still water',
  dust: 'floating dust',
  bunny: 'a tiny bunny',
  film: '35mm film',
  analog: 'soft analog texture',
  painterly: 'a painterly haze',
  vhs: 'a VHS dream',
  cinematic: 'a cinematic still',
}

const promptFor = (selection, idea = '') => {
  const words = categories.map((category) => {
    const chosen = category.options
      .filter((option) => selection[category.id]?.includes(option.id))
      .map((option) => promptTerms[option.id])
    return chosen.length ? chosen.join(' and ') : null
  })
  const [location, time, mood, elements, style] = words
  const moodText = mood ? `${mood} atmosphere` : 'dreamlike atmosphere'
  const detailText = elements ? `with ${elements}` : 'with delicate, surreal details'
  const styleText = style || 'soft analog texture'
  const ideaText = idea.trim() ? `Inspired by this idea: ${idea.trim()}. ` : ''
  return `${ideaText}A ${moodText} in ${location || 'a liminal place'} at ${time || 'an impossible hour'}, ${detailText}. ${styleText}, pastel pink and purple accents, silver sparkles, soft golden highlights, gentle film grain, soft focus, atmospheric lighting, liminal dreamcore wallpaper, no other text, subtle "Gommy Studio" watermark in the bottom-right corner.`
}

const FREE_PROMPT_LIMIT = 5

const readPromptCount = () => {
  try {
    const count = Number(localStorage.getItem('gommy-free-prompt-count'))
    return Number.isFinite(count) ? Math.min(FREE_PROMPT_LIMIT, Math.max(0, count)) : 0
  } catch {
    return 0
  }
}

const readFavorites = () => {
  try {
    const saved = localStorage.getItem('gommy-favorites')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const [scene, setScene] = useState(() => ({ selection: initialSelection, prompt: promptFor(initialSelection) }))
  const [favorites, setFavorites] = useState(readFavorites)
  const [copied, setCopied] = useState(false)
  const [activeCategory, setActiveCategory] = useState('location')
  const [copyError, setCopyError] = useState(false)
  const [promptIdea, setPromptIdea] = useState('')
  const [freePromptCount, setFreePromptCount] = useState(readPromptCount)
  const [locale, setLocale] = useState('en')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isProModalOpen, setIsProModalOpen] = useState(false)
  const audioContextRef = useRef(null)
  const text = interfaceText[locale]
  const { selection, prompt } = scene
  const selectedLocation = selection.location[0] || 'hallway'
  const promptsExhausted = freePromptCount >= FREE_PROMPT_LIMIT
  const savedCurrent = favorites.some((favorite) => favorite.prompt === prompt)
  const sceneMood = selection.mood.map((mood) => `scene-mood-${mood}`).join(' ')
  const sceneTime = selection.time.map((time) => `scene-time-${time}`).join(' ')
  const moodCaption = selection.mood.includes('weightless')
    ? text.moodWeightless
    : selection.mood.includes('unsettling')
      ? text.moodUnsettling
      : selection.mood.includes('tender')
        ? text.moodTender
        : text.moodDefault

  useEffect(() => {
    try {
      localStorage.setItem('gommy-favorites', JSON.stringify(favorites))
    } catch {
      // Storage can be unavailable in private browsing; favorites still work in memory.
    }
  }, [favorites])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    try {
      localStorage.setItem('gommy-free-prompt-count', String(freePromptCount))
    } catch {
      // The free prompt limit still applies for this session if storage is unavailable.
    }
  }, [freePromptCount])

  useEffect(() => () => {
    audioContextRef.current?.close()
  }, [])

  useEffect(() => {
    if (!isProModalOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsProModalOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isProModalOpen])

  const playSelectionSound = () => {
    if (!soundEnabled) return
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return

    try {
      const context = audioContextRef.current || (audioContextRef.current = new AudioContextClass())
      void context.resume().catch(() => {})
      const oscillator = context.createOscillator()
      const volume = context.createGain()
      const now = context.currentTime
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(660, now)
      oscillator.frequency.exponentialRampToValueAtTime(990, now + 0.12)
      volume.gain.setValueAtTime(0.0001, now)
      volume.gain.exponentialRampToValueAtTime(0.08, now + 0.025)
      volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.32)
      oscillator.connect(volume)
      volume.connect(context.destination)
      oscillator.start(now)
      oscillator.stop(now + 0.33)
    } catch {
      audioContextRef.current = null
    }
  }

  const toggleOption = (category, optionId) => {
    setScene((current) => {
      const currentSelection = current.selection
      const selected = currentSelection[category.id] || []
      const next = category.type === 'single'
        ? (selected.includes(optionId) ? [] : [optionId])
        : selected.includes(optionId)
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId]
      const nextSelection = { ...currentSelection, [category.id]: next }
      return { selection: nextSelection, prompt: promptFor(nextSelection) }
    })
  }

  const createPrompt = () => {
    if (promptsExhausted) return
    setScene((current) => ({ ...current, prompt: promptFor(current.selection, promptIdea) }))
    setFreePromptCount((count) => Math.min(FREE_PROMPT_LIMIT, count + 1))
  }

  const randomize = () => {
    const selection = Object.fromEntries(categories.map((category) => {
      const shuffled = [...category.options].sort(() => Math.random() - 0.5)
      const count = category.type === 'single' ? 1 : 2
      return [category.id, shuffled.slice(0, count).map((option) => option.id)]
    }))
    setScene({ selection, prompt: promptFor(selection) })
  }

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setCopyError(false)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
      setCopyError(true)
      window.setTimeout(() => setCopyError(false), 3500)
    }
  }

  const toggleFavorite = () => {
    setFavorites((current) => savedCurrent
      ? current.filter((favorite) => favorite.prompt !== prompt)
      : [{ prompt, selection, id: Date.now() }, ...current])
  }

  const restoreFavorite = (favorite) => setScene({ selection: favorite.selection, prompt: favorite.prompt })

  const removeFavorite = (id) => setFavorites((current) => current.filter((favorite) => favorite.id !== id))

  return (
    <main className="studio-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Inicio de Gommy Wallpaper Studio">
          <span className="brand-mark"><Rabbit size={21} strokeWidth={1.7} /><Crown className="brand-crown" size={11} strokeWidth={2} /><Sparkles className="brand-sparkle" size={9} /></span>
          <span className="brand-name">gommy<span>®</span></span>
          <span className="brand-divider" />
          <span className="brand-product">{text.brand}</span>
        </a>
        <div className="topbar-right">
          <span className="mood-status"><Sparkles size={13} /> {text.motto}</span>
          <div className="topbar-tools">
            <div className="language-switcher" role="group" aria-label={text.language}>
              {['en', 'es'].map((language) => (
                <button key={language} type="button" className={locale === language ? 'active' : ''} aria-pressed={locale === language} onClick={() => setLocale(language)}>{language.toUpperCase()}</button>
              ))}
            </div>
            <button type="button" className="sound-toggle" onClick={() => setSoundEnabled((enabled) => !enabled)} aria-label={soundEnabled ? text.mute : text.unmute} title={soundEnabled ? text.mute : text.unmute} aria-pressed={soundEnabled}>
              {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>
          </div>
        </div>
      </header>

      <section className="welcome-banner" aria-labelledby="welcome-title">
        <span className="welcome-mark" aria-hidden="true"><Rabbit size={22} /><Crown size={12} /><Sparkles size={10} /></span>
        <div className="welcome-copy">
          <h2 id="welcome-title">{text.welcomeTitle}</h2>
          <p>{text.welcomeCopy}</p>
          <span className="welcome-premium"><Sparkles size={13} /> {text.welcomePremium}</span>
        </div>
        <a className="welcome-link" href="https://gommystudio.gumroad.com/l/wwnrhy" target="_blank" rel="noreferrer">{text.welcomeLink}<ExternalLink size={14} /></a>
      </section>

      <div className="workspace" id="top">
        <aside className="builder-panel" aria-label={text.builder}>
          <div className="section-kicker"><span>01</span><span>{text.imagine}</span></div>
          <div className="builder-heading-row">
            <div>
              <h1>{text.title}<br /><em>{text.titleEmphasis}</em></h1>
              <p className="builder-intro">{text.intro}</p>
            </div>
            <button className="icon-button shuffle-button" onClick={randomize} title={text.surprise} aria-label={text.surprise}>
              <WandSparkles size={17} />
            </button>
          </div>
          <p className="builder-guide"><span>{text.firstTime}</span> {text.guide}</p>

          <div className="category-list">
            {categories.map((category, index) => {
              const localizedCategory = locale === 'en' ? englishCategories[category.id] : category
              const expanded = activeCategory === category.id
              const count = selection[category.id]?.length || 0
              return (
                <section className={`category-section ${expanded ? 'is-open' : ''}`} key={category.id}>
                  <button className="category-heading" onClick={() => setActiveCategory(expanded ? null : category.id)} aria-expanded={expanded}>
                    <span className="category-number">0{index + 1}</span>
                    <span className="category-title-wrap"><span className="category-hint">{localizedCategory.hint}</span><span className="category-title">{localizedCategory.label}</span></span>
                    {count > 0 && <span className="selection-count">{count}</span>}
                    <ChevronDown className="category-chevron" size={15} />
                  </button>
                  {expanded && (
                    <div className="category-content">
                    <p className="category-description">{localizedCategory.description}</p>
                    <div className="chip-list">
                      {category.options.map((option) => {
                        const selected = selection[category.id]?.includes(option.id)
                        return (
                          <button
                            className={`prompt-chip ${selected ? 'selected' : ''}`}
                            key={option.id}
                            onClick={() => {
                              playSelectionSound()
                              toggleOption(category, option.id)
                            }}
                            aria-pressed={selected}
                          >
                            <span className="chip-emoji" aria-hidden="true">{option.emoji}</span>{localizedCategory.options[option.id] || option.label}
                          </button>
                        )
                      })}
                    </div>
                    </div>
                  )}
                </section>
              )
            })}
          </div>
          <div className="builder-footnote"><Sparkles size={13} /><span>{text.footnote}</span></div>
        </aside>

        <section className="preview-column" aria-label={text.preview}>
          <div className="preview-heading">
            <div><div className="section-kicker"><span>02</span><span>{text.previewKicker}</span></div><h2>{text.previewTitle} <em>{locale === 'en' ? 'your wallpaper' : 'tu fondo'}</em></h2></div>
            <span className="preview-resolution">{text.previewRatio} <span>·</span> 9:16</span>
          </div>
          <div className={`wallpaper-scene scene-${selectedLocation} ${sceneMood} ${sceneTime}`} style={{ '--scene-image': `url(https://images.unsplash.com/${sceneImages[selectedLocation]}?auto=format&fit=crop&w=1400&q=85)` }}>
                <div className="scene-image" />
                <div className="scene-wash" />
                <div className="scene-atmosphere" />
                <div className="scene-grain" />
                <div className="scene-vignette" />
                {selection.elements.includes('fog') && <div className="scene-fog" aria-hidden="true"><i /><i /><i /></div>}
                <div className="scene-stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
                <div className="scene-topline"><span>{text.sceneTop}</span><span>{locale === 'en' ? 'NO.' : 'N.º'} 0{(categories[0].options.findIndex((option) => option.id === selectedLocation) + 1)}</span></div>
                <div className="scene-center-copy">
                  {selection.elements.includes('bunny') && <span className="scene-bunny" aria-label={text.bunny}>☾ ᵕ̈</span>}
                  <span className="scene-caption">{text.sceneCaption}</span>
                  <span className="scene-caption-small">{moodCaption}</span>
                </div>
                <div className="scene-bottomline"><span>GOMMYBUNNY</span><span>✳</span><span>{text.sceneBottom}</span></div>
                <div className="scene-label"><Moon size={12} fill="currentColor" /> {text.sceneLabel} <span className="scene-detail-icons" aria-label={`${locale === 'en' ? 'Scene details' : 'Detalles de la escena'}: ${selection.elements.map((element) => locale === 'en' ? englishCategories.elements.options[element] : categories[3].options.find((option) => option.id === element)?.label).join(', ')}`}>{selection.elements.map((element) => categories[3].options.find((option) => option.id === element)?.emoji).join(' ')}</span></div>
          </div>
          <div className="preview-controls">
            <div className="preview-note"><span className="live-dot" /> <span>{text.sceneChanges}</span></div>
            <div className="preview-actions">
              <button className="icon-button" onClick={toggleFavorite} title={savedCurrent ? text.favoriteRemove : text.favoriteSave} aria-label={savedCurrent ? text.favoriteRemovePrompt : text.favoriteSavePrompt} aria-pressed={savedCurrent}>
                <Heart size={17} fill={savedCurrent ? 'currentColor' : 'none'} />
              </button>
              <button className="icon-button" onClick={randomize} title={text.another} aria-label={text.another}><RefreshCw size={16} /></button>
              <button className="download-button" onClick={copyPrompt}><Copy size={15} /> <span>{text.copy}</span></button>
            </div>
          </div>
          <div className="preview-caption"><span>GOMMY STUDIO</span><span>{locale === 'en' ? 'EVERY LITTLE WORLD STARTS WITH AN IDEA.' : 'CADA MUNDO EMPIEZA CON UNA IDEA.'}</span><span>✳</span></div>
        </section>

        <aside className="prompt-column" aria-label={text.promptAside}>
          <section className="prompt-card">
            <div className="section-kicker"><span>03</span><span>{text.promptKicker}</span></div>
            <div className="prompt-title-row"><h2>{text.promptTitle}</h2><Sparkles size={16} /></div>
            <p className="prompt-description">{text.promptHelp}</p>
            <label className="prompt-label" htmlFor="prompt-idea">{text.promptLabel}</label>
            <textarea
              className="prompt-idea"
              id="prompt-idea"
              value={promptIdea}
              placeholder={text.ideaPlaceholder}
              onChange={(event) => setPromptIdea(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault()
                  createPrompt()
                }
              }}
              aria-describedby="prompt-enter-hint"
            />
            <span className="copy-hint" id="prompt-enter-hint">{text.enterHint}</span>
            <div className="prompt-quota" aria-live="polite">
              <span>{promptsExhausted ? `${freePromptCount} / ${FREE_PROMPT_LIMIT} ${text.promptsUsed}` : `${FREE_PROMPT_LIMIT - freePromptCount} ${text.promptsLeft}`}</span>
              <button className="create-prompt-button" type="button" onClick={createPrompt} disabled={promptsExhausted}>{text.createPrompt}</button>
            </div>
            {promptsExhausted && (
              <div className="quota-notice" role="status">
                <strong>{text.limitTitle}</strong>
                <p>{text.limitMessage}</p>
                <div className="quota-links">
                  <a href="https://www.instagram.com/gommystudio/" target="_blank" rel="noreferrer">{text.contactGommy}<ExternalLink size={13} /></a>
                  <a href="https://gommystudio.gumroad.com/l/wwnrhy" target="_blank" rel="noreferrer">{text.getProPass}<ExternalLink size={13} /></a>
                </div>
              </div>
            )}
            <label className="prompt-label prompt-result-label" htmlFor="image-prompt">{text.resultLabel}</label>
            <textarea className="prompt-output" id="image-prompt" value={prompt} onChange={(event) => setScene((current) => ({ ...current, prompt: event.target.value }))} aria-describedby="prompt-language-note" />
            <div className="prompt-card-actions">
              <button className={`copy-button ${copied ? 'is-copied' : ''}`} onClick={copyPrompt}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? text.copied : text.copy}</span>
              </button>
              <button className={`save-button ${savedCurrent ? 'is-saved' : ''}`} onClick={toggleFavorite} aria-label={savedCurrent ? text.favoriteRemove : text.favoriteSave} title={savedCurrent ? text.favoriteRemove : text.favoriteSave}>
                <Heart size={16} fill={savedCurrent ? 'currentColor' : 'none'} />
              </button>
            </div>
            {copyError ? <span className="copy-hint copy-error">{text.copyError}</span> : !copied && <span className="copy-hint" id="prompt-language-note">{text.promptLanguage}</span>}
            <section className="pro-banner" aria-label={text.proHeading}>
              <div className="pro-banner-copy"><Crown size={17} /><span><strong>{text.proHeading}</strong><span>{text.proWatermark}</span></span></div>
              <div className="pro-banner-actions">
                <button type="button" className="pro-details-button" onClick={() => setIsProModalOpen(true)}>{text.proDetails}</button>
                <a className="pro-gumroad-link" href="https://gommystudio.gumroad.com/l/wwnrhy" target="_blank" rel="noreferrer">{text.proCta}<ExternalLink size={14} /></a>
              </div>
            </section>
          </section>

          <section className="favorites-section">
            <div className="favorites-heading"><div><div className="section-kicker"><span>04</span><span>{text.favoritesKicker}</span></div><h2>{text.favoritesTitle} <span>{favorites.length.toString().padStart(2, '0')}</span></h2></div><Heart size={16} /></div>
            {favorites.length === 0 ? (
              <div className="empty-favorites"><span className="empty-star">✳</span><p>{text.noFavorites}</p><span>{text.saveHint}</span></div>
            ) : (
              <ul className="favorite-list">
                {favorites.slice(0, 5).map((favorite) => (
                  <li className="favorite-item" key={favorite.id}>
                    <button className="favorite-restore" onClick={() => restoreFavorite(favorite)} title={text.restore}>
                      <span className="favorite-thumb"><Moon size={15} /></span>
                      <span className="favorite-text"><span>{favorite.selection.location?.[0] ? locale === 'en' ? englishCategories.location.options[favorite.selection.location[0]] : categories[0].options.find((option) => option.id === favorite.selection.location[0])?.label : locale === 'en' ? 'Dreamlike place' : 'Lugar de ensueño'}</span><span>{favorite.selection.time?.[0] ? locale === 'en' ? englishCategories.time.options[favorite.selection.time[0]] : categories[1].options.find((option) => option.id === favorite.selection.time[0])?.label : locale === 'en' ? 'An impossible hour' : 'Una hora imposible'}</span></span>
                    </button>
                    <button className="remove-favorite" onClick={() => removeFavorite(favorite.id)} aria-label={text.removeSaved}><X size={14} /></button>
                  </li>
                ))}
              </ul>
            )}
            {favorites.length > 5 && <p className="favorites-overflow">+ {favorites.length - 5} {text.more}</p>}
          </section>
          <div className="prompt-footer"><span>{text.footer}</span><span>{text.copyright}</span></div>
        </aside>
      </div>
      {isProModalOpen && (
        <div className="pro-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsProModalOpen(false)
        }}>
          <section className="pro-modal" role="dialog" aria-modal="true" aria-labelledby="pro-modal-title">
            <button type="button" className="pro-modal-close" onClick={() => setIsProModalOpen(false)} aria-label={text.close}><X size={18} /></button>
            <span className="pro-modal-crown"><Crown size={23} /></span>
            <h2 id="pro-modal-title">{text.proTitle}</h2>
            <p>{text.proPrice}</p>
            <span className="pro-modal-note">{text.proNote}</span>
            <a className="pro-modal-link" href="https://gommystudio.gumroad.com/l/wwnrhy" target="_blank" rel="noreferrer">{text.visitGumroad}<ExternalLink size={15} /></a>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
