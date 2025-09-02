// src/components/ThreadForm.tsx
import React, { useState } from 'react';
import { Thread, ThreadCategory } from '../types';

interface ThreadFormProps {
  onSubmit: (thread: Partial<Thread>) => void;
  onCancel: () => void;
  initialData?: Thread;
}

const ThreadForm: React.FC<ThreadFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState<ThreadCategory>(initialData?.category || 'THREAD');
  const [description, setDescription] = useState(initialData?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    
    setIsSubmitting(true);
    
    const threadData: Partial<Thread> = {
      title: title.trim(),
      category,
      description: description.trim(),
      creationDate: new Date().toISOString(),
      isLocked: false
    };
    
    if (category === 'QNA') {
      (threadData as any).isAnswered = false;
    }
    
    try {
      await onSubmit(threadData);
    } catch (error) {
      console.error('Error submitting thread:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="thread-form">
      <h2>{initialData ? 'Edit Thread' : 'Create New Thread'}</h2>
      
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
        />
      </div>
      
      <div className="form-group">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ThreadCategory)}
          required
        >
          <option value="THREAD">Discussion</option>
          <option value="QNA">Question & Answer</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
        />
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : (initialData ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default ThreadForm;