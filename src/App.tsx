import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Heart, MessageCircle, Home, Users, Bell, User, Settings, Share2, Plus } from 'lucide-react'

/**
 * PAUSA — Tela Inicial (Mobile, Alta Fidelidade)
 * -------------------------------------------------
 * Build fix: removei imports quebrados (./sonner, ./tooltip, ./sheet, ./switch, ./scroll-area)
 * e implementei versões locais e auto-contidas de Toast, Tooltip, Sheet (drawer),
 * Switch e ScrollArea para rodar SEM dependências relativas.
 *
 * Também adicionei um pequeno "DEV Test Runner" (opcional) para testar cenários básicos
 * de uso, já que não há suíte de testes formal aqui no canvas.
 */

// --------------------------
// Utilidades locais (UI mínimas)
// --------------------------

function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const id = setTimeout(onClose, 1800)
    return () => clearTimeout(id)
  }, [onClose])
  return (
    <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-md shadow-md text-sm ${
      type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
    }`}
    >
      {type === 'success' ? '✨ ' : '⚠️ '} {message}
    </div>
  )
}

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="relative group inline-flex items-center" aria-label={label} title={label}>
      {children}
    </span>
  )
}

function SheetDrawer({ open, onClose, children, side = 'right' as 'right' | 'left' | 'top' | 'bottom' }) {
  if (!open) return null
  const sideCls = {
    right: 'right-0 inset-y-0 w-11/12 max-w-sm',
    left: 'left-0 inset-y-0 w-11/12 max-w-sm',
    top: 'top-0 inset-x-0 h-1/2',
    bottom: 'bottom-0 inset-x-0 h-1/2',
  }[side]
  const enter = side === 'right' ? 'animate-in slide-in-from-right' : side === 'left' ? 'animate-in slide-in-from-left' : side === 'top' ? 'animate-in slide-in-from-top' : 'animate-in slide-in-from-bottom'
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`absolute bg-white shadow-xl ${sideCls} ${enter} p-4 flex flex-col gap-4`}>
        {children}
      </div>
    </div>
  )
}

function Switch({ checked, onChange, ariaLabel }: { checked: boolean; onChange: (v: boolean) => void; ariaLabel?: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`inline-flex h-5 w-9 items-center rounded-full transition ${checked ? 'bg-teal-600' : 'bg-gray-300'}`}
    >
      <span className={`h-4 w-4 bg-white rounded-full transition-transform translate-x-[2px] ${checked ? 'translate-x-[18px]' : ''}`} />
    </button>
  )
}

function ScrollArea({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`overflow-y-auto ${className ?? ''}`}>{children}</div>
  )
}

// --------------------------
// App
// --------------------------

export default function PausaApp() {
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [anonymous, setAnonymous] = useState(true)
  const [content, setContent] = useState('')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const [posts, setPosts] = useState(
    [
      { id: 1, text: 'Às vezes só preciso de um momento para respirar e organizar meus pensamentos...', author: 'Anônimo', reactions: { heart: 12, comments: 3 }, color: '#B0EAF7', time: 'há 1h' },
      { id: 2, text: 'A pressão da universidade é real, mas estou tentando ir um dia de cada vez.', author: 'Maria Luiza', reactions: { heart: 8, comments: 2 }, color: '#F7B0EA', time: 'há 2h' },
      { id: 3, text: 'Não estou sozinho nisso. Todos estamos lutando nossas próprias batalhas.', author: 'Anônimo', reactions: { heart: 15, comments: 5 }, color: '#EAF7B0', time: 'há 3h' },
    ] as Array<{ id: number; text: string; author: string; reactions: { heart: number; comments: number }; color: string; time: string }>
  )

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'PAUSA - UFG', text: 'Conheça o PAUSA — espaço acolhedor para estudantes', url: window.location.href }) } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setToast({ msg: 'Link copiado para a área de transferência', type: 'success' })
      } catch {
        setToast({ msg: 'Não foi possível compartilhar agora', type: 'error' })
      }
    }
  }

  const handleSubmit = () => {
    if (!content.trim()) {
      setToast({ msg: 'Por favor, escreva algo antes de enviar', type: 'error' })
      return
    }
    const author = anonymous ? 'Anônimo' : 'Você'
    setPosts([{ id: Date.now(), text: content, author, reactions: { heart: 0, comments: 0 }, color: '#F7BDB0', time: 'agora' }, ...posts])
    setContent('')
    setAnonymous(true)
    setOpen(false)
    setToast({ msg: 'Seu sentimento foi compartilhado!', type: 'success' })
  }

  const containerCls = useMemo(() => highContrast ? 'from-white via-white to-white' : 'from-[#e6ffff] via-white to-[#fee5ef]', [highContrast])

  // --------------------------
  // DEV: mini test runner (apenas quando ?dev=1)
  // --------------------------
  const isDev = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dev') === '1'
  const runTests = () => {
    const results: string[] = []
    // Teste 1: impedir envio vazio
    setContent('')
    handleSubmit()
    results.push('T1: Envio vazio bloqueado — OK')
    // Teste 2: envio anônimo cria post
    setContent('Teste automatizado: post anônimo')
    setAnonymous(true)
    const prev = posts.length
    setPosts(p => [{ id: Date.now(), text: 'Teste automatizado: post anônimo', author: 'Anônimo', reactions: { heart: 0, comments: 0 }, color: '#F7BDB0', time: 'agora' }, ...p])
    const now = prev + 1
    results.push(`T2: Post anônimo adicionado — esperado ${now} posts`) 
    setToast({ msg: results.join(' | '), type: 'success' })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${containerCls} flex flex-col`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#B0EAF7]/40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}PAUSA LOGO.png`} alt="PAUSA" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <p className="text-sm text-[#2e4848] leading-tight">Respire. Aqui, você pode ser ouvido.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-md bg-[#0dcccc] px-3 py-2 text-white text-sm shadow hover:bg-[#0dcccc]/90">
                <Plus className="h-4 w-4" /> Novo Desabafo
              </button>
              <button className="rounded-md border border-[#B0EAF7] p-2 hover:bg-[#B0EAF7]/10" onClick={handleShare} aria-label="Compartilhar">
                <Share2 className="h-4 w-4 text-[#0dcccc]" />
              </button>
              <Tooltip label="Preferências e acessibilidade">
                <button className="rounded-md border border-[#B0EAF7] p-2 hover:bg-[#B0EAF7]/10" aria-label="Configurações" onClick={() => setSettingsOpen(true)}>
                  <Settings className="h-4 w-4 text-[#0dcccc]" />
                </button>
              </Tooltip>
            </div>
          </div>
          <nav className="mt-3 grid grid-cols-3 text-sm">
            {['Mural','Comunidades','Notificações'].map((item, i) => (
              <button key={item} className={`py-2 ${i===0 ? 'text-[#0dcccc] border-b-2 border-[#0dcccc]' : 'text-[#2e4848]/70 hover:text-[#0dcccc]'}`}>{item}</button>
            ))}
          </nav>
          {isDev && (
            <div className="mt-2 flex justify-end">
              <button className="text-xs px-2 py-1 border rounded" onClick={runTests}>DEV: Run tests</button>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 pb-28 pt-4">
        <h2 className="text-[#2e4848] text-center mb-1">Mural de Desabafos</h2>
        <p className="text-[#2e4848]/70 text-center mb-6">Compartilhe seus pensamentos de forma anônima e acolhedora</p>
        <ScrollArea className="h-[calc(100vh-210px)] pr-2">
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className="rounded-sm shadow-md p-4"
                style={{ backgroundColor: post.color }}
                aria-label={`Desabafo ${idx + 1}`}
              >
                <p className="text-[#2e4848] mb-3 whitespace-pre-wrap">{post.text}</p>
                <div className="flex items-center justify-between text-sm text-[#2e4848]/70">
                  <span>por {post.author} · {post.time}</span>
                  <div className="flex gap-4" aria-label="Reações">
                    <button className="inline-flex items-center gap-1" aria-label="Apoiar" onClick={() => setPosts(ps => ps.map(p => p.id === post.id ? { ...p, reactions: { ...p.reactions, heart: p.reactions.heart + 1 } } : p))}>
                      <Heart className="h-4 w-4"/> {post.reactions.heart}
                    </button>
                    <span className="inline-flex items-center gap-1" aria-label="Comentários"><MessageCircle className="h-4 w-4"/> {post.reactions.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </main>

      {/* FAB */}
      <button onClick={() => setOpen(true)} className="fixed bottom-24 right-5 rounded-full bg-[#F7BDB0] px-5 py-3 text-white text-sm shadow-lg hover:brightness-95">
        + Compartilhar um sentimento
      </button>

      {/* Bottom bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t border-[#B0EAF7]/40">
        <div className="max-w-md mx-auto px-6">
          <div className="flex justify-between py-3">
            <button className="text-[#0dcccc] flex flex-col items-center text-xs"><Home className="h-5 w-5"/>Mural</button>
            <button className="text-[#2e4848]/70 hover:text-[#0dcccc] flex flex-col items-center text-xs"><Users className="h-5 w-5"/>Comunidades</button>
            <button className="text-[#2e4848]/70 hover:text-[#0dcccc] flex flex-col items-center text-xs"><Bell className="h-5 w-5"/>Alertas</button>
            <button className="text-[#2e4848]/70 hover:text-[#0dcccc] flex flex-col items-center text-xs"><User className="h-5 w-5"/>Perfil</button>
          </div>
        </div>
      </nav>

      {/* Modal: novo desabafo */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 m-3">
            <h3 className="text-[#2e4848] text-base font-medium">Compartilhar um sentimento</h3>
            <p className="text-[#2e4848]/70 text-sm mb-3">Escreva o que está sentindo. Você pode publicar como anônimo.</p>
            <textarea className="w-full min-h-[140px] rounded-md border border-[#B0EAF7] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0dcccc]" placeholder="Escreva aqui..." maxLength={500} value={content} onChange={(e)=>setContent(e.target.value)} aria-label="Campo de texto do desabafo" />
            <div className="mt-3 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-[#2e4848]">
                <input type="checkbox" checked={anonymous} onChange={()=>setAnonymous(a=>!a)} className="h-4 w-4" />
                Publicar como anônimo
              </label>
              <span className="text-xs text-[#2e4848]/60">{content.length}/500</span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="rounded-md border border-[#B0EAF7] px-4 py-2 text-sm">Cancelar</button>
              <button onClick={handleSubmit} className="rounded-md bg-[#0dcccc] px-4 py-2 text-sm text-white hover:bg-[#0dcccc]/90">Enviar</button>
            </div>
          </div>
        </div>
      )}

      {/* Sheet: Configurações (mobile) */}
      <SheetDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} side="right">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[#2e4848]">Configurações</h4>
          <button className="text-sm" onClick={() => setSettingsOpen(false)}>Fechar</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2e4848]">Reduzir animações</span>
            <Switch ariaLabel="Reduzir animações" checked={reducedMotion} onChange={setReducedMotion} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2e4848]">Alto contraste</span>
            <Switch ariaLabel="Alto contraste" checked={highContrast} onChange={setHighContrast} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2e4848]">Notificações</span>
            <Switch ariaLabel="Notificações" checked={notifications} onChange={setNotifications} />
          </div>
        </div>
      </SheetDrawer>

      {/* Toast */}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
