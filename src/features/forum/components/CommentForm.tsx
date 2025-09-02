// src/components/CommentForm.tsx
import React, { useState } from 'react';
import { Comment } from '../types';

interface CommentFormProps {
  threadId: number;
  onSubmit: (comment: Partial<Comment>) => void;
  onCancel?: () => void;
  initialContent?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  threadId,
  onSubmit,
  onCancel,
  initialContent = ''
}) => {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    const commentData: Partial<Comment> = {
      threadId,
      content: content.trim(),
      creationDate: new Date().toISOString(),
      isAnswer: false
    };
    
    try {
      await onSubmit(commentData);
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          rows={4}
          required
        />
      </div>
      
      <div className="form-actions">
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="btn-cancel"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        
        <button 
          type="submit" 
          disabled={isSubmitting || !content.trim()}
          className="btn-submit"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;