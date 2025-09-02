// src/utils/permissions.ts
import { User, Thread, Comment } from 'src/features/forum/types';

export const canEditThread = (user: User | null, thread: Thread): boolean => {
  if (!user) return false;
  if (user.isModerator) return true;
  return user.id === thread.creator.id;
};

export const canEditComment = (user: User | null, comment: Comment): boolean => {
  if (!user) return false;
  if (user.isModerator) return true;
  return user.id === comment.creator.id;
};

export const canLockThread = (user: User | null): boolean => {
  return user?.isModerator || false;
};

export const canDeleteContent = (user: User | null): boolean => {
  return user?.isModerator || false;
};

export const canMarkAsAnswer = (user: User | null, thread: Thread): boolean => {
  if (!user) return false;
  if (user.isModerator) return true;
  return user.id === thread.creator.id;
};

export const canCreateContent = (user: User | null): boolean => {
  return user !== null;
};