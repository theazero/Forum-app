import React, { useState } from "react";
import { Thread, QNAThread, Comment } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

interface ThreadDetailProps {
  thread: Thread | QNAThread | null;
  comments: Comment[];
  onUpdateThread: (thread: Thread | QNAThread) => void;
  onAddComment: (comment: Partial<Comment>) => void;
  onUpdateComment: (comment: Comment) => void;
  onBack: () => void;
}

const isQNA = (t: Thread | QNAThread): t is QNAThread => t.category === "QNA";

const ThreadDetail: React.FC<ThreadDetailProps> = ({
  thread,
  comments,
  onUpdateThread,
  onAddComment,
  onUpdateComment,
  onBack,
}) => {
  const { user } = useAuth();
  const [isReplying, setIsReplying] = useState(false);
  const [replyTo, setReplyTo] = useState<number | undefined>(undefined);

  if (!thread) {
    return (
      <div className="thread-detail">
        <button onClick={onBack} className="btn-back">← Back to thread list</button>
        <div>Thread not found or loading...</div>
      </div>
    );
  }

  // Alla inloggade får låsa/öppna
  const handleLockToggle = () => {
    onUpdateThread({ ...thread, isLocked: !thread.isLocked });
  };

  const handleMarkAsAnswer = (commentId: number) => {
    if (isQNA(thread) && user?.id === thread.creator.id) {
      onUpdateThread({ ...thread, isAnswered: true, commentAnswerId: commentId });

      const comment = comments.find((c) => c.id === commentId);
      if (comment) onUpdateComment({ ...comment, isAnswer: true });
    }
  };

  const startReply = (parentId: number) => {
    setReplyTo(parentId);
    setIsReplying(true);
  };

  return (
    <div className="thread-detail">
      <button onClick={onBack} className="btn-back">Back to thread list</button>

      <div className="thread-header">
        <h1>{thread.title}</h1>

        {user && (
          <div className="thread-actions">
            <button onClick={handleLockToggle} className="btn-lock">
              {thread.isLocked ? "Unlock" : "Lock"} Thread
            </button>
          </div>
        )}
      </div>

      <div className="thread-meta">
        <span>Created by {thread.creator?.userName ?? "Unknown user"}</span>
        <span>{new Date(thread.creationDate).toLocaleDateString()}</span>
        {thread.isLocked && <span className="thread-locked">Locked</span>}
        {isQNA(thread) && thread.isAnswered && <span className="answer-badge">Answered</span>}
      </div>

      <div className="thread-content">
        <p>{thread.description}</p>
      </div>

      {!thread.isLocked ? (
        <div className="comment-section">
          <h2>Comments ({comments.length})</h2>

          {user ? (
            <>
              {!isReplying && (
                <button
                  onClick={() => { setReplyTo(undefined); setIsReplying(true); }}
                  className="btn-reply"
                >
                  Add Comment
                </button>
              )}

              {isReplying && (
                <div style={{ marginBottom: 16 }}>
                  {replyTo && (
                    <div className="badge" style={{ marginBottom: 8 }}>
                      Replying to comment #{replyTo}
                    </div>
                  )}
                  <CommentForm
                    threadId={thread.id}
                    parentId={replyTo}
                    onSubmit={(commentData) => {
                      onAddComment(commentData);
                      setIsReplying(false);
                      setReplyTo(undefined);
                    }}
                    onCancel={() => { setIsReplying(false); setReplyTo(undefined); }}
                  />
                </div>
              )}

              <CommentList
                comments={comments}
                currentUser={user}
                parentThread={isQNA(thread) ? thread : undefined}
                onMarkAsAnswer={isQNA(thread) ? handleMarkAsAnswer : undefined}
                onReply={startReply}
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
