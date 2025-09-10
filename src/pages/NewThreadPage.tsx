import { useNavigate } from 'react-router-dom'
import ThreadForm from '../features/forum/components/ThreadForm'
import { Thread } from '../features/forum/types'
import { useAuth } from '../contexts/AuthContext'
import { getThreads, saveThreads, getUsers } from '../lib/forumStorage'

export default function NewThreadPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = async (threadData: Partial<Thread>) => {
    if (!user) {
      alert('You must be logged in to create a thread')
      return
    }

    try {
      const existingThreads = getThreads()
      const users = getUsers()
    
      const currentUser = users.find(u => u.id === user.id) || user

      const newThread: Thread = {
        id: Date.now(),
        title: threadData.title || '',
        category: threadData.category || 'THREAD',
        creationDate: new Date().toISOString(),
        description: threadData.description || '',
        creator: currentUser,
        isLocked: false,
        ...(threadData.category === 'QNA' && { 
          isAnswered: false 
        })
      }

      const updatedThreads = [newThread, ...existingThreads]
      saveThreads(updatedThreads)

      navigate(`/thread/${newThread.id}`)
    } catch (error) {
      console.error('Error creating thread:', error)
      alert('Failed to create thread')
    }
  }

  const handleCancel = () => {
    navigate(-1) // gör så man kan gå tillbaka till föregående sida
  }

  return (
    <section className="space-y-6">
      <h1 className="h-title">Create New Thread</h1>
      <ThreadForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </section>
  )
}