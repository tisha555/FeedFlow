import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useApp } from '../context/AppContext';
import CustomChart from '../components/CustomChart';
import { Play, Pause, AlertTriangle, RefreshCw, Layers, CheckSquare, ShieldCheck } from 'lucide-react-native';

export default function DashboardScreen() {
  const { 
    connectionStatus, 
    instagramAccount, 
    lastSync, 
    isAutomationActive, 
    setIsAutomationActive, 
    completedActions, 
    relevanceScore, 
    automationLogs,
    theme 
  } = useApp();

  const isDark = theme === 'dark';

  const toggleAutomation = () => {
    if (connectionStatus !== 'connected') {
      alert('Please connect your Instagram account in the Connections tab before activating personalization.');
      return;
    }
    setIsAutomationActive(!isAutomationActive);
  };

  const colors = {
    bg: isDark ? '#0B0B14' : '#F5F6FA',
    card: isDark ? '#151526' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    mutedText: isDark ? '#9E9EAF' : '#6A6A80',
    border: isDark ? '#282846' : '#E2E2EC',
    consoleBg: isDark ? '#08080F' : '#11111E',
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.bg }]} 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      
      {/* Connection Warning banner if disconnected */}
      {connectionStatus !== 'connected' && (
        <View style={styles.warningBanner}>
          <AlertTriangle size={16} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.warningText}>
            Instagram disconnected. Connect your profile to enable feed optimization.
          </Text>
        </View>
      )}

      {/* Activation Panel */}
      <View style={[styles.card, styles.activationCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.activationInfo}>
          <Text style={[styles.activationTitle, { color: colors.text }]}>Feed Personalization</Text>
          <Text style={[styles.activationDesc, { color: colors.mutedText }]}>
            {isAutomationActive && connectionStatus === 'connected' 
              ? 'Agent is optimizing your feed weights...' 
              : 'Turn on personalization to align recommendation feeds'}
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={isAutomationActive ? '#FFF' : '#f4f3f4'}
            onValueChange={toggleAutomation}
            value={isAutomationActive && connectionStatus === 'connected'}
          />
          <Text style={[
            styles.switchLabel, 
            { 
              color: isAutomationActive && connectionStatus === 'connected' ? '#4CAF50' : '#FF9800',
              fontWeight: 'bold' 
            }
          ]}>
            {isAutomationActive && connectionStatus === 'connected' ? 'ACTIVE' : 'PAUSED'}
          </Text>
        </View>
      </View>

      {/* KPI Stats Grid */}
      <View style={styles.statsGrid}>
        {/* Stat 1: Relevance */}
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.statIconHeader}>
            <Layers size={16} color="#8a3ab9" />
            <Text style={[styles.statCardTitle, { color: colors.mutedText }]}>Relevance Score</Text>
          </View>
          <Text style={[styles.statValue, { color: '#8a3ab9' }]}>{relevanceScore}%</Text>
          <Text style={[styles.statSub, { color: colors.mutedText }]}>+{(relevanceScore - 35).toFixed(1)}% since install</Text>
        </View>

        {/* Stat 2: Actions */}
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.statIconHeader}>
            <CheckSquare size={16} color="#e1306c" />
            <Text style={[styles.statCardTitle, { color: colors.mutedText }]}>Actions Run</Text>
          </View>
          <Text style={[styles.statValue, { color: '#e1306c' }]}>{completedActions}</Text>
          <Text style={[styles.statSub, { color: colors.mutedText }]}>Likes, view boosts & skips</Text>
        </View>

        {/* Stat 3: Last Active */}
        <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border, width: '100%' }]}>
          <View style={styles.statIconHeader}>
            <RefreshCw size={14} color="#4CAF50" />
            <Text style={[styles.statCardTitle, { color: colors.mutedText }]}>Session Sync</Text>
          </View>
          <View style={styles.syncRow}>
            <Text style={[styles.syncValueText, { color: colors.text }]}>
              {connectionStatus === 'connected' ? `Connected (@${instagramAccount?.username})` : 'Disconnected'}
            </Text>
            {lastSync && (
              <Text style={[styles.syncTimeText, { color: colors.mutedText }]}>
                Last Action: {lastSync}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Analytics Chart */}
      <CustomChart />

      {/* Live Automation Sync Console */}
      <View style={[styles.consoleCard, { borderColor: colors.border }]}>
        <View style={[styles.consoleHeader, { borderBottomColor: isDark ? '#282846' : '#222' }]}>
          <View style={styles.redDot} />
          <Text style={styles.consoleTitle}>Live Personalization Console</Text>
          {isAutomationActive && connectionStatus === 'connected' && (
            <View style={styles.liveBadge}>
              <View style={styles.glowingDot} />
              <Text style={styles.liveText}>SYNCING</Text>
            </View>
          )}
        </View>
        
        <ScrollView 
          style={[styles.consoleLogArea, { backgroundColor: colors.consoleBg }]} 
          contentContainerStyle={styles.consoleLogContainer}
          nestedScrollEnabled={true}
        >
          {automationLogs.length === 0 ? (
            <View style={styles.emptyLogs}>
              <Text style={styles.emptyLogsText}>
                {isAutomationActive && connectionStatus === 'connected' 
                  ? 'Initializing automation sync agent...' 
                  : 'Console idle. Activate Feed Personalization to see log stream.'}
              </Text>
            </View>
          ) : (
            automationLogs.map((log) => {
              let logColor = '#9E9EAF';
              let logPrefix = '🤖';
              
              if (log.type === 'boost') {
                logColor = '#a2d2ff'; // Soft blue
                logPrefix = '❤️';
              } else if (log.type === 'mute') {
                logColor = '#ffb5a7'; // Soft orange/red
                logPrefix = '⏩';
              } else if (log.type === 'error') {
                logColor = '#F44336';
                logPrefix = '❌';
              }

              return (
                <View key={log.id} style={styles.logRow}>
                  <Text style={styles.logTime}>[{log.timestamp}]</Text>
                  <Text style={[styles.logText, { color: logColor }]}>
                    {logPrefix} {log.text}
                  </Text>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>

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
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#FF9800',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  warningText: {
    color: '#FFF',
    fontSize: 11.5,
    fontWeight: '600',
    flex: 1,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  activationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  activationInfo: {
    flex: 0.7,
  },
  activationTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  activationDesc: {
    fontSize: 11,
    marginTop: 2.5,
    lineHeight: 14,
  },
  switchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchLabel: {
    fontSize: 8.5,
    marginTop: 4,
    letterSpacing: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    width: '48.5%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  statIconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCardTitle: {
    fontSize: 10.5,
    fontWeight: '700',
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statSub: {
    fontSize: 9.5,
    marginTop: 4,
  },
  syncRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  syncValueText: {
    fontSize: 13,
    fontWeight: '700',
  },
  syncTimeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  consoleCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  consoleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C2E',
    height: 38,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
    marginRight: 8,
  },
  consoleTitle: {
    color: '#E0E0FF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  glowingDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  liveText: {
    color: '#4CAF50',
    fontSize: 8,
    fontWeight: '800',
  },
  consoleLogArea: {
    height: 200,
    padding: 12,
  },
  consoleLogContainer: {
    paddingBottom: 20,
  },
  emptyLogs: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyLogsText: {
    color: '#6A6A80',
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 18,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  logTime: {
    color: '#8A8AB0',
    fontFamily: 'monospace',
    fontSize: 10.5,
    marginRight: 8,
    width: 65,
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 10.5,
    flex: 1,
    lineHeight: 14,
  },
});
