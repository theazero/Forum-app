// src/App.tsx
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { storageService } from './services/storageService';
import { Thread, Comment, User } from './types';
import ThreadList from '/components/ThreadList';
import ThreadDetail from './components/ThreadDetail';
import ThreadForm from './components/ThreadForm';
import { LoginForm, RegisterForm } from './components/AuthForms';
import './index.css';

// Initialize default data
storageService.initializeDefaultData();

const ForumApp: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail' | 'newThread' | 'login' | 'register'>('list');
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    loadThreads();
  }, []);

  useEffect(() => {
    if (selectedThread) {
      loadComments(selectedThread.id);
    }
  }, [selectedThread]);

  const loadThreads = () => {
    const loadedThreads = storageService.getThreads();
    setThreads(loadedThreads);
  };

  const loadComments = (threadId: number) => {
    const loadedComments = storageService.getCommentsByThreadId(threadId);
    setComments(loadedComments);
  };

  const handleThreadClick = (thread: Thread) => {
    setSelectedThread(thread);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedThread(null);
    setView('list');
  };

  const handleNewThread = () => {
    if (!user) {
      setView('login');
      return;
    }
    setView('newThread');
  };

  const handleAddThread = async (threadData: Partial<Thread>) => {
    const newThread: Thread = {
      ...threadData,
      id: Date.now(),
      creator: user!,
    } as Thread;

    storageService.saveThread(newThread);
    loadThreads();
    setView('list');
  };

  const handleUpdateThread = async (thread: Thread) => {
    storageService.saveThread(thread);
    loadThreads();
    
    if (selectedThread && selectedThread.id === thread.id) {
      setSelectedThread(thread);
    }
  };

  const handleAddComment = async (commentData: Partial<Comment>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now(),
      creator: user!,
    } as Comment;

    storageService.saveComment(newComment);
    
    if (selectedThread) {
      loadComments(selectedThread.id);
    }
  };

  const handleUpdateComment = async (comment: Comment) => {
    storageService.saveComment(comment);
    
    if (selectedThread) {
      loadComments(selectedThread.id);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'login':
        return (
          <div className="auth-container">
            <LoginForm />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setView('register')} className="link-button">
                Register here
              </button>
            </p>
          </div>
        );
      
      case 'register':
        return (
          <div className="auth-container">
            <RegisterForm />
            <p>
              Already have an account?{' '}
              <button onClick={() => setView('login')} className="link-button">
                Login here
              </button>
            </p>
          </div>
        );
      
      case 'newThread':
        return (
          <ThreadForm
            onSubmit={handleAddThread}
            onCancel={() => setView('list')}
          />
        );
      
      case 'detail':
        return selectedThread ? (
          <ThreadDetail
            thread={selectedThread}
            comments={comments}
            onUpdateThread={handleUpdateThread}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onBack={handleBackToList}
          />
        ) : null;
      
      default:
        return (
          <ThreadList
            threads={threads}
            onThreadClick={handleThreadClick}
            onNewThread={handleNewThread}
          />
        );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Forum App</h1>
        <div className="user-menu">
          {user ? (
            <>
              <span>Welcome, {user.userName}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setView('login')}>Login</button>
              <button onClick={() => setView('register')}>Register</button>
            </>
          )}
        </div>
      </header>
      
      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ForumApp />
    </AuthProvider>
  );
};

export default App;