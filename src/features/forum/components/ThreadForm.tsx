import { useState } from 'react'
import { z } from 'zod'
import { uid } from '../../../lib/uid'
import { useForum } from '../state/ForumProvider'
import type { ThreadCategory } from '../types'

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.union([z.literal('THREAD'), z.literal('QNA')])
})
type FormData = z.infer<typeof schema>

export default function ThreadForm({ onCreated }: { onCreated?: (id: number) => void }) {
  const { state, addThread } = useForum()
  const [form, setForm] = useState<FormData>({ title: '', description: '', category: 'THREAD' })
  const [err, setErr] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = schema.safeParse(form)
    if (!parsed.success) { setErr('Kontrollera fälten.'); return }
    const id = uid()
    addThread({
      id,
      title: form.title,
      description: form.description,
      category: form.category as ThreadCategory,
      creationDate: new Date().toISOString(),
      creatorId: state.currentUserId ?? state.users[0].id
    })
    onCreated?.(id)
  }

  return (
    <form onSubmit={submit} className="bg-white border border-line rounded-xl p-6 md:p-8 max-w-2xl space-y-6">
      {err && <p className="text-red-600">{err}</p>}
      <div>
        <label className="block text-sm mb-2">Title</label>
        <input value={form.title} onChange={e=>setForm(f=>({...f, title: e.target.value}))}
               className="w-full border border-line rounded-lg px-4 py-3 bg-white" />
      </div>
      <div>
        <label className="block text-sm mb-2">Category</label>
        <select value={form.category} onChange={e=>setForm(f=>({...f, category: e.target.value as FormData['category']}))} className="w-full border border-line rounded-lg px-4 py-3 bg-white">
          <option value="THREAD">THREAD</option>
          <option value="QNA">QNA</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-2">Description</label>
        <textarea rows={8} value={form.description} onChange={e=>setForm(f=>({...f, description: e.target.value}))}
                  className="w-full border border-line rounded-lg px-4 py-3 bg-white" />
      </div>
      <button className="btn btn-primary" type="submit">Create Thread</button>
    </form>
  )
}
