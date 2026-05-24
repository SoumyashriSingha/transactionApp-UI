import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/global';

export default function Footer({ activeTab, setActiveTab }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerBtn} onPress={() => setActiveTab("Home")}>
        <Text style={[styles.footerText, activeTab === "Home" && styles.activeText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerBtn} onPress={() => setActiveTab("History")}>
        <Text style={[styles.footerText, activeTab === "History" && styles.activeText]}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerBtn} onPress={() => setActiveTab("Evidences")}>
        <Text style={[styles.footerText, activeTab === "Evidences" && styles.activeText]}>Evidences</Text>
      </TouchableOpacity>
    </View>
  );
}
