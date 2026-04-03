};

        avatarColor: '#6B21A8',
        bio: '',
        linkedIn: '',
        isPrivate: false,
        lastSeen: new Date().toISOString(),
      };
  });

  const [wallPosts, setWallPosts] = useState(() => {
    try {
  });


  const updateUserProfile = useCallback((updates) => {
    setUserProfile(prev => {
      const next = { ...prev, ...updates };
      return next;
    });
  }, []);

    setWallPosts(prev => {
      const next = [
        ...prev,
      ];
      return next;
    });
  }, []);

    setWallPosts(prev => {
      return next;
    });
  }, []);

}

export function useApp() {
  const ctx = useContext(AppContext);
  return ctx;
}

export default AppContext;
