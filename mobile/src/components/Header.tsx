import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Merchant } from '../types';

interface HeaderProps {
  merchant: Merchant;
  onOpenAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({ merchant, onOpenAssistant }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: merchant.avatarUrl }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <View style={styles.greetingRow}>
            <Text style={styles.greetingText}>Hai, {merchant.name.split(' ')[0]} {merchant.name.split(' ')[1] || ''}!</Text>
            <Text style={styles.handWave}>👋</Text>
          </View>
          <Text style={styles.stallText} numberOfLines={1}>
            {merchant.stallName} • {merchant.stallLocation.split(',')[0]}
          </Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.assistantBtn} onPress={onOpenAssistant} activeOpacity={0.8}>
          <Ionicons name="sparkles" size={16} color="#0D3B23" />
          <Text style={styles.assistantBtnText}>Tanya VERA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F4F7F4',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  handWave: {
    fontSize: 14,
    marginLeft: 4,
  },
  stallText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assistantBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4F82A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#0D3B23',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  assistantBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0D3B23',
    marginLeft: 4,
  },
});
