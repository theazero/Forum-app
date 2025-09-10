import React from "react";
import { Thread, QNAThread, ThreadCategory } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import { storageService } from "@/services/storageService";

interface ThreadListProps {
  threads: (Thread | QNAThread)[];
  onThreadClick: (thread: Thread | QNAThread) => void;
  onNewThread: () => void;
}

const isQNA = (t: Thread | QNAThread): t is QNAThread => t.category === "QNA";

const getCategoryLabel = (category: ThreadCategory) => {
  switch (category) {
    case "THREAD": return "Discussion";
    case "QNA": return "Q&A";
  }
};

const ThreadList: React.FC<ThreadListProps> = ({ threads, onThreadClick, onNewThread }) => {
  const { user } = useAuth();

  const replyCount = (threadId: number) =>
    storageService.getCommentsByThreadId(threadId).length;

  return (
    <div className="thread-list-container">
      <div className="thread-list-header">
        <h2>Forum Threads</h2>
        {user && <button onClick={onNewThread} className="btn-new-thread">New Thread</button>}
      </div>

      <div className="thread-list">
        <div className="thread-header">
          <div>Thread</div>
          <div>Author</div>
          <div>Replies</div>
          <div>Last Post</div>
        </div>

        {threads.length === 0 ? (
          <div className="no-threads">No threads found</div>
        ) : (
          threads.map((thread) => (
            <div key={thread.id} className="thread-row" onClick={() => onThreadClick(thread)}>
              <div className="thread-info">
                <div className="thread-title">
                  {thread.title}
                  {thread.isLocked && <span className="badge locked">Locked</span>}
                  {isQNA(thread) && thread.isAnswered && <span className="badge answered">Answered</span>}
                </div>
                <div className="thread-excerpt">{thread.description}</div>
                <div className="thread-meta">
                  <span className="category">{getCategoryLabel(thread.category)}</span>
                </div>
              </div>

              <div className="thread-author">{thread.creator.userName}</div>
              <div className="thread-stats">{replyCount(thread.id)}</div>
              <div className="thread-last-post">
                {new Date(thread.creationDate).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ThreadList;
