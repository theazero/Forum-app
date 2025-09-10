import React, { useState } from "react";
import { Comment, User, QNAThread } from "../types";
import { canMarkAsAnswer } from "src/services/utils/permissions";
import { hasProfanity, censor } from "src/services/utils/profanity";

interface CommentItemProps {
  comment: Comment;
  currentUser: User;
  parentThread?: QNAThread;
  onMarkAsAnswer?: (commentId: number) => void;
  onReply?: (parentId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUser,
  parentThread,
  onMarkAsAnswer,
  onReply,
}) => {
  const allowMark =
    parentThread &&
    canMarkAsAnswer(currentUser, parentThread) &&
    !comment.isAnswer;

  const profane = hasProfanity(comment.content);
  const [showRaw, setShowRaw] = useState(false);

  const displayText = profane && !showRaw ? censor(comment.content) : comment.content;

  return (
    <div className={`comment-item ${comment.isAnswer ? "answer" : ""}`}>
      <div className="comment-header">
        <span className="comment-author">{comment.creator.userName}</span>
        <span className="comment-date">
          {new Date(comment.creationDate).toLocaleDateString()}
        </span>
      </div>

      <div className="comment-content">
        {profane && (
          <div className="error-message" style={{ marginBottom: 8 }}>
            This comment contains flagged language.
            <button
              className="link-button"
              style={{ marginLeft: 8 }}
              onClick={() => setShowRaw((v) => !v)}
            >
              {showRaw ? "Hide censored view" : "Show anyway"}
            </button>
          </div>
        )}
        <p>{displayText}</p>
      </div>

      <div className="comment-actions">
        {onReply && (
          <button className="btn" onClick={() => onReply(comment.id)}>
            Reply
          </button>
        )}
        {allowMark && onMarkAsAnswer && (
          <button onClick={() => onMarkAsAnswer(comment.id)} className="btn-mark-answer">
            Mark as Answer
          </button>
        )}
        {comment.isAnswer && <span className="answer-badge">✓ Answered</span>}
      </div>
    </div>
  );
};

export default CommentItem;
