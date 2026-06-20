import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import { Instagram, Lock, ShieldCheck, LogOut, CheckCircle, ArrowRight } from 'lucide-react-native';

export default function ConnectionScreen() {
  const { 
    connectInstagram, 
    disconnectInstagram, 
    connectionStatus, 
    instagramAccount, 
    navState,
    setNavState,
    theme 
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isDark = theme === 'dark';

  const handleConnect = () => {
    setErrorMsg('');
    if (!username.trim()) {
      setErrorMsg('Please enter your Instagram username.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    const success = connectInstagram(username, password);
    if (!success) {
      setErrorMsg('Failed to initiate login connection.');
    }
  };

  const handleGoToDashboard = () => {
    setNavState('main');
  };

  const colors = {
    bg: isDark ? '#0B0B14' : '#F5F6FA',
    card: isDark ? '#151526' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    mutedText: isDark ? '#9E9EAF' : '#6A6A80',
    border: isDark ? '#282846' : '#E2E2EC',
    inputBg: isDark ? '#22223a' : '#F0F0F5',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Onboarding header */}
        {navState === 'connection' && (
          <View style={styles.introHeader}>
            <Instagram size={24} color="#e1306c" style={{ marginBottom: 6 }} />
            <Text style={[styles.introTitle, { color: colors.text }]}>Secure Instagram Connection</Text>
            <Text style={[styles.introSub, { color: colors.mutedText }]}>
              Connect your account so FeedFlow can optimize your feed recommendations in the background.
            </Text>
          </View>
        )}

        {connectionStatus === 'disconnected' ? (
          /* Login Form Panel */
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.iconCircle}>
              <Instagram size={32} color="#e1306c" />
            </View>
            
            <Text style={[styles.cardTitle, { color: colors.text }]}>Connect to Instagram</Text>
            <Text style={[styles.cardSubtitle, { color: colors.mutedText }]}>
              Enter credentials to establish a secure browser-session sync.
            </Text>

            {errorMsg ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.mutedText }]}>Instagram Username</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
                  placeholder="username"
                  placeholderTextColor={isDark ? '#6A6A80' : '#9E9EAF'}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.mutedText }]}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
                  placeholder="••••••••••••"
                  placeholderTextColor={isDark ? '#6A6A80' : '#9E9EAF'}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.securityInfo}>
              <Lock size={12} color="#4CAF50" style={{ marginRight: 6 }} />
              <Text style={styles.securityText}>Credentials are only stored locally to run background session sync.</Text>
            </View>

            <TouchableOpacity 
              style={styles.connectBtn} 
              onPress={handleConnect}
              activeOpacity={0.8}
            >
              <Text style={styles.connectBtnText}>Connect Session</Text>
            </TouchableOpacity>
          </View>
        ) : connectionStatus === 'connecting' ? (
          /* Connecting State Panel */
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, paddingVertical: 50 }]}>
            <ActivityIndicator size="large" color="#e1306c" style={{ marginBottom: 20 }} />
            <Text style={[styles.connectingTitle, { color: colors.text }]}>Logging into Instagram...</Text>
            <Text style={[styles.connectingSubtitle, { color: colors.mutedText }]}>
              Establishing secure local session agent. Please wait.
            </Text>
          </View>
        ) : (
          /* Connected State Panel */
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.connectedHeader, { borderBottomColor: colors.border }]}>
              <CheckCircle size={26} color="#4CAF50" />
              <Text style={[styles.connectedTitle, { color: colors.text }]}>Successfully Connected</Text>
            </View>

            {instagramAccount && (
              <View style={styles.profileContainer}>
                <Image 
                  source={{ uri: instagramAccount.avatarUrl }} 
                  style={styles.avatar}
                />
                <Text style={[styles.usernameText, { color: colors.text }]}>
                  @{instagramAccount.username}
                </Text>
                
                <View style={[styles.badgeContainer, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
                  <ShieldCheck size={11} color="#4CAF50" style={{ marginRight: 4 }} />
                  <Text style={styles.badgeLabel}>Automation Sync Active</Text>
                </View>

                {/* Account Stats Row */}
                <View style={[styles.statsRow, { borderColor: colors.border }]}>
                  <View style={styles.statBox}>
                    <Text style={[styles.statNum, { color: colors.text }]}>{instagramAccount.postsCount}</Text>
                    <Text style={[styles.statLabel, { color: colors.mutedText }]}>Posts</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statBox}>
                    <Text style={[styles.statNum, { color: colors.text }]}>{instagramAccount.followersCount}</Text>
                    <Text style={[styles.statLabel, { color: colors.mutedText }]}>Followers</Text>
                  </View>
                </View>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.disconnectBtn, { borderColor: colors.border }]} 
              onPress={disconnectInstagram}
              activeOpacity={0.7}
            >
              <LogOut size={14} color="#e1306c" style={{ marginRight: 6 }} />
              <Text style={styles.disconnectBtnText}>Disconnect Account</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Next button in onboarding state */}
      {navState === 'connection' && connectionStatus === 'connected' && (
        <View style={[styles.footer, { backgroundColor: isDark ? '#0B0B14EE' : '#F5F6FAEE' }]}>
          <TouchableOpacity style={styles.nextButton} onPress={handleGoToDashboard} activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>Enter Dashboard</Text>
            <ArrowRight size={16} color="#FFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  introSub: {
    fontSize: 12.5,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(225, 48, 108, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.2)',
  },
  errorText: {
    color: '#F44336',
    fontSize: 11.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    width: '100%',
  },
  input: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  securityText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
    flex: 1,
  },
  connectBtn: {
    backgroundColor: '#e1306c',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#e1306c',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
  },
  connectBtnText: {
    color: '#FFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  connectingTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  connectingSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  connectedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  connectedTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#e1306c',
  },
  usernameText: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  badgeLabel: {
    color: '#4CAF50',
    fontSize: 10,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 16,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(158,158,175,0.15)',
  },
  disconnectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  disconnectBtnText: {
    color: '#e1306c',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(158,158,175,0.1)',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
});
