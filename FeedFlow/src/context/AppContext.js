import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const INITIAL_BOOSTED = [
  { id: '1', name: 'Technology', weight: 80, enabled: true },
  { id: '2', name: 'Artificial Intelligence', weight: 90, enabled: true },
  { id: '3', name: 'Startups', weight: 70, enabled: true },
  { id: '4', name: 'Business', weight: 60, enabled: false },
  { id: '5', name: 'Finance', weight: 50, enabled: false },
  { id: '6', name: 'Fitness', weight: 75, enabled: true },
  { id: '7', name: 'Health', weight: 65, enabled: false },
  { id: '8', name: 'Education', weight: 60, enabled: false },
  { id: '9', name: 'Travel', weight: 55, enabled: false },
  { id: '10', name: 'Gaming', weight: 40, enabled: false },
];

const INITIAL_MUTED = [
  { id: 'm1', name: 'Gossip / Drama', weight: 85, enabled: true },
  { id: 'm2', name: 'Politics', weight: 60, enabled: true },
  { id: 'm3', name: 'Clickbait', weight: 90, enabled: true },
  { id: 'm4', name: 'Pranks / Memes', weight: 40, enabled: false },
  { id: 'm5', name: 'Shopping Ads', weight: 75, enabled: true },
  { id: 'm6', name: 'Fashion / Hauls', weight: 30, enabled: false },
];

const MOCK_CREATORS = {
  'Technology': ['@tech_crunch', '@wired', '@verge', '@mkbhd', '@engadget'],
  'Artificial Intelligence': ['@openai', '@deepmind', '@lexfridman', '@ai_weekly', '@nvidia'],
  'Startups': ['@ycombinator', '@founders_fund', '@techstars', '@startup_hub', '@seqouia'],
  'Business': ['@forbes', '@bloomberg', '@harvard_biz', '@wsj', '@entrepreneur'],
  'Finance': ['@investopedia', '@goldmansachs', '@wallstreet_bets', '@marketwatch', '@cnbc'],
  'Fitness': ['@gymshark', '@athleanx', '@fit_motivation', '@bodybuilding_com', '@crossfit'],
  'Health': ['@hubermanlab', '@healthline', '@mayoclinic', '@nutrition_facts', '@who'],
  'Education': ['@ted', '@coursera', '@khanacademy', '@duolingo', '@crashcourse'],
  'Travel': ['@natgeo', '@lonelyplanet', '@beautifuldestinations', '@travel_channel', '@cntraveler'],
  'Gaming': ['@ign', '@gamespot', '@playstation', '@xbox', '@twitch'],
};

const MOCK_MUTE_CREATORS = {
  'Gossip / Drama': ['@drama_alert', '@celeb_tea', '@gossip_cop', '@hollywood_unlocked'],
  'Politics': ['@daily_pol', '@pol_pulse', '@freedom_wire', '@global_debate'],
  'Clickbait': ['@shocking_reveal', '@must_watch_now', '@loop_viral', '@ten_facts_you_didnt_know'],
  'Pranks / Memes': ['@prankster_king', '@funny_fails', '@meme_lord', '@lol_videos'],
  'Shopping Ads': ['@deal_hunter', '@gadget_shop', '@cheap_buys', '@dropship_finds'],
  'Fashion / Hauls': ['@fast_fashion_haul', '@shein_finds', '@outfit_deals', '@clothespreview'],
};

const MOCK_ACTIONS = [
  'Liked post',
  'Watched video (full duration)',
  'Saved post to collection',
  'Shared post with connection',
  'Explored hashtag feed',
];

