import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useApp } from '../context/AppContext';
import { Instagram, Sliders, Play, TrendingUp, ChevronRight } from 'lucide-react-native';

const SLIDES = [
  {
    title: "Take Control of Your Instagram Feed",
    description: "Tired of clickbait, ads, and irrelevant recommendations? FeedFlow uses smart automation to teach the Instagram algorithm what you actually care about.",
    icon: Sliders,
    color: '#8a3ab9',
  },
  {
    title: "1. Connect Your Account",
    description: "Establish a secure connection with your Instagram account. Our personalization system runs interactions from your profile to update recommendation weights naturally.",
    icon: Instagram,
    color: '#e1306c',
  },
  {
    title: "2. Define Boost & Mute Topics",
    description: "Choose categories like AI, Startups, and Fitness to BOOST in your feed. Choose noise sources like Gossip, Politics, or Ads to MUTE.",
    icon: Sliders,
    color: '#fbad50',
  },
  {
    title: "3. Activate & Watch It Work",
    description: "Turn on personalization. The background agent browses feeds, likes interests, and skips noise. Check the live sync console to see real-time updates.",
    icon: Play,
    color: '#4CAF50',
  }
];

export default function OnboardingScreen() {
  const { setNavState, theme } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const isDark = theme === 'dark';

  const nextSlide = () => {
    if (activeSlide < SLIDES.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setNavState('preferences');
    }
  };

  const skipOnboarding = () => {
    setNavState('preferences');
  };

  const colors = {
    bg: isDark ? '#0B0B14' : '#F5F6FA',
    card: isDark ? '#151526' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A2E',
    mutedText: isDark ? '#9E9EAF' : '#6A6A80',
    border: isDark ? '#282846' : '#E2E2EC',
  };

  const SlideIcon = SLIDES[activeSlide].icon;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header Skip button */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <TouchableOpacity onPress={skipOnboarding} activeOpacity={0.7}>
          <Text style={[styles.skipButtonText, { color: colors.mutedText }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Card */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.iconContainer, { backgroundColor: `${SLIDES[activeSlide].color}1A` }]}>
          <SlideIcon size={44} color={SLIDES[activeSlide].color} />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          {SLIDES[activeSlide].title}
        </Text>

        <Text style={[styles.description, { color: colors.mutedText }]}>
          {SLIDES[activeSlide].description}
        </Text>
      </View>

      {/* Footer Controls */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, idx) => (
            <View 
              key={idx} 
              style={[
                styles.dot, 
                { 
                  backgroundColor: idx === activeSlide 
                    ? SLIDES[idx].color 
                    : (isDark ? '#282846' : '#E2E2EC'),
                  width: idx === activeSlide ? 20 : 8
                }
              ]} 
            />
          ))}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity 
          style={[styles.primaryButton, { backgroundColor: SLIDES[activeSlide].color }]} 
          onPress={nextSlide}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {activeSlide === SLIDES.length - 1 ? "Get Started" : "Next"}
          </Text>
          <ChevronRight size={18} color="#FFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 8,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    flex: 0.8,
    borderRadius: 24,
    borderWidth: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 6,
  },
});
