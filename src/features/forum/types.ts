export type ThreadCategory = "THREAD" | "QNA";

export type User = {
  id: number;
  userName: string;
  password: string;
  isModerator: boolean;
  joinDate: string;
};

export type Thread = {
  id: number;
  title: string;
  category: ThreadCategory;
  creationDate: string;
  description: string;
  creator: User;
  isLocked: boolean;
};

export type QNAThread = Thread & {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: number;
};

export type Comment = {
  id: number;
  threadId: number;
  parentId?: number;
  content: string;
  creator: User;
  creationDate: string;
  isAnswer: boolean;
};

export type AuthContextType = {
  user: User | null;
  login: (userName: string, password: string) => Promise<boolean>;
  register: (userName: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};
