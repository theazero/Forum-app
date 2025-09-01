import { useNavigate } from 'react-router-dom'
import ThreadForm from '../features/forum/components/ThreadForm'

export default function NewThreadPage() {
  const nav = useNavigate()
  return (
    <section className="space-y-6">
      <h1 className="h-title">Create New Thread</h1>
      <ThreadForm onCreated={(id)=> nav(`/thread/${id}`)} />
    </section>
  )
}
