import { User, Thread, QNAThread, Comment } from "@/features/forum/types";

const isQNA = (t: Thread | QNAThread): t is QNAThread => t.category === "QNA";


export const canModerate = (user: User | null): boolean => !!user?.isModerator;


export const canEditThread = (user: User | null, thread: Thread | QNAThread): boolean => {
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
  return !!user?.isModerator;
};


export const canDeleteThread = (user: User | null, thread: Thread | QNAThread): boolean => {
  if (!user) return false;
  if (user.isModerator) return true;
  return user.id === thread.creator.id;
};

export const canDeleteComment = (user: User | null, comment: Comment): boolean => {
  if (!user) return false;
  if (user.isModerator) return true;
  return user.id === comment.creator.id;
};


export const canMarkAsAnswer = (user: User | null, thread: Thread | QNAThread): boolean => {
  if (!user) return false;
  if (!isQNA(thread)) return false;
  return user.id === thread.creator.id;
};

export const canCreateContent = (user: User | null): boolean => {
  return user !== null;
};
