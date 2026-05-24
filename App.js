import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";

import { styles } from "./src/styles/global";
import { getLoginUser, initialTransactions } from "./src/data/mockData";
import { mockBackendLog } from "./src/utils/logger";

import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import DisputeModal from "./src/components/DisputeModal";

import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import EvidencesScreen from "./src/screens/EvidencesScreen";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  const defaultUser = getLoginUser();
  const [user, setUser] = useState(null);

  const [activeTab, setActiveTab] = useState("Home");
  const [transactions] = useState(initialTransactions);
  const [disputes, setDisputes] = useState([]);

  // Dispute Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTxn, setActiveTxn] = useState(null);
  const [disputeType, setDisputeType] = useState("DUPLICATE_CHARGE");
  const [agentNotes, setAgentNotes] = useState("");
  const [evidenceImage, setEvidenceImage] = useState(null);

  const openDisputeModal = (txn) => {
    setActiveTxn(txn);
    setDisputeType("DUPLICATE_CHARGE");
    setAgentNotes("");
    setEvidenceImage(null);
    setModalVisible(true);
  };

  const submitDispute = () => {
    if (!activeTxn) return;
    
    // Create the expected backend payload
    const payload = {
      dispute_id: "D" + Math.floor(1000 + Math.random() * 9000),
      transaction_id: activeTxn.transaction_id,
      user_id: activeTxn.user_id,
      card_id: activeTxn.card_id,
      merchant_name: activeTxn.merchant_name,
      amount: activeTxn.amount,
      currency: activeTxn.currency,
      dispute_type: disputeType,
      agent_notes: agentNotes,
      evidence_url: evidenceImage, // Local URI for frontend display mock
      decision: "PENDING",
      refund_amount: null, // to be updated by backend
      status: "PENDING",
      agent_id: null,
      date: new Date().toISOString()
    };

    // Log using our backend payload logger
    mockBackendLog(payload);
    
    setDisputes([...disputes, payload]);
    setModalVisible(false);
    setActiveTab("Evidences");
    Alert.alert("Success", "Dispute raised successfully.");
  };

  if (!user) {
    return <LoginScreen onLogin={(name) => setUser({ ...defaultUser, name })} />;
  }

  return (
    <View style={styles.container}>
      <Header user={user} />
      
      {/* Main Content Area */}
      <ScrollView style={styles.scroll}>
        {activeTab === "Home" && <HomeScreen transactions={transactions} />}
        {activeTab === "History" && <HistoryScreen transactions={transactions} disputes={disputes} openDisputeModal={openDisputeModal} />}
        {activeTab === "Evidences" && <EvidencesScreen disputes={disputes} />}
      </ScrollView>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dispute Modal */}
      <DisputeModal 
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        activeTxn={activeTxn}
        disputeType={disputeType}
        setDisputeType={setDisputeType}
        agentNotes={agentNotes}
        setAgentNotes={setAgentNotes}
        evidenceImage={evidenceImage}
        setEvidenceImage={setEvidenceImage}
        submitDispute={submitDispute}
      />

    </View>
  );
}