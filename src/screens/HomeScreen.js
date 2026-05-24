import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/global';

export default function HomeScreen({ transactions }) {
  return (
    <View>
      <Text style={styles.section}>📅 Top 5 Transactions</Text>
      {transactions.slice(0, 5).map((txn, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.details}>
            <Text style={styles.title}>{txn.merchant_name}</Text>
            <Text style={styles.amount}>₹{txn.amount} ▼</Text>
            <Text style={styles.meta}>{txn.txn_ts} · {txn.method}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
