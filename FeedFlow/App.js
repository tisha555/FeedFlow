import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from './src/context/AppContext';
import Header from './src/components/Header';
import OnboardingScreen from './src/screens/OnboardingScreen';
import PreferencesScreen from './src/screens/PreferencesScreen';
import ConnectionScreen from './src/screens/ConnectionScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FeedExplorerScreen from './src/screens/FeedExplorerScreen';
import { LayoutDashboard, Compass, SlidersHorizontal, Link as LinkIcon, Settings as SettingsIcon } from 'lucide-react-native';

function MainAppContent() {
  const { navState, activeTab, setActiveTab, theme } = useApp();
  const { width } = useWindowDimensions();

  const isDark = theme === 'dark';
  const isLargeScreen = width > 768;

  const colors = {
    bg: isDark ? '#0B0B14' : '#F5F6FA',
    sidebarBg: isDark ? '#151526' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    mutedText: isDark ? '#9E9EAF' : '#6A6A80',
    border: isDark ? '#282846' : '#E2E2EC',
  };

  // 1. Onboarding Flow
  if (navState === 'onboarding') {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <OnboardingScreen />
      </SafeAreaView>
    );
  }

  // 2. Setup Preference Flow
  if (navState === 'preferences') {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Header />
        <PreferencesScreen />
      </SafeAreaView>
    );
  }

  // 3. Setup Connection Flow
  if (navState === 'connection') {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Header />
        <ConnectionScreen />
      </SafeAreaView>
    );
  }

  // 4. Main App Dashboard Flow
  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'simulator':
        return <FeedExplorerScreen />;
      case 'preferences':
        return <PreferencesScreen />;
      case 'connection':
        return <ConnectionScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'simulator', label: 'Feed Simulator', icon: Compass },
    { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
    { id: 'connection', label: 'Connection', icon: LinkIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {isLargeScreen ? (
        /* Large Screen / Web Sidebar Layout */
        <View style={styles.largeScreenContainer}>
          {/* Sidebar */}
          <View style={[styles.sidebar, { backgroundColor: colors.sidebarBg, borderRightColor: colors.border }]}>
            <View style={styles.sidebarHeader}>
              <Text style={[styles.sidebarLogoText, { color: colors.text }]}>FeedFlow</Text>
              <Text style={styles.sidebarSubText}>Algorithm Personalization</Text>
            </View>

            <View style={styles.sidebarMenu}>
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.sidebarItem,
                      isActive && [styles.sidebarItemActive, { backgroundColor: isDark ? 'rgba(138, 58, 185, 0.15)' : 'rgba(138, 58, 185, 0.08)' }]
                    ]}
                    onPress={() => setActiveTab(item.id)}
                    activeOpacity={0.7}
                  >
                    <Icon size={20} color={isActive ? '#8a3ab9' : colors.mutedText} />
                    <Text 
                      style={[
                        styles.sidebarItemText, 
                        { color: isActive ? '#8a3ab9' : colors.mutedText, fontWeight: isActive ? '700' : '500' }
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.sidebarFooter}>
              <Text style={[styles.sidebarFooterText, { color: colors.mutedText }]}>FeedFlow v1.0.0</Text>
            </View>
          </View>

          {/* Central Main View */}
          <View style={styles.largeScreenContentWrapper}>
            <Header />
            <View style={styles.screenInnerContent}>
              {renderActiveScreen()}
            </View>
          </View>
        </View>
      ) : (
        /* Mobile Portrait Layout */
        <View style={styles.mobileContainer}>
          <Header />
          <View style={styles.mobileContent}>
            {renderActiveScreen()}
          </View>
          
          {/* Floating Bottom Nav Bar */}
          <View style={[styles.bottomNav, { backgroundColor: colors.sidebarBg, borderTopColor: colors.border }]}>
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.bottomNavItem}
                  onPress={() => setActiveTab(item.id)}
                  activeOpacity={0.7}
                >
                  <Icon size={18} color={isActive ? '#8a3ab9' : colors.mutedText} />
                  <Text 
                    style={[
                      styles.bottomNavItemText, 
                      { color: isActive ? '#8a3ab9' : colors.mutedText, fontWeight: isActive ? '700' : '500' }
                    ]}
                  >
                    {item.label}
                  </Text>
                  {isActive && <View style={styles.activeDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  largeScreenContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    height: '100%',
    borderRightWidth: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    marginTop: 10,
    marginBottom: 30,
  },
  sidebarLogoText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  sidebarSubText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#8a3ab9',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  sidebarMenu: {
    flex: 1,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  sidebarItemActive: {
    borderLeftWidth: 3,
    borderLeftColor: '#8a3ab9',
  },
  sidebarItemText: {
    fontSize: 14,
    marginLeft: 14,
  },
  sidebarFooter: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(158,158,175,0.1)',
  },
  sidebarFooterText: {
    fontSize: 10.5,
    textAlign: 'center',
    fontWeight: '600',
  },
  largeScreenContentWrapper: {
    flex: 1,
    height: '100%',
  },
  screenInnerContent: {
    flex: 1,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
  },
  mobileContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mobileContent: {
    flex: 1,
  },
  bottomNav: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingBottom: 4,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  bottomNavItemText: {
    fontSize: 8.5,
    marginTop: 4,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8a3ab9',
    position: 'absolute',
    bottom: 4,
  },
});
