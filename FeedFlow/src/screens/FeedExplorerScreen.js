import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { Heart, Bookmark, Eye, EyeOff, Sparkles, RefreshCw, AlertCircle } from 'lucide-react-native';

export default function FeedExplorerScreen() {
  const { 
    simulatedPosts, 
    setSimulatedPosts, 
    connectionStatus, 
    isAutomationActive,
    boostedInterests,
    mutedTopics,
    addLog,
    theme 
  } = useApp();

  const isDark = theme === 'dark';

  const colors = {
    bg: isDark ? '#0B0B14' : '#F5F6FA',
    card: isDark ? '#151526' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    mutedText: isDark ? '#9E9EAF' : '#6A6A80',
    border: isDark ? '#282846' : '#E2E2EC',
  };

  const handleManualAction = (postId, actionType) => {
    setSimulatedPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          if (actionType === 'like') {
            const liked = !post.liked;
            addLog(`${liked ? '❤️ Manual Like' : '🤍 Removed Like'} on post by ${post.username}`, 'info');
            return {
              ...post,
              liked,
              likes: liked ? post.likes + 1 : post.likes - 1
            };
          }
          if (actionType === 'save') {
            const saved = !post.saved;
            addLog(`${saved ? '🔖 Manual Bookmark' : '🔖 Removed Bookmark'} on post by ${post.username}`, 'info');
            return { ...post, saved };
          }
          if (actionType === 'unmute') {
            addLog(`👁️ Revealed muted content by ${post.username}`, 'info');
            return { ...post, skipped: false };
          }
        }
        return post;
      })
    );
  };

  const handleSimulateSync = () => {
    if (connectionStatus !== 'connected') {
      alert('Please connect your Instagram account first.');
      return;
    }
    
    addLog('⚡ Manual sweep: Scanning simulator feed for preferences...', 'info');
    
    // Process all posts at once to demonstrate filters instantly!
    setSimulatedPosts(prev => 
      prev.map(post => {
        // Check if tags match active boosted topics
        const matchingBoost = post.tags.find(tag => {
          const pref = boostedInterests.find(b => b.name === tag);
          return pref && pref.enabled;
        });

        // Check if tags match active muted topics
        const matchingMute = post.tags.find(tag => {
          const pref = mutedTopics.find(m => m.name === tag);
          return pref && pref.enabled;
        });

        if (matchingMute) {
          return { ...post, skipped: true };
        } else if (matchingBoost) {
          return { ...post, liked: true, saved: true };
        }
        return post;
      })
    );

    addLog('✅ Simulator feed personalized successfully!', 'boost');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Top Banner Control */}
      <View style={[styles.controlBanner, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.bannerInfo}>
          <Sparkles size={16} color="#8a3ab9" style={{ marginRight: 6 }} />
          <Text style={[styles.bannerTitle, { color: colors.text }]}>Visual Feed Simulator</Text>
        </View>
        <TouchableOpacity 
          style={styles.syncBtn} 
          onPress={handleSimulateSync}
          activeOpacity={0.8}
        >
          <RefreshCw size={14} color="#FFF" style={{ marginRight: 6 }} />
          <Text style={styles.syncBtnText}>Personalize Feed</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {connectionStatus !== 'connected' && (
          <View style={styles.connectionWarning}>
            <AlertCircle size={18} color="#FF9800" style={{ marginRight: 8 }} />
            <Text style={styles.warningText}>
              Connecting your Instagram account enables the simulated agent to automate likes/skips.
            </Text>
          </View>
        )}

        {simulatedPosts.map((post) => {
          const isMuted = post.skipped;
          const isBoosted = post.liked && !isMuted;
          
          // Find matching tag category
          const boostTag = post.tags.find(t => boostedInterests.find(b => b.name === t && b.enabled));
          const muteTag = post.tags.find(t => mutedTopics.find(m => m.name === t && m.enabled));

          return (
            <View 
              key={post.id} 
              style={[
                styles.postCard, 
                { 
                  backgroundColor: colors.card, 
                  borderColor: isBoosted 
                    ? '#8a3ab9' 
                    : isMuted 
                      ? 'rgba(244, 67, 54, 0.3)' 
                      : colors.border,
                  borderWidth: isBoosted || isMuted ? 1.5 : 1
                }
              ]}
            >
              {/* Post Header */}
              <View style={[styles.postHeader, { borderBottomColor: colors.border }]}>
                <View style={styles.userInfo}>
                  <Image source={{ uri: post.avatarUrl }} style={styles.userAvatar} />
                  <View>
                    <Text style={[styles.userName, { color: colors.text }]}>{post.username}</Text>
                    <Text style={[styles.userLoc, { color: colors.mutedText }]}>Instagram Feed</Text>
                  </View>
                </View>

                {/* Filter tags badge */}
                {boostTag && (
                  <View style={[styles.categoryBadge, styles.boostBadge]}>
                    <Text style={styles.boostBadgeText}>Boost: {boostTag}</Text>
                  </View>
                )}
                {muteTag && (
                  <View style={[styles.categoryBadge, styles.muteBadge]}>
                    <Text style={styles.muteBadgeText}>Muted: {muteTag}</Text>
                  </View>
                )}
              </View>

              {/* Post Image Container */}
              <View style={styles.imageContainer}>
                {isMuted ? (
                  /* Blurred layout for muted content */
                  <View style={styles.mutedOverlayContainer}>
                    <Image source={{ uri: post.imageUrl }} style={[styles.postImage, styles.blurredImage]} />
                    <View style={styles.mutedBlurOverlay}>
                      <EyeOff size={32} color="#FFF" style={{ marginBottom: 12 }} />
                      <Text style={styles.mutedBlurTitle}>Content Filtered</Text>
                      <Text style={styles.mutedBlurDesc}>
                        Muted keyword match: "{muteTag || 'Blacklisted topic'}"
                      </Text>
                      <Text style={styles.mutedBlurAction}>
                        ⏩ Agent fast-scrolled past post (0.6s)
                      </Text>
                      <TouchableOpacity 
                        style={styles.revealBtn} 
                        onPress={() => handleManualAction(post.id, 'unmute')}
                        activeOpacity={0.7}
                      >
                        <Eye size={12} color="#FFF" style={{ marginRight: 4 }} />
                        <Text style={styles.revealBtnText}>Reveal Post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  /* Standard Post Image */
                  <View style={{ position: 'relative' }}>
                    <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
                    {isBoosted && (
                      <View style={styles.boostOverlayBadge}>
                        <Heart size={14} color="#FFF" fill="#FFF" style={{ marginRight: 4 }} />
                        <Text style={styles.boostOverlayText}>FeedFlow Liked</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>

              {/* Post Action Buttons */}
              {!isMuted && (
                <View style={styles.actionButtonsRow}>
                  <View style={styles.leftActions}>
                    <TouchableOpacity 
                      style={styles.actionBtn} 
                      onPress={() => handleManualAction(post.id, 'like')}
                      activeOpacity={0.7}
                    >
                      <Heart 
                        size={20} 
                        color={post.liked ? '#e1306c' : colors.text} 
                        fill={post.liked ? '#e1306c' : 'transparent'} 
                      />
                    </TouchableOpacity>
                    <Text style={[styles.likesCountText, { color: colors.text }]}>
                      {post.likes.toLocaleString()} likes
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.actionBtn} 
                    onPress={() => handleManualAction(post.id, 'save')}
                    activeOpacity={0.7}
                  >
                    <Bookmark 
                      size={20} 
                      color={post.saved ? '#fbad50' : colors.text} 
                      fill={post.saved ? '#fbad50' : 'transparent'} 
                    />
                  </TouchableOpacity>
                </View>
              )}

              {/* Post Caption */}
              {!isMuted && (
                <View style={styles.postFooter}>
                  <Text style={[styles.captionText, { color: colors.text }]}>
                    <Text style={styles.boldUser}>{post.username} </Text>
                    {post.caption}
                  </Text>
                  <View style={styles.tagsContainer}>
                    {post.tags.map((tag, i) => (
                      <Text key={i} style={styles.hashTag}>#{tag.toLowerCase().replace(/\s+/g, '')}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    height: 52,
    zIndex: 5,
  },
  bannerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8a3ab9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  syncBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  connectionWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderColor: 'rgba(255, 152, 0, 0.2)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  warningText: {
    color: '#FF9800',
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
    lineHeight: 15,
  },
  postCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
  },
  userLoc: {
    fontSize: 9.5,
    fontWeight: '500',
    marginTop: 1,
  },
  categoryBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  boostBadge: {
    backgroundColor: 'rgba(138, 58, 185, 0.1)',
  },
  boostBadgeText: {
    color: '#8a3ab9',
    fontSize: 9,
    fontWeight: '700',
  },
  muteBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  muteBadgeText: {
    color: '#f44336',
    fontSize: 9,
    fontWeight: '700',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.25,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  blurredImage: {
    opacity: 0.12,
  },
  mutedOverlayContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  mutedBlurOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  mutedBlurTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  mutedBlurDesc: {
    color: '#9E9EAF',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  mutedBlurAction: {
    color: '#F44336',
    fontSize: 11.5,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  revealBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#33334d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#4d4d73',
  },
  revealBtnText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  boostOverlayBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#8a3ab9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#8a3ab9',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  boostOverlayText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    padding: 4,
    marginRight: 10,
  },
  likesCountText: {
    fontSize: 12.5,
    fontWeight: '700',
    marginLeft: 2,
  },
  postFooter: {
    paddingHorizontal: 12,
    paddingBottom: 14,
  },
  captionText: {
    fontSize: 12,
    lineHeight: 16,
  },
  boldUser: {
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  hashTag: {
    color: '#8a3ab9',
    fontSize: 11.5,
    fontWeight: '600',
    marginRight: 8,
  },
});
