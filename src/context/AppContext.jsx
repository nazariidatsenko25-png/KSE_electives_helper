import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userProfile, setUserProfileState] = useState({
    avatarType: 'color',
    avatarColor: '#6B21A8',
    avatarEmoji: null,
    avatarImage: null,
    isPrivate: false,
    linkedIn: '',
    bio: '',
    lastSeen: new Date().toISOString(),
  });
  
  const [wallPosts, setWallPosts] = useState([]);

  const updateUserProfile = (updates) => {
    setUserProfileState(prev => ({ ...prev, ...updates }));
  };

  const addWallPost = (text, author, authorColor) => {
    const newPost = {
      id: Date.now().toString(),
      text,
      author,
      authorColor,
      timestamp: new Date().toISOString(),
    };
    setWallPosts(prev => [newPost, ...prev]);
  };

  const deleteWallPost = (id) => {
    setWallPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <AppContext.Provider value={{
      settingsOpen,
      setSettingsOpen,
      userProfile,
      updateUserProfile,
      wallPosts,
      addWallPost,
      deleteWallPost
    }}>
      {children}
    </AppContext.Provider>
  );
};