const INITIAL_SIMULATED_POSTS = [
  {
    id: 'post_1',
    username: '@lexfridman',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
    caption: 'Had a fascinating conversation with Demis Hassabis about Artificial General Intelligence (AGI), neural networks, and the future of science. Deep learning is just beginning.',
    tags: ['Artificial Intelligence', 'Technology'],
    likes: 4210,
    liked: false,
    saved: false,
    skipped: false,
  },
  {
    id: 'post_2',
    username: '@drama_alert',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=600&auto=format&fit=crop',
    caption: 'BREAKING: Star influencer couple unfollows each other amid rumor storm! Fans are losing their minds! Comment your theories below 😱👇',
    tags: ['Gossip / Drama'],
    likes: 1245,
    liked: false,
    saved: false,
    skipped: false,
  },
  {
    id: 'post_3',
    username: '@gymshark',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    caption: 'Consistency beats intensity. Set your goals, track your progress, and get to work. No shortcuts. #fitness #health',
    tags: ['Fitness', 'Health'],
    likes: 8320,
    liked: false,
    saved: false,
    skipped: false,
  },
  {
    id: 'post_4',
    username: '@shocking_reveal',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
    caption: 'Banks HATE this one simple trick! Click the link in bio to learn how this teenager retired at age 14 with zero work! 💸🔥',
    tags: ['Clickbait', 'Shopping Ads'],
    likes: 304,
    liked: false,
    saved: false,
    skipped: false,
  },
  {
    id: 'post_5',
    username: '@ycombinator',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    caption: 'Make something people want. Focus on talking to users and building a MVP. Applications for the next batch are now open.',
    tags: ['Startups', 'Business'],
    likes: 3105,
    liked: false,
    saved: false,
    skipped: false,
  },
  {
    id: 'post_6',
    username: '@daily_pol',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=600&auto=format&fit=crop',
    caption: 'Debates heat up over the new economic bill. Representatives exchange sharp arguments on funding allocation. Swipe left for details.',
    tags: ['Politics'],
    likes: 932,
    liked: false,
    saved: false,
    skipped: false,
  },
  {
    id: 'post_7',
    username: '@mkbhd',
    avatarUrl: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=100&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    caption: 'My full review of the newest folding phone is now live! The hinge design is way better, but is it worth the $1800 price tag?',
    tags: ['Technology'],
    likes: 9540,
    liked: false,
    saved: false,
    skipped: false,
  },
  {
    id: 'post_8',
    username: '@natgeo',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=100&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&auto=format&fit=crop',
    caption: 'Capturing the ancient rainforest of Costa Rica, home to over 500,000 species of diverse plants and wildlife. Protect our planet. #travel #education',
    tags: ['Travel', 'Education'],
    likes: 12450,
    liked: false,
    saved: false,
    skipped: false,
  }
];

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [navState, setNavState] = useState('main'); // Start directly in main dashboard!
  const [activeTab, setActiveTab] = useState('dashboard');

  // Instagram Connection - Pre-connected by default!
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [instagramAccount, setInstagramAccount] = useState({
    username: 'feedflow_user',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    postsCount: 142,
    followersCount: '1.2k',
  });
  const [lastSync, setLastSync] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  // Preferences
  const [boostedInterests, setBoostedInterests] = useState(INITIAL_BOOSTED);
  const [mutedTopics, setMutedTopics] = useState(INITIAL_MUTED);

  // Automation - Active by default!
  const [isAutomationActive, setIsAutomationActive] = useState(true);
  const [completedActions, setCompletedActions] = useState(24); // Start with pre-filled stats
  const [automationSpeed, setAutomationSpeed] = useState('balanced');
  const [relevanceScore, setRelevanceScore] = useState(65); // Start at 65% pre-trained
  const [relevanceHistory, setRelevanceHistory] = useState([35, 42, 48, 53, 58, 62, 65]);
  const [automationLogs, setAutomationLogs] = useState([
    { id: 'init_1', timestamp: '13:01:05', text: '🤖 FeedFlow synchronization suite initialized.', type: 'info' },
    { id: 'init_2', timestamp: '13:01:10', text: '✅ Secure credentials session established.', type: 'info' },
    { id: 'init_3', timestamp: '13:01:15', text: '❤️ Completed action: "Liked post" on post by @deepmind', type: 'boost' },
    { id: 'init_4', timestamp: '13:01:25', text: '⏩ Action: Fast-scrolled past post (0.6s) and marked "Not Interested"', type: 'mute' },
  ]);

  // Advanced Engagement Rules
  const [autoLike, setAutoLike] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [autoComment, setAutoComment] = useState(false);
  const [sleepMode, setSleepMode] = useState(true);

  // Simulated Instagram Posts State
  const [simulatedPosts, setSimulatedPosts] = useState(INITIAL_SIMULATED_POSTS);

  // Automation speed mapping to interval in milliseconds
  const speedIntervals = {
    safe: 12000,
    balanced: 6000,
    turbo: 3000,
  };

  const addLog = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp,
      text,
      type,
    };
    setAutomationLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 49)]);
  };

  // Simulate Automation System loop
  useEffect(() => {
    if (!isAutomationActive || connectionStatus !== 'connected') return;

    const intervalId = setInterval(() => {
      runAutomationCycle();
    }, speedIntervals[automationSpeed]);

    return () => clearInterval(intervalId);
  }, [isAutomationActive, connectionStatus, boostedInterests, mutedTopics, automationSpeed, autoLike, autoSave, autoComment]);

  const runAutomationCycle = () => {
    const enabledBoosted = boostedInterests.filter(b => b.enabled);
    const enabledMuted = mutedTopics.filter(m => m.enabled);
    
    if (enabledBoosted.length === 0 && enabledMuted.length === 0) {
      addLog('⚠️ No active Boost or Mute targets. Personalization paused.', 'error');
      return;
    }

    const isBoostAction = Math.random() > 0.35; // 65% chance to boost, 35% to mute

    if (isBoostAction && enabledBoosted.length > 0) {
      const totalWeight = enabledBoosted.reduce((sum, item) => sum + item.weight, 0);
      let randomVal = Math.random() * totalWeight;
      let selectedItem = enabledBoosted[0];
      
      for (const item of enabledBoosted) {
        randomVal -= item.weight;
        if (randomVal <= 0) {
          selectedItem = item;
          break;
        }
      }

      const creators = MOCK_CREATORS[selectedItem.name] || ['@instagram_explore'];
      const creator = creators[Math.floor(Math.random() * creators.length)];
      
      let actionsSelected = [];
      if (autoLike) actionsSelected.push('Liked post');
      if (autoSave && Math.random() > 0.5) actionsSelected.push('Saved post to collection');
      if (autoComment && Math.random() > 0.7) actionsSelected.push('Shared positive emoji comment');
      
      if (actionsSelected.length === 0) {
        actionsSelected.push('Watched video (full duration)');
      }
      
      const action = actionsSelected[Math.floor(Math.random() * actionsSelected.length)];

      addLog(`🔍 Searching feed for #${selectedItem.name.toLowerCase().replace(/\s+/g, '')}...`, 'info');
      
      setSimulatedPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.tags.includes(selectedItem.name)) {
            return {
              ...post,
              liked: autoLike ? true : post.liked,
              saved: autoSave ? true : post.saved,
              likes: autoLike && !post.liked ? post.likes + 1 : post.likes
            };
          }
          return post;
        })
      );

      setTimeout(() => {
        addLog(`✨ Target post found from ${creator} (Relevance weight: ${selectedItem.weight}%)`, 'info');
        
        setTimeout(() => {
          addLog(`❤️ Completed action: "${action}" on post by ${creator}`, 'boost');
          setCompletedActions(prev => prev + 1);
          setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          
          setRelevanceScore(prev => {
            const increment = (100 - prev) * 0.035;
            const nextScore = Math.round((prev + increment) * 10) / 10;
            const updated = Math.min(nextScore, 98.4);
            
            setRelevanceHistory(history => {
              return [...history.slice(1), Math.round(updated)];
            });
            
            return updated;
          });
        }, 1500);
      }, 1500);

    } else if (enabledMuted.length > 0) {
      const selectedItem = enabledMuted[Math.floor(Math.random() * enabledMuted.length)];
      const creators = MOCK_MUTE_CREATORS[selectedItem.name] || ['@ad_sponsored'];
      const creator = creators[Math.floor(Math.random() * creators.length)];

      addLog(`🔍 Scanning feed for keyword "${selectedItem.name.toLowerCase()}"...`, 'info');
      
      setSimulatedPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.tags.includes(selectedItem.name)) {
            return { ...post, skipped: true };
          }
          return post;
        })
      );

      setTimeout(() => {
        addLog(`⚠️ Flagged post by ${creator} containing muted content: "${selectedItem.name}"`, 'info');
        
        setTimeout(() => {
          addLog(`⏩ Action: Fast-scrolled past post (0.6s) and marked "Not Interested"`, 'mute');
          setCompletedActions(prev => prev + 1);
          setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          
          setRelevanceScore(prev => {
            const increment = (100 - prev) * 0.015;
            const nextScore = Math.round((prev + increment) * 10) / 10;
            const updated = Math.min(nextScore, 98.4);
            
            setRelevanceHistory(history => {
              return [...history.slice(1), Math.round(updated)];
            });
            
            return updated;
          });
        }, 1500);
      }, 1500);
    }
  };

  const toggleBoost = (id) => {
    setBoostedInterests(prev => prev.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
    addLog(`🔄 Updated boost preferences`, 'info');
  };

  const updateBoostWeight = (id, val) => {
    setBoostedInterests(prev => prev.map(item => 
      item.id === id ? { ...item, weight: Math.round(val) } : item
    ));
  };

  const toggleMute = (id) => {
    setMutedTopics(prev => prev.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
    addLog(`🔄 Updated mute preferences`, 'info');
  };

  const updateMuteWeight = (id, val) => {
    setMutedTopics(prev => prev.map(item => 
      item.id === id ? { ...item, weight: Math.round(val) } : item
    ));
  };

  const addCustomMuteTopic = (name) => {
    if (!name.trim()) return;
    const newId = 'm_' + Math.random().toString(36).substr(2, 9);
    setMutedTopics(prev => [
      ...prev,
      { id: newId, name: name.trim(), weight: 70, enabled: true }
    ]);
    addLog(`➕ Added custom mute topic: "${name.trim()}"`, 'info');
  };

  const connectInstagram = (username, password) => {
    if (!username.trim() || !password.trim()) {
      addLog('❌ Instagram Connection Failed: Missing username or password', 'error');
      return false;
    }
    
    setConnectionStatus('connecting');
    addLog(`🔒 Initiating secure Instagram session for @${username}...`, 'info');
    
    setTimeout(() => {
      addLog(`🔑 Logged in successfully. Syncing followers and feed recommendations...`, 'info');
      
      setTimeout(() => {
        setInstagramAccount({
          username: username.trim(),
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          postsCount: 142,
          followersCount: '1.2k',
        });
        setConnectionStatus('connected');
        setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        addLog(`✅ Instagram account @${username} connected successfully!`, 'info');
      }, 1500);
    }, 1500);

    return true;
  };

  const disconnectInstagram = () => {
    const username = instagramAccount?.username || 'user';
    setConnectionStatus('disconnected');
    setInstagramAccount(null);
    setIsAutomationActive(false);
    setSimulatedPosts(INITIAL_SIMULATED_POSTS);
    addLog(`🔌 Disconnected Instagram account @${username}`, 'info');
  };

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      navState,
      setNavState,
      activeTab,
      setActiveTab,
      connectionStatus,
      instagramAccount,
      lastSync,
      boostedInterests,
      mutedTopics,
      isAutomationActive,
      setIsAutomationActive,
      completedActions,
      automationSpeed,
      setAutomationSpeed,
      relevanceScore,
      relevanceHistory,
      automationLogs,
      autoLike,
      setAutoLike,
      autoSave,
      setAutoSave,
      autoComment,
      setAutoComment,
      sleepMode,
      setSleepMode,
      simulatedPosts,
      setSimulatedPosts,
      toggleBoost,
      updateBoostWeight,
      toggleMute,
      updateMuteWeight,
      addCustomMuteTopic,
      connectInstagram,
      disconnectInstagram,
      addLog,
    }}>
      {children}
    </AppContext.Provider>
  );
};
