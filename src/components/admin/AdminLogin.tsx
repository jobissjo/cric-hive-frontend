import { useState } from 'react'

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('admin@crichive.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email === 'admin@crichive.com' && password === 'admin123') {
      window.localStorage.setItem('crichive_admin_auth', 'true')
      onLogin()
      return
    }
    setError('Invalid admin credentials. Use the demo password shown below.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090d12] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101720] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8"
        style={{ width: 'min(92vw, 460px)' }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon-green/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-electric-blue/10 blur-2xl" />

        <div className="relative mb-6">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-neon-green/25 bg-neon-green/10">
            <span className="material-symbols-outlined text-3xl text-neon-green">admin_panel_settings</span>
          </div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-neon-green">Separate Admin Login</p>
          <h1 className="mt-2 font-display text-3xl font-black text-primary">Admin Access</h1>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">Use admin-only credentials to manage cricket operations data.</p>
        </div>

        <div className="relative space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase text-on-surface-variant">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full rounded-2xl border border-white/10 bg-[#05070a] px-4 py-3 text-sm text-primary outline-none focus:border-neon-green"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase text-on-surface-variant">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full rounded-2xl border border-white/10 bg-[#05070a] px-4 py-3 text-sm text-primary outline-none focus:border-neon-green"
              placeholder="admin123"
            />
          </label>
        </div>

        {error && <p className="relative mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200">{error}</p>}

        <button className="relative mt-6 block w-full rounded-2xl bg-neon-green px-5 py-3 font-black text-black hover:shadow-[0_0_18px_rgba(204,255,0,0.35)]">
          Login to Admin
        </button>
        <p className="relative mt-4 text-center text-xs text-on-surface-variant">Demo: admin@crichive.com / admin123</p>
      </form>
    </div>
  )
}
