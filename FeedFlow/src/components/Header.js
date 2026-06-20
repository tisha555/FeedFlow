import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Link, AlertTriangle } from 'lucide-react-native';

export default function Header() {
  const { theme, setTheme, connectionStatus, instagramAccount } = useApp();

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const colors = {
    bg: isDark ? '#151526' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    border: isDark ? '#282846' : '#E2E2EC',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
      <View style={styles.brandContainer}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <View style={styles.brandTextContainer}>
          <Text style={[styles.brandName, { color: colors.text }]}>FeedFlow</Text>
          <Text style={styles.brandSub}>YOUR FEED. YOUR WAY.</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        {/* Connection Status Badge */}
        {connectionStatus === 'connected' && instagramAccount ? (
          <View style={[styles.statusBadge, styles.connectedBadge]}>
            <View style={styles.greenDot} />
            <Text style={styles.statusText}>@{instagramAccount.username}</Text>
          </View>
        ) : connectionStatus === 'connecting' ? (
          <View style={[styles.statusBadge, styles.connectingBadge]}>
            <Text style={styles.syncText}>Connecting...</Text>
          </View>
        ) : (
          <View style={[styles.statusBadge, styles.disconnectedBadge, { borderColor: isDark ? '#282846' : '#E2E2EC' }]}>
            <AlertTriangle size={12} color="#FFA726" />
            <Text style={[styles.statusText, { color: '#FFA726', marginLeft: 4 }]}>Disconnected</Text>
          </View>
        )}

        {/* Theme Toggle */}
        <TouchableOpacity 
          style={[styles.themeButton, { backgroundColor: isDark ? '#22223b' : '#F5F6FA', borderColor: colors.border }]} 
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          {isDark ? (
            <Sun size={18} color="#fbad50" />
          ) : (
            <Moon size={18} color="#8a3ab9" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 38,
    height: 38,
    marginRight: 10,
    borderRadius: 8,
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  brandSub: {
    fontSize: 7.5,
    fontWeight: '700',
    color: '#8a3ab9',
    letterSpacing: 0.8,
    marginTop: -2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  connectedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  connectingBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderColor: 'rgba(33, 150, 243, 0.3)',
  },
  disconnectedBadge: {
    backgroundColor: 'rgba(255, 167, 38, 0.05)',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#9E9EAF',
  },
  syncText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#2196F3',
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
