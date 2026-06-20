import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, Ban, Plus, Sparkles, AlertCircle } from 'lucide-react-native';

export default function PreferencesScreen() {
  const { 
    boostedInterests, 
    mutedTopics, 
    toggleBoost, 
    updateBoostWeight, 
    toggleMute, 
    updateMuteWeight, 
    addCustomMuteTopic,
    navState,
    setNavState,
    theme 
  } = useApp();

  const [customKeyword, setCustomKeyword] = useState('');
  const [activeSegment, setActiveSegment] = useState('boost'); // 'boost' or 'mute'

  const isDark = theme === 'dark';

  const handleAddKeyword = () => {
    if (customKeyword.trim()) {
      addCustomMuteTopic(customKeyword.trim());
      setCustomKeyword('');
    }
  };

  const handleNext = () => {
    if (navState === 'preferences') {
      setNavState('connection');
    }
  };

  const colors = {
    bg: isDark ? '#0B0B14' : '#F5F6FA',
    card: isDark ? '#151526' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    mutedText: isDark ? '#9E9EAF' : '#6A6A80',
    border: isDark ? '#282846' : '#E2E2EC',
    inputBg: isDark ? '#22223a' : '#F0F0F5',
  };

  const renderBoostItem = (item) => {
    const weights = [
      { label: 'Low', val: 30 },
      { label: 'Med', val: 60 },
      { label: 'High', val: 80 },
      { label: 'Max', val: 95 }
    ];

    return (
      <View 
        key={item.id} 
        style={[
          styles.prefCard, 
          { 
            backgroundColor: colors.card, 
            borderColor: item.enabled ? '#8a3ab9' : colors.border,
            borderWidth: item.enabled ? 1.5 : 1
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <TouchableOpacity 
            style={styles.toggleRow} 
            onPress={() => toggleBoost(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, { borderColor: item.enabled ? '#8a3ab9' : colors.mutedText }]}>
              {item.enabled && <View style={[styles.checkedInner, { backgroundColor: '#8a3ab9' }]} />}
            </View>
            <Text style={[styles.prefName, { color: colors.text, fontWeight: item.enabled ? '700' : '500' }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
          {item.enabled && (
            <View style={[styles.badge, { backgroundColor: 'rgba(138, 58, 185, 0.1)' }]}>
              <ArrowUpRight size={10} color="#8a3ab9" />
              <Text style={[styles.badgeText, { color: '#8a3ab9' }]}>Boosting</Text>
            </View>
          )}
        </View>

        {item.enabled && (
          <View style={styles.weightSection}>
            <Text style={[styles.weightLabel, { color: colors.mutedText }]}>
              Boost Intensity: <Text style={{ color: '#8a3ab9', fontWeight: 'bold' }}>{item.weight}%</Text>
            </Text>
            <View style={styles.weightSelector}>
              {weights.map((w) => {
                const isSelected = item.weight === w.val || (w.label === 'Max' && item.weight > 85);
                return (
                  <TouchableOpacity
                    key={w.label}
                    style={[
                      styles.weightPill,
                      {
                        backgroundColor: isSelected ? '#8a3ab9' : (isDark ? '#22223b' : '#F5F6FA'),
                      }
                    ]}
                    onPress={() => updateBoostWeight(item.id, w.val)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.weightPillText, { color: isSelected ? '#FFF' : colors.mutedText }]}>
                      {w.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderMuteItem = (item) => {
    const weights = [
      { label: 'Soft', val: 40 },
      { label: 'Hard', val: 75 },
      { label: 'Block', val: 95 }
    ];

    return (
      <View 
        key={item.id} 
        style={[
          styles.prefCard, 
          { 
            backgroundColor: colors.card, 
            borderColor: item.enabled ? '#e1306c' : colors.border,
            borderWidth: item.enabled ? 1.5 : 1
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <TouchableOpacity 
            style={styles.toggleRow} 
            onPress={() => toggleMute(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, { borderColor: item.enabled ? '#e1306c' : colors.mutedText }]}>
              {item.enabled && <View style={[styles.checkedInner, { backgroundColor: '#e1306c' }]} />}
            </View>
            <Text style={[styles.prefName, { color: colors.text, fontWeight: item.enabled ? '700' : '500' }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
          {item.enabled && (
            <View style={[styles.badge, { backgroundColor: 'rgba(225, 48, 108, 0.1)' }]}>
              <Ban size={10} color="#e1306c" />
              <Text style={[styles.badgeText, { color: '#e1306c' }]}>Muting</Text>
            </View>
          )}
        </View>

        {item.enabled && (
          <View style={styles.weightSection}>
            <Text style={[styles.weightLabel, { color: colors.mutedText }]}>
              Mute Filter Strength: <Text style={{ color: '#e1306c', fontWeight: 'bold' }}>{item.weight}%</Text>
            </Text>
            <View style={styles.weightSelector}>
              {weights.map((w) => {
                const isSelected = item.weight === w.val || (w.label === 'Block' && item.weight > 85);
                return (
                  <TouchableOpacity
                    key={w.label}
                    style={[
                      styles.weightPill,
                      {
                        backgroundColor: isSelected ? '#e1306c' : (isDark ? '#22223b' : '#F5F6FA'),
                      }
                    ]}
                    onPress={() => updateMuteWeight(item.id, w.val)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.weightPillText, { color: isSelected ? '#FFF' : colors.mutedText }]}>
                      {w.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Upper Header info */}
        {navState === 'preferences' && (
          <View style={styles.introHeader}>
            <Sparkles size={20} color="#fbad50" style={{ marginBottom: 6 }} />
            <Text style={[styles.introTitle, { color: colors.text }]}>Configure Your Preferences</Text>
            <Text style={[styles.introSub, { color: colors.mutedText }]}>
              Select topics you wish to boost or mute on Instagram.
            </Text>
          </View>
        )}

        {/* Tab Selector Segment */}
        <View style={[styles.segmentContainer, { borderColor: colors.border }]}>
          <TouchableOpacity 
            style={[
              styles.segmentBtn, 
              { backgroundColor: activeSegment === 'boost' ? '#8a3ab9' : 'transparent' }
            ]}
            onPress={() => setActiveSegment('boost')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, { color: activeSegment === 'boost' ? '#FFF' : colors.mutedText }]}>
              🚀 Boost Interests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.segmentBtn, 
              { backgroundColor: activeSegment === 'mute' ? '#e1306c' : 'transparent' }
            ]}
            onPress={() => setActiveSegment('mute')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, { color: activeSegment === 'mute' ? '#FFF' : colors.mutedText }]}>
              🔇 Muted Topics
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Preference List */}
        {activeSegment === 'boost' ? (
          <View style={styles.prefsList}>
            <View style={styles.infoRow}>
              <AlertCircle size={14} color="#8a3ab9" style={{ marginRight: 6 }} />
              <Text style={[styles.infoText, { color: colors.mutedText }]}>
                The automation bot will search and like posts on these tags.
              </Text>
            </View>
            {boostedInterests.map(renderBoostItem)}
          </View>
        ) : (
          <View style={styles.prefsList}>
            {/* Custom keyword input */}
            <View style={[styles.keywordCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.keywordTitle, { color: colors.text }]}>Mute Specific Keyword</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
                  placeholder="e.g. Gossip, politics, recipe..."
                  placeholderTextColor={isDark ? '#6A6A80' : '#9E9EAF'}
                  value={customKeyword}
                  onChangeText={setCustomKeyword}
                  onSubmitEditing={handleAddKeyword}
                />
                <TouchableOpacity style={styles.addBtn} onPress={handleAddKeyword} activeOpacity={0.8}>
                  <Plus size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoRow}>
              <AlertCircle size={14} color="#e1306c" style={{ marginRight: 6 }} />
              <Text style={[styles.infoText, { color: colors.mutedText }]}>
                Posts containing these keywords will be scrolled past immediately.
              </Text>
            </View>
            {mutedTopics.map(renderMuteItem)}
          </View>
        )}
      </ScrollView>

      {/* Floating Next button in onboarding state */}
      {navState === 'preferences' && (
        <View style={[styles.footer, { backgroundColor: isDark ? '#0B0B14EE' : '#F5F6FAEE' }]}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>Next: Connect Instagram</Text>
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
    marginBottom: 20,
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
  segmentContainer: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '700',
  },
  prefsList: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  infoText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  prefCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkedInner: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  prefName: {
    fontSize: 14.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  weightSection: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(158,158,175,0.15)',
    paddingTop: 12,
  },
  weightLabel: {
    fontSize: 11.5,
    marginBottom: 8,
  },
  weightSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weightPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  weightPillText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  keywordCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  keywordTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 13,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e1306c',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#e1306c',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
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
    backgroundColor: '#e1306c',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#e1306c',
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
