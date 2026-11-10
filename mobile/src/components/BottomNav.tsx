import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TabType = 'home' | 'pos' | 'sak_emkm' | 'green' | 'kur';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: 'storefront' },
    { id: 'pos', label: 'Kasir', icon: 'qr-code' },
    { id: 'sak_emkm', label: 'Buku Kas', icon: 'receipt' },
    { id: 'green', label: 'Aksi Hijau', icon: 'leaf' },
    { id: 'kur', label: 'KUR', icon: 'business' },
  ] as const;

  return (
    <View style={styles.container}>
      <View style={styles.dock}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => onTabChange(tab.id)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={tab.icon as keyof typeof Ionicons.glyphMap}
                size={18}
                color={isActive ? '#D4F82A' : '#64748B'}
              />
              {isActive && (
                <Text style={styles.activeLabel}>{tab.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 50,
  },
  dock: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    shadowColor: '#0D3B23',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  tabItemActive: {
    backgroundColor: '#0D3B23',
  },
  activeLabel: {
    color: '#D4F82A',
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 6,
  },
});
