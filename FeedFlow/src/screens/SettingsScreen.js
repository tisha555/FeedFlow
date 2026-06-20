import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useApp } from '../context/AppContext';
import { Sliders, Shield, User, RefreshCw, Activity, Heart, Bookmark, MessageSquare, Moon, HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  const { 
    theme,
    setTheme,
    instagramAccount, 
    connectionStatus,
    automationSpeed, 
    setAutomationSpeed,
    boostedInterests,
    mutedTopics,
    disconnectInstagram,
    addLog,
    autoLike,
    setAutoLike,
    autoSave,
    setAutoSave,
    autoComment,
    setAutoComment,
    sleepMode,
    setSleepMode,
    setNavState,
  } = useApp();

  const isDark = theme === 'dark';

  const handleSpeedChange = (speed) => {
    setAutomationSpeed(speed);
    addLog(`⚙️ Automation speed adjusted to: ${speed.toUpperCase()}`, 'info');
  };

  const handleResetFilters = () => {
    addLog('⚙️ Preference weights re-initialized to default settings', 'info');
    alert('Preferences reset to default weights.');
  };

  const handleLaunchOnboarding = () => {
    addLog('⚙️ Initiated onboarding wizard walkthrough', 'info');
    setNavState('onboarding');
  };

  const colors = {
    bg: isDark ? '#0B0B14' : '#F5F6FA',
    card: isDark ? '#151526' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    mutedText: isDark ? '#9E9EAF' : '#6A6A80',
    border: isDark ? '#282846' : '#E2E2EC',
  };

  const activeBoostCount = boostedInterests.filter(b => b.enabled).length;
  const activeMuteCount = mutedTopics.filter(m => m.enabled).length;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.bg }]} 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      
      {/* Profile summary card */}
      <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {connectionStatus === 'connected' && instagramAccount ? (
          <View style={styles.profileRow}>
            <Image source={{ uri: instagramAccount.avatarUrl }} style={styles.profileAvatar} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>@{instagramAccount.username}</Text>
              <Text style={[styles.profileSub, { color: colors.mutedText }]}>Linked Instagram Profile</Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={disconnectInstagram} activeOpacity={0.7}>
              <Text style={styles.logoutText}>Unlink</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.profileRow}>
            <View style={[styles.profileAvatar, styles.emptyAvatar]}>
              <User size={28} color={colors.mutedText} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>Anonymous User</Text>
              <Text style={[styles.profileSub, { color: colors.mutedText }]}>No Connected Profile</Text>
            </View>
          </View>
        )}
      </View>

      {/* Settings Section: Automation Rules */}
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.sectionHeader}>
          <Sliders size={16} color="#8a3ab9" style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Automation Rules</Text>
        </View>
        <Text style={[styles.sectionDesc, { color: colors.mutedText }]}>
          Toggle specific actions the background agent runs when engaging with boosted posts in the feed.
        </Text>

        <View style={styles.toggleSettingRow}>
          <View style={styles.settingTexts}>
            <View style={styles.iconLabelRow}>
              <Heart size={14} color="#e1306c" style={{ marginRight: 6 }} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Auto-Like Posts</Text>
            </View>
            <Text style={[styles.settingSub, { color: colors.mutedText }]}>Automatically like posts matching boosted tags</Text>
          </View>
          <Switch 
            value={autoLike} 
            onValueChange={(val) => {
              setAutoLike(val);
              addLog(`⚙️ Auto-Like rules set to: ${val ? 'ON' : 'OFF'}`, 'info');
            }} 
            trackColor={{ false: '#767577', true: '#8a3ab9' }} 
          />
        </View>

        <View style={styles.toggleSettingRow}>
          <View style={styles.settingTexts}>
            <View style={styles.iconLabelRow}>
              <Bookmark size={14} color="#fbad50" style={{ marginRight: 6 }} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Auto-Save Bookmarks</Text>
            </View>
            <Text style={[styles.settingSub, { color: colors.mutedText }]}>Save posts to Instagram collections to boost relevance</Text>
          </View>
          <Switch 
            value={autoSave} 
            onValueChange={(val) => {
              setAutoSave(val);
              addLog(`⚙️ Auto-Save rules set to: ${val ? 'ON' : 'OFF'}`, 'info');
            }} 
            trackColor={{ false: '#767577', true: '#8a3ab9' }} 
          />
        </View>

        <View style={styles.toggleSettingRow}>
          <View style={styles.settingTexts}>
            <View style={styles.iconLabelRow}>
              <MessageSquare size={14} color="#4CAF50" style={{ marginRight: 6 }} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Simulate Comments</Text>
            </View>
            <Text style={[styles.settingSub, { color: colors.mutedText }]}>Post context-aware positive emoji comments (high risk)</Text>
          </View>
          <Switch 
            value={autoComment} 
            onValueChange={(val) => {
              setAutoComment(val);
              addLog(`⚙️ Auto-Comment rules set to: ${val ? 'ON' : 'OFF'}`, 'info');
            }} 
            trackColor={{ false: '#767577', true: '#8a3ab9' }} 
          />
        </View>
      </View>

      {/* Settings Section: Automation speed */}
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.sectionHeader}>
          <Activity size={16} color="#8a3ab9" style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Automation Speed</Text>
        </View>
        <Text style={[styles.sectionDesc, { color: colors.mutedText }]}>
          Adjust how quickly the background agent interacts with posts. Safer speeds behave more like natural human scroll patterns.
        </Text>

        <View style={styles.speedGrid}>
          {[
            { id: 'safe', label: '🐢 Safe', desc: 'Interval: ~12s' },
            { id: 'balanced', label: '⚖️ Balanced', desc: 'Interval: ~6s' },
            { id: 'turbo', label: '🚀 Turbo', desc: 'Interval: ~3s' },
          ].map((item) => {
            const isSelected = automationSpeed === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.speedCard,
                  {
                    backgroundColor: isSelected ? '#8a3ab9' : (isDark ? '#22223b' : '#F5F6FA'),
                    borderColor: isSelected ? '#8a3ab9' : colors.border,
                  }
                ]}
                onPress={() => handleSpeedChange(item.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.speedLabel, { color: isSelected ? '#FFF' : colors.text }]}>
                  {item.label}
                </Text>
                <Text style={[styles.speedDesc, { color: isSelected ? 'rgba(255,255,255,0.8)' : colors.mutedText }]}>
                  {item.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Settings Section: Safety & Security */}
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.sectionHeader}>
          <Shield size={16} color="#4CAF50" style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Safety & Security</Text>
        </View>

        <View style={styles.toggleSettingRow}>
          <View style={styles.settingTexts}>
            <View style={styles.iconLabelRow}>
              <Moon size={14} color="#fbad50" style={{ marginRight: 6 }} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Natural Sleep Cycle</Text>
            </View>
            <Text style={[styles.settingSub, { color: colors.mutedText }]}>Pause automation sync during simulated late hours</Text>
          </View>
          <Switch 
            value={sleepMode} 
            onValueChange={(val) => {
              setSleepMode(val);
              addLog(`⚙️ Natural Sleep Cycle set to: ${val ? 'ON' : 'OFF'}`, 'info');
            }} 
            trackColor={{ false: '#767577', true: '#4CAF50' }} 
          />
        </View>

        <View style={styles.toggleSettingRow}>
          <View style={styles.settingTexts}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Stealth Device UserAgent</Text>
            <Text style={[styles.settingSub, { color: colors.mutedText }]}>Mimic device screen resolution to avoid bot warnings</Text>
          </View>
          <Switch value={true} onValueChange={() => {}} trackColor={{ false: '#767577', true: '#4CAF50' }} />
        </View>
      </View>

      {/* Settings Section: Demos & Resets */}
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.sectionHeader}>
          <HelpCircle size={16} color="#2196F3" style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Developer & Demo Controls</Text>
        </View>

        <TouchableOpacity 
          style={[styles.actionBtn, { borderColor: colors.border, marginBottom: 12 }]} 
          onPress={handleLaunchOnboarding}
          activeOpacity={0.7}
        >
          <HelpCircle size={14} color="#2196F3" style={{ marginRight: 6 }} />
          <Text style={[styles.actionBtnText, { color: colors.text }]}>Launch Onboarding Walkthrough</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionBtn, { borderColor: colors.border }]} 
          onPress={handleResetFilters}
          activeOpacity={0.7}
        >
          <RefreshCw size={14} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={[styles.actionBtnText, { color: colors.text }]}>Reset Preference Weights</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.versionText, { color: colors.mutedText }]}>FeedFlow v1.0.0 (Expo v56) • Secure Local Agent</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
  },
  emptyAvatar: {
    backgroundColor: 'rgba(158,158,175,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '800',
  },
  profileSub: {
    fontSize: 11,
    marginTop: 2.5,
  },
  logoutBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  logoutText: {
    color: '#f44336',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  sectionDesc: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 16,
  },
  speedGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedCard: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedLabel: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  speedDesc: {
    fontSize: 8.5,
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 12,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  toggleSettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(158,158,175,0.1)',
  },
  settingTexts: {
    flex: 0.8,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  settingSub: {
    fontSize: 9.5,
    lineHeight: 12,
    marginTop: 2,
  },
  versionText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    fontWeight: '600',
  },
});
