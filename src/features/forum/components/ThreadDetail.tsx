import React, { useState } from 'react';
import { Thread, Comment } from '../types';
import { useAuth } from '../../../contexts/AuthContext';
import { canLockThread } from '../../../services/utils/permissions';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface ThreadDetailProps {
  thread: Thread | null;
  comments: Comment[];
  onUpdateThread: (thread: Thread) => void;
  onAddComment: (comment: Partial<Comment>) => void;
  onUpdateComment: (comment: Comment) => void;
  onBack: () => void;
}

const ThreadDetail: React.FC<ThreadDetailProps> = ({
  thread,
  comments,
  onUpdateThread,
  onAddComment,
  onUpdateComment,
  onBack
}) => {
  const { user } = useAuth();
  const [isReplying, setIsReplying] = useState(false);

  // Handle case where thread is null/undefined
  if (!thread) {
    return (
      <div className="thread-detail">
        <button onClick={onBack} className="btn-back">
          ← Back to thread list
        </button>
        <div>Thread not found or loading...</div>
      </div>
    );
  }

  const handleLockToggle = () => {
    if (canLockThread(user)) {
      onUpdateThread({
        ...thread,
        isLocked: !thread.isLocked
      });
    }
  };

  const handleMarkAsAnswer = (commentId: number) => {
    if (thread.category === 'QNA' && user?.id === thread.creator.id) {
      const qnaThread = thread as any;
      onUpdateThread({
        ...thread,
        isAnswered: true,
        commentAnswerId: commentId
      });
      
      // Also update the comment
      const comment = comments.find(c => c.id === commentId);
      if (comment) {
        onUpdateComment({
          ...comment,
          isAnswer: true
        });
      }
    }
  };

  return (
    <div className="thread-detail">
      <button onClick={onBack} className="btn-back">
        Back to thread list
      </button>
      
      <div className="thread-header">
        <h1>{thread.title}</h1>
        
        {canLockThread(user) && (
          <div className="thread-actions">
            <button onClick={handleLockToggle} className="btn-lock">
              {thread.isLocked ? 'Unlock' : 'Lock'} Thread
            </button>
          </div>
        )}
      </div>
      
      <div className="thread-meta">
        <span>Created by {thread.creator?.userName || 'Unknown user'}</span>
        <span>{new Date(thread.creationDate).toLocaleDateString()}</span>
        {thread.isLocked && <span className="thread-locked">Locked</span>}
      </div>
      
      <div className="thread-content">
        <p>{thread.description}</p>
      </div>
      
      {!thread.isLocked ? (
        <div className="comment-section">
          <h2>Comments ({(comments || []).length})</h2>
          
          {user ? (
            <>
              {!isReplying && (
                <button 
                  onClick={() => setIsReplying(true)}
                  className="btn-reply"
                >
                  Add Comment
                </button>
              )}
              
              {isReplying && (
                <CommentForm
                  threadId={thread.id}
                  onSubmit={(commentData) => {
                    onAddComment(commentData);
                    setIsReplying(false);
                  }}
                  onCancel={() => setIsReplying(false)}
                />
              )}
              
              <CommentList
                comments={comments}
                currentUser={user}
                onMarkAsAnswer={thread.category === 'QNA' ? handleMarkAsAnswer : undefined}
              />
            </>
          ) : (
            <p>Please log in to comment</p>
          )}
        </div>
      ) : (
        <div className="thread-locked-message">
          <p>This thread is locked. You cannot add new comments.</p>
        </div>
      )}
    </div>
  );
};

export default ThreadDetail;