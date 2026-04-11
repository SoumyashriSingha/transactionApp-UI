// App.js
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from "react-native";

// Functions to fetch user and transactions
const getLoginUser = () => ({
  name: "Rahul Sharma",
  bank: "HDFC Bank • **** 1234",
  balance: 24500,
});

const getTopTransactions = () => [
  { title: "Zomato", amount: 850, time: "10:30 AM", method: "Card" },
  { title: "Amazon", amount: 2999, time: "09:15 AM", method: "UPI" },
  { title: "Electricity Bill", amount: 1200, time: "06:45 PM", method: "AutoPay" },
  { title: "Swiggy", amount: 450, time: "01:30 PM", method: "Card" },
  { title: "Netflix", amount: 499, time: "11:00 PM", method: "UPI" },
];

// Transaction card component
const TransactionCard = ({ title, amount, time, method }) => (
  <View style={styles.card}>
    <View style={styles.details}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>₹{amount} ▼</Text>
      <Text style={styles.meta}>{time} · {method}</Text>
    </View>
  </View>
);

export default function App() {
  const user = getLoginUser();
  const transactions = getTopTransactions();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.lock}>🔒 Hello, {user.name}</Text>
        <Text style={styles.bank}>🏦 {user.bank}</Text>
        <Text style={styles.balance}>Available Balance: ₹{user.balance}</Text>
      </View>

      {/* Transactions */}
      <ScrollView style={styles.scroll}>
        <Text style={styles.section}>📅 Top 5 Transactions</Text>
        {transactions.map((txn, index) => (
          <TransactionCard key={index} {...txn} />
        ))}
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn}><Text style={styles.footerText}>Search</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}><Text style={styles.footerText}>History</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}><Text style={styles.footerText}>Profile</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 40 },
  
  header: { 
    padding: 20, 
    backgroundColor: "#1976d2", 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 4 }
    })
  },
  lock: { fontSize: 18, fontWeight: "600", color: "#fff" },
  bank: { marginTop: 8, fontSize: 15, color: "#e3f2fd" },
  balance: { marginTop: 4, fontSize: 16, fontWeight: "bold", color: "#fff" },
  
  scroll: { paddingHorizontal: 20 },
  section: { marginTop: 20, fontSize: 18, fontWeight: "600", color: "#333" },
  
  card: { 
    backgroundColor: "#fff", 
    padding: 15, 
    marginTop: 12, 
    borderRadius: 12, 
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 }
    })
  },
  details: { flex: 1 },
  title: { fontSize: 16, fontWeight: "500", color: "#222" },
  amount: { fontSize: 15, color: "#d32f2f", marginTop: 2 },
  meta: { fontSize: 13, color: "#555", marginTop: 2 },
  
  footer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    padding: 15, 
    borderTopWidth: 1, 
    borderColor: "#ddd", 
    backgroundColor: "#fafafa" 
  },
  footerBtn: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: "#1976d2", 
    borderRadius: 8 
  },
  footerText: { color: "#fff", fontWeight: "600" }
});