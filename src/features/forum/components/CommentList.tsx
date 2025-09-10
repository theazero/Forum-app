import React from "react";
import { Comment, User, QNAThread } from "../types";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments?: Comment[];
  currentUser: User;
  parentThread?: QNAThread;
  onMarkAsAnswer?: (commentId: number) => void;
  onReply?: (parentId: number) => void;
}

type CommentNode = Comment & { children: CommentNode[] };

function buildTree(list: Comment[]): CommentNode[] {
  const map = new Map<number, CommentNode>();
  const roots: CommentNode[] = [];

  list.forEach((c) => map.set(c.id, { ...c, children: [] }));
  list.forEach((c) => {
    const node = map.get(c.id)!;
    if (c.parentId) {
      const parent = map.get(c.parentId);
      if (parent) parent.children.push(node);
      else roots.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

const CommentBranch: React.FC<{
  nodes: CommentNode[];
  currentUser: User;
  parentThread?: QNAThread;
  onMarkAsAnswer?: (commentId: number) => void;
  onReply?: (parentId: number) => void;
}> = ({ nodes, currentUser, parentThread, onMarkAsAnswer, onReply }) => {
  return (
    <>
      {nodes.map((n) => (
        <div key={n.id} style={{ marginLeft: n.parentId ? 24 : 0 }}>
          <CommentItem
            comment={n}
            currentUser={currentUser}
            parentThread={parentThread}
            onMarkAsAnswer={onMarkAsAnswer}
            onReply={onReply}
          />
          {n.children.length > 0 && (
            <CommentBranch
              nodes={n.children}
              currentUser={currentUser}
              parentThread={parentThread}
              onMarkAsAnswer={onMarkAsAnswer}
              onReply={onReply}
            />
          )}
        </div>
      ))}
    </>
  );
};

const CommentList: React.FC<CommentListProps> = ({
  comments = [],
  currentUser,
  parentThread,
  onMarkAsAnswer,
  onReply,
}) => {
  const list: Comment[] = Array.isArray(comments) ? comments : [];
  const tree = buildTree(list);

  return (
    <div className="comment-list">
      {tree.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <CommentBranch
          nodes={tree}
          currentUser={currentUser}
          parentThread={parentThread}
          onMarkAsAnswer={onMarkAsAnswer}
          onReply={onReply}
        />
      )}
    </div>
  );
};

export default CommentList;
