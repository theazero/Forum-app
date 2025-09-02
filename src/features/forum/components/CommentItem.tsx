// src/components/CommentItem.tsx
import React from 'react';
import { Comment, User } from '../types';

interface CommentItemProps {
  comment: Comment;
  currentUser: User;
  onMarkAsAnswer?: (commentId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ 
  comment, 
  currentUser, 
  onMarkAsAnswer 
}) => {
  const canMarkAsAnswer = onMarkAsAnswer && 
                          currentUser.id === comment.creator.id;

  return (
    <div className={`comment-item ${comment.isAnswer ? 'answer' : ''}`}>
      <div className="comment-header">
        <span className="comment-author">{comment.creator.userName}</span>
        <span className="comment-date">
          {new Date(comment.creationDate).toLocaleDateString()}
        </span>
      </div>
      
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>
      
      <div className="comment-actions">
        {canMarkAsAnswer && !comment.isAnswer && (
          <button 
            onClick={() => onMarkAsAnswer(comment.id)}
            className="btn-mark-answer"
          >
            Mark as Answer
          </button>
        )}
        
        {comment.isAnswer && (
          <span className="answer-badge">✓ Answered</span>
        )}
      </div>
    </div>
  );
};

export default CommentItem;