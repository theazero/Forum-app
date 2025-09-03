import { createLocalStorage } from './storage';
import { Thread, Comment, User } from '../features/forum/types';

// Skapa localStorage-instanser för varje datatyp
export const threadStorage = createLocalStorage<Thread[]>('forumThreads');
export const commentStorage = createLocalStorage<Comment[]>('forumComments');
export const userStorage = createLocalStorage<User[]>('forumUsers');

// Hjälpfunktioner för att hämta och spara data
export const getThreads = (): Thread[] => {
  return threadStorage.get() || [];
};

export const saveThreads = (threads: Thread[]) => {
  threadStorage.set(threads);
};

export const getComments = (): Comment[] => {
  return commentStorage.get() || [];
};

export const saveComments = (comments: Comment[]) => {
  commentStorage.set(comments);
};

export const getUsers = (): User[] => {
  return userStorage.get() || [];
};

export const saveUsers = (users: User[]) => {
  userStorage.set(users);
};

// Hjälpfunktion för att hämta kommentarer för en specifik tråd
export const getCommentsForThread = (threadId: number): Comment[] => {
  const comments = getComments();
  return comments.filter(comment => comment.threadId === threadId);
};

// Hjälpfunktion för att hämta en användare med ID
export const getUserById = (userId: number): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === userId);
};