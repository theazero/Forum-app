import { useState } from 'react'
import { useForum } from '../features/forum/state/ForumProvider'

export default function SignInPage() {
  const { state, signIn } = useForum()
  const [name, setName] = useState('guest')
  function submit(e: React.FormEvent) {
    e.preventDefault()
    const user = state.users.find(u => u.userName === name)
    if (user) signIn(user.id)
  }
  return (
    <section className="space-y-6 max-w-md">
      <h1 className="h-title">Sign In</h1>
      <form onSubmit={submit} className="bg-white border border-line rounded-xl p-6 space-y-4">
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full border border-line rounded-lg px-4 py-3 bg-white" />
        <button className="btn btn-primary" type="submit">Sign In</button>
      </form>
      <p className="text-sm text-muted">Demo users: <code>guest</code>, <code>mod</code></p>
    </section>
  )
}
