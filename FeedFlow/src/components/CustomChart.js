import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useApp } from '../context/AppContext';

export default function CustomChart() {
  const { relevanceHistory, theme } = useApp();
  const isDark = theme === 'dark';

  const maxVal = 100;
  const labels = ['Sync 1', 'Sync 2', 'Sync 3', 'Sync 4', 'Sync 5', 'Sync 6', 'Current'];

  const colors = {
    cardBg: isDark ? '#1a1a2e' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    mutedText: isDark ? '#9E9EAF' : '#6A6A80',
    gridLine: isDark ? '#282846' : '#E6E6F0',
    barBg: isDark ? '#22223a' : '#F0F0F5',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Feed Personalization Progress</Text>
      <Text style={[styles.subtitle, { color: colors.mutedText }]}>Algorithm relevance alignment over recent cycles</Text>

      {/* Chart Grid */}
      <View style={styles.chartArea}>
        {/* Y Axis Grid Lines */}
        <View style={styles.gridLinesContainer}>
          {[100, 75, 50, 25, 0].map((level, i) => (
            <View key={i} style={[styles.gridRow, { borderBottomColor: colors.gridLine }]}>
              <Text style={[styles.yAxisLabel, { color: colors.mutedText }]}>{level}%</Text>
            </View>
          ))}
        </View>

        {/* Bars Container */}
        <View style={styles.barsContainer}>
          {relevanceHistory.map((val, idx) => {
            const barHeight = `${Math.max(val, 15)}%`;
            const isLast = idx === relevanceHistory.length - 1;

            return (
              <View key={idx} style={styles.barColumn}>
                <View style={styles.barWrapper}>
                  {/* Bar Background Track */}
                  <View style={[styles.barTrack, { backgroundColor: colors.barBg }]}>
                    {/* Active Bar with Gradient Style */}
                    <View 
                      style={[
                        styles.barFill, 
                        { 
                          height: barHeight,
                          backgroundColor: isLast ? '#e1306c' : '#8a3ab9',
                          shadowColor: isLast ? '#e1306c' : '#8a3ab9',
                          shadowOpacity: isLast ? 0.6 : 0.2,
                          shadowRadius: isLast ? 8 : 4,
                          elevation: isLast ? 6 : 2,
                        }
                      ]} 
                    />
                  </View>
                  {/* Value bubble */}
                  <View style={[styles.valBubble, { backgroundColor: isLast ? '#e1306c' : '#282846' }]}>
                    <Text style={styles.valText}>{val}%</Text>
                  </View>
                </View>
                <Text style={[styles.barLabel, { color: isLast ? '#e1306c' : colors.mutedText, fontWeight: isLast ? '700' : '500' }]}>
                  {labels[idx]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
    marginBottom: 20,
  },
  chartArea: {
    height: 170,
    position: 'relative',
    marginTop: 10,
  },
  gridLinesContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },
  gridRow: {
    height: 0,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  yAxisLabel: {
    position: 'absolute',
    left: 0,
    bottom: 4,
    fontSize: 9,
    fontWeight: '600',
  },
  barsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 35,
    right: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  barColumn: {
    alignItems: 'center',
    width: '12%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  barTrack: {
    width: 8,
    height: '80%',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 4,
  },
  valBubble: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 6,
    position: 'absolute',
    bottom: '82%',
    alignSelf: 'center',
  },
  valText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '700',
  },
  barLabel: {
    fontSize: 9,
    marginTop: 8,
    textAlign: 'center',
  },
});
