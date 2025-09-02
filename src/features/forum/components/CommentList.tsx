// src/features/forum/components/CommentList.tsx
import React from 'react';
import { Comment, User } from '../types';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments?: Comment[]; // kan vara undefined under loading
  currentUser: User;
  onMarkAsAnswer?: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments = [],       // defaulta till tom array
  currentUser,
  onMarkAsAnswer
}) => {
  if (!Array.isArray(comments)) {
    comments = []; // extra skydd om något konstigt skickas in
  }

  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onMarkAsAnswer={onMarkAsAnswer}
          />
        ))
      )}
    </div>
  );
};

export default CommentList;
