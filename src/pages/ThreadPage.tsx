import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { storageService } from "@/services/storageService";
import { useAuth } from "@/contexts/AuthContext";
import { Thread, QNAThread, Comment } from "@/features/forum/types"; 

import ThreadDetail from "@/features/forum/components/ThreadDetail";
import CommentList from "@/features/forum/components/CommentList";
import CommentForm from "@/features/forum/components/CommentForm";

const isQNA = (t: Thread | QNAThread): t is QNAThread => t.category === "QNA";

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const threadId = Number(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [thread, setThread] = useState<Thread | QNAThread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const all = storageService.getThreads() as (Thread | QNAThread)[];
    const t = all.find((x) => x.id === threadId) ?? null;
    setThread(t);
    setComments(storageService.getCommentsByThreadId(threadId));
  }, [threadId]);

  if (!thread) {
    return (
      <div className="app-main">
        <p>Thread not found.</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  const onUpdateThread = (updated: Thread | QNAThread) => {
    storageService.saveThread(updated);
    setThread(updated);
  };

  const onAddComment = (partial: Partial<Comment>) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const newComment: Comment = {
      id: Date.now(),
      threadId,
      content: (partial.content ?? "").toString(),
      creator: user,
      creationDate: new Date().toISOString(),
      isAnswer: Boolean(partial.isAnswer),
    };
    storageService.saveComment(newComment);
    setComments(storageService.getCommentsByThreadId(threadId));
  };

  const onUpdateComment = (c: Comment) => {
    storageService.saveComment(c);
    setComments(storageService.getCommentsByThreadId(threadId));
  };

  return (
    <section className="section container">
      <ThreadDetail
        thread={thread}
        comments={comments}
        onUpdateThread={onUpdateThread}
        onAddComment={onAddComment}
        onUpdateComment={onUpdateComment}
        onBack={() => navigate("/")}
      />

      <div className="panel panel-pad" style={{ marginTop: 16 }}>
        <div className="panel-head">
          <h2>Replies ({comments.length})</h2>
          {!thread.isLocked && (
            <button
              className="btn"
              onClick={() =>
                onUpdateThread({
                  ...thread,
                  isLocked: true, 
                })
              }
            >
              Lock Thread
            </button>
          )}
        </div>

        <CommentList
          comments={comments}
          currentUser={user ?? { id: 0, userName: "Guest", password: "", isModerator: false, joinDate: "" }}
          onMarkAsAnswer={
            isQNA(thread)
              ? (commentId: number) => {
                  onUpdateThread({ ...thread, isAnswered: true, commentAnswerId: commentId });
                  const found = comments.find((c) => c.id === commentId);
                  if (found) onUpdateComment({ ...found, isAnswer: true });
                }
              : undefined
          }
        />

        {!thread.isLocked && user && (
          <div style={{ marginTop: 16 }}>
            <CommentForm
              threadId={thread.id}
              onSubmit={(data) => onAddComment(data)}
              onCancel={() => {}}
            />
          </div>
        )}
        {!user && <p style={{ marginTop: 12 }}>Please log in to comment</p>}
        {thread.isLocked && <p className="thread-locked">Locked</p>}
      </div>
    </section>
  );
}
