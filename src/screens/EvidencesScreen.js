import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/global';

export default function EvidencesScreen({ disputes }) {
  // Only show disputes that have uploaded evidence
  const evidences = disputes.filter(d => d.evidence_url);

  return (
    <View>
      <Text style={styles.section}>📁 My Evidences</Text>
      {evidences.length === 0 ? (
        <Text style={styles.meta}>No receipts or evidences uploaded yet.</Text>
      ) : (
        evidences.map((disp, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Dispute: {disp.dispute_id}</Text>
            <Text style={styles.meta}>Transaction: {disp.transaction_id} ({disp.merchant_name})</Text>
            <Text style={styles.meta}>Type: {disp.dispute_type}</Text>
            <Text style={[styles.meta, { color: "orange", fontWeight: "bold" }]}>Status: {disp.status} - {disp.decision}</Text>
            <Text style={styles.meta}>Notes: {disp.agent_notes}</Text>
            <Image source={{ uri: disp.evidence_url }} style={styles.evidenceThumbnail} />
          </View>
        ))
      )}
    </View>
  );
}
