import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/global';

export default function HistoryScreen({ transactions, disputes, openDisputeModal }) {
  const [expandedTxn, setExpandedTxn] = useState(null);

  const toggleDropdown = (txnId) => {
    if (expandedTxn === txnId) setExpandedTxn(null);
    else setExpandedTxn(txnId);
  }

  return (
    <View>
      <Text style={styles.section}>📜 All Transactions</Text>
      {transactions.map((txn, index) => {
        const dispute = disputes.find(d => d.transaction_id === txn.transaction_id);
        const isExpanded = expandedTxn === txn.transaction_id;

        return (
          <View key={index} style={styles.card}>
            <TouchableOpacity 
              onPress={() => toggleDropdown(txn.transaction_id)} 
              activeOpacity={dispute ? 0.7 : 1}
              disabled={!dispute}
            >
              <View style={styles.row}>
                <View style={styles.details}>
                  <Text style={styles.title}>
                    {txn.merchant_name} (ID: {txn.transaction_id}) {dispute ? (isExpanded ? '▲' : '▼') : ''}
                  </Text>
                  <Text style={styles.amount}>₹{txn.amount}</Text>
                  <Text style={styles.meta}>{txn.txn_ts} · {txn.channel}</Text>
                </View>
                {!dispute ? (
                  <TouchableOpacity 
                    style={styles.raiseBtn} 
                    onPress={() => openDisputeModal(txn)}
                  >
                    <Text style={styles.raiseBtnText}>Raise Dispute</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={[styles.raiseBtn, { backgroundColor: '#9e9e9e' }]}>
                    <Text style={styles.raiseBtnText}>Dispute Raised</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {isExpanded && dispute && (
              <View style={{ marginTop: 15, paddingTop: 10, borderTopWidth: 1, borderColor: '#eee' }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Dispute Details:</Text>
                <Text style={styles.meta}>ID: {dispute.dispute_id}</Text>
                <Text style={styles.meta}>Type: {dispute.dispute_type}</Text>
                <Text style={styles.meta}>Status: {dispute.status}</Text>
                <Text style={styles.meta}>Decision: {dispute.decision}</Text>
                {dispute.dispute_type === 'REFUND_NOT_PROCESSED' && (
                  <Text style={styles.meta}>Refund: ₹{dispute.refund_amount ?? 'Pending'}</Text>
                )}
                <Text style={styles.meta}>Notes: {dispute.agent_notes}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
