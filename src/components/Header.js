import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/global';

export default function Header({ user }) {
  return (
    <View style={styles.header}>
      <Text style={styles.lock}>🔒 Hello, {user.name}</Text>
      <Text style={styles.bank}>🏦 {user.bank}</Text>
      <Text style={styles.balance}>Available Balance: ₹{user.balance}</Text>
    </View>
  );
}
