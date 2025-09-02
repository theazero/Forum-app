// src/services/storageService.ts
import { Thread, Comment, User } from '../features/forum/types';

const STORAGE_KEYS = {
  THREADS: 'forum_threads',
  COMMENTS: 'forum_comments',
  USERS: 'forum_users',
  CURRENT_USER: 'forum_current_user'
};

export const storageService = {
  // Threads
  getThreads: (): Thread[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.THREADS) || '[]');
  },
  
  saveThread: (thread: Thread): void => {
    const threads = storageService.getThreads();
    const existingIndex = threads.findIndex(t => t.id === thread.id);
    
    if (existingIndex >= 0) {
      threads[existingIndex] = thread;
    } else {
      threads.push(thread);
    }
    
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads));
  },
  
  deleteThread: (threadId: number): void => {
    const threads = storageService.getThreads();
    const filteredThreads = threads.filter(t => t.id !== threadId);
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(filteredThreads));
  },
  
  // Comments
  getComments: (): Comment[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '[]');
  },
  
  getCommentsByThreadId: (threadId: number): Comment[] => {
    const comments = storageService.getComments();
    return comments.filter(c => c.threadId === threadId);
  },
  
  saveComment: (comment: Comment): void => {
    const comments = storageService.getComments();
    const existingIndex = comments.findIndex(c => c.id === comment.id);
    
    if (existingIndex >= 0) {
      comments[existingIndex] = comment;
    } else {
      comments.push(comment);
    }
    
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  },
  
  deleteComment: (commentId: number): void => {
    const comments = storageService.getComments();
    const filteredComments = comments.filter(c => c.id !== commentId);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(filteredComments));
  },
  
  // Users
  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },
  
  saveUser: (user: User): void => {
    const users = storageService.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  
  // Initialize default data
  initializeDefaultData: (): void => {
    if (!localStorage.getItem(STORAGE_KEYS.THREADS)) {
      localStorage.setItem(STORAGE_KEYS.THREADS, '[]');
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, '[]');
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, '[]');
    }
  }
};