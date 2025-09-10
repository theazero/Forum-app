// src/app/App.tsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
import Header from "src/app/layout/Header"; 


import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { storageService } from "@/services/storageService";
import { Thread, Comment } from "@/features/forum/types"; 

import ThreadList from "@/features/forum/components/ThreadList";
import ThreadDetail from "@/features/forum/components/ThreadDetail";
import ThreadForm from "@/features/forum/components/ThreadForm";
import { LoginForm, RegisterForm } from "@/features/forum/components/AuthForms";

import "./index.css";

storageService.initializeDefaultData();


function HomePage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setThreads(storageService.getThreads());
  }, []);

  const onThreadClick = (thread: Thread) => navigate(`/thread/${thread.id}`);
  const onNewThread = () => (user ? navigate("/new") : navigate("/login"));

  return (
    <ThreadList
      threads={threads}
      onThreadClick={onThreadClick}
      onNewThread={onNewThread}
    />
  );
}

function NewThreadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddThread = (data: Partial<Thread>) => {
    if (!user) return navigate("/login");
    const newThread: Thread = {
      ...(data as Thread),
      id: Date.now(),
      creator: user,
    };
    storageService.saveThread(newThread);
    navigate("/");
  };

  return (
    <ThreadForm
      onSubmit={handleAddThread}
      onCancel={() => navigate("/")}
    />
  );
}

function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const threadId = Number(id);
  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = storageService.getThreads().find(x => x.id === threadId) || null;
    setThread(t);
    setComments(storageService.getCommentsByThreadId(threadId));
  }, [threadId]);

  const onUpdateThread = (t: Thread) => {
    storageService.saveThread(t);
    setThread(t);
  };

  const onAddComment = (partial: Partial<Comment>) => {
    if (!user) return navigate("/login");
    const newComment: Comment = {
      ...(partial as Comment),
      id: Date.now(),
      creator: user,
      creationDate: new Date().toISOString(),
      isAnswer: false,
      threadId,
    };
    storageService.saveComment(newComment);
    setComments(storageService.getCommentsByThreadId(threadId));
  };

  const onUpdateComment = (c: Comment) => {
    storageService.saveComment(c);
    setComments(storageService.getCommentsByThreadId(threadId));
  };

  if (!thread) {
    return (
      <div className="app-main">
        <p>Thread not found.</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <ThreadDetail
      thread={thread}
      comments={comments}
      onUpdateThread={onUpdateThread}
      onAddComment={onAddComment}
      onUpdateComment={onUpdateComment}
      onBack={() => navigate("/")}
    />
  );
}

function LoginPage() {
  return (
    <div className="auth-container">
      <LoginForm />
      <p>
        Don&apos;t have an account?{" "}
        <Link to="/register" className="link-button">Register here</Link>
      </p>
    </div>
  );
}

function RegisterPage() {
  return (
    <div className="auth-container">
      <RegisterForm />
      <p>
        Already have an account?{" "}
        <Link to="/login" className="link-button">Login here</Link>
      </p>
    </div>
  );
}

function Shell() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewThreadPage />} />
          <Route path="/thread/:id" element={<ThreadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

const App: React.FC = () => (
  <AuthProvider>
    <Shell />
  </AuthProvider>
);

export default App;
