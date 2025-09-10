import { Thread, Comment } from "../features/forum/types";

const STORAGE_KEYS = {
  THREADS: "forum_threads",
  COMMENTS: "forum_comments",
};

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function safeWrite<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storageService = {
  getThreads(): Thread[] {
    return safeRead<Thread[]>(STORAGE_KEYS.THREADS, []);
  },

  saveThread(thread: Thread): void {
    const threads = this.getThreads();
    const idx = threads.findIndex((t) => t.id === thread.id);
    if (idx >= 0) threads[idx] = thread;
    else threads.push(thread);
    safeWrite(STORAGE_KEYS.THREADS, threads);
  },

  deleteThread(threadId: number): void {
    const threads = this.getThreads().filter((t) => t.id !== threadId);
    safeWrite(STORAGE_KEYS.THREADS, threads);
  },

  getComments(): Comment[] {
    return safeRead<Comment[]>(STORAGE_KEYS.COMMENTS, []);
  },

  getCommentsByThreadId(threadId: number): Comment[] {
    return this.getComments().filter((c) => c.threadId === threadId);
  },

  saveComment(comment: Comment): void {
    const comments = this.getComments();
    const idx = comments.findIndex((c) => c.id === comment.id);
    if (idx >= 0) comments[idx] = comment;
    else comments.push(comment);
    safeWrite(STORAGE_KEYS.COMMENTS, comments);
  },

  deleteComment(commentId: number): void {
    const comments = this.getComments().filter((c) => c.id !== commentId);
    safeWrite(STORAGE_KEYS.COMMENTS, comments);
  },

  initializeDefaultData(): void {
    if (!localStorage.getItem(STORAGE_KEYS.THREADS)) {
      safeWrite(STORAGE_KEYS.THREADS, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
      safeWrite(STORAGE_KEYS.COMMENTS, []);
    }
  },
};
