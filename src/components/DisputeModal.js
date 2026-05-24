import React, { useState, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Image, Alert, ScrollView } from 'react-native';
import { styles } from '../styles/global';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function DisputeModal({ 
  isModalVisible, 
  setModalVisible, 
  activeTxn, 
  disputeType, 
  setDisputeType, 
  agentNotes, 
  setAgentNotes, 
  evidenceImage, 
  setEvidenceImage, 
  submitDispute 
}) {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setEvidenceImage(result.assets[0].uri);
      setShowCamera(false);
    }
  };

  const startCamera = async () => {
    if (!permission?.granted) {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert("Permission Required", "Camera access is needed to capture live receipt.");
        return;
      }
    }
    setShowCamera(true);
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setEvidenceImage(photo.uri);
      setShowCamera(false);
    }
  };

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { maxHeight: '90%' }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.modalTitle}>Raise Dispute</Text>
          <Text style={styles.meta}>For: {activeTxn?.merchant_name} (₹{activeTxn?.amount})</Text>

          <Text style={styles.label}>Dispute Type</Text>
          <View style={styles.row}>
            {[
              "DUPLICATE_CHARGE", 
              "REFUND_NOT_PROCESSED", 
              "GOODS_NOT_RECEIVED", 
              "ATM_CASH_NOT_RECEIVED", 
              "UNRECOGNIZED_MERCHANT", 
              "SERVICE_NOT_AS_DESCRIBED"
            ].map(type => (
              <TouchableOpacity 
                key={type} 
                style={[styles.typeBtn, disputeType === type && styles.typeBtnActive]}
                onPress={() => setDisputeType(type)}
              >
                <Text style={[styles.typeBtnText, disputeType === type && styles.typeBtnTextActive]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Reason / Notes</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Explain the issue..." 
            value={agentNotes}
            onChangeText={setAgentNotes}
            multiline
          />

          <Text style={styles.label}>Evidence (Receipt / Image)</Text>
          
          {showCamera ? (
            <View style={{ height: 320, width: 240, alignSelf: 'center', borderRadius: 8, overflow: 'hidden', marginTop: 5, backgroundColor: '#000' }}>
              <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }}>
                  <TouchableOpacity style={{ backgroundColor: '#fff', padding: 8, paddingHorizontal: 15, borderRadius: 25 }} onPress={capturePhoto}>
                    <Text style={{ fontWeight: 'bold', color: '#1976d2', fontSize: 13 }}>● Capture</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
              <TouchableOpacity style={{ padding: 10, backgroundColor: '#ffebee', alignItems: 'center' }} onPress={() => setShowCamera(false)}>
                <Text style={{ color: '#c62828', fontWeight: 'bold', fontSize: 13 }}>Cancel Camera</Text>
              </TouchableOpacity>
            </View>
          ) : evidenceImage ? (
             <View>
               <Image source={{ uri: evidenceImage }} style={styles.imgPreview} />
               <View style={[styles.row, { marginTop: 10 }]}>
                 <TouchableOpacity style={[styles.uploadBtn, { flex: 1, marginRight: 5, padding: 10 }]} onPress={startCamera}>
                   <Text style={[styles.uploadBtnText, { fontSize: 12, textAlign: 'center' }]}>Retake Photo</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={[styles.uploadBtn, { flex: 1, marginLeft: 5, padding: 10 }]} onPress={pickImage}>
                   <Text style={[styles.uploadBtnText, { fontSize: 12, textAlign: 'center' }]}>Choose Another</Text>
                 </TouchableOpacity>
               </View>
             </View>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity style={[styles.uploadBtn, { flex: 1, marginRight: 5 }]} onPress={startCamera}>
                <Text style={[styles.uploadBtnText, { textAlign: 'center' }]}>Live Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.uploadBtn, { flex: 1, marginLeft: 5 }]} onPress={pickImage}>
                <Text style={[styles.uploadBtnText, { textAlign: 'center' }]}>From Gallery</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.row, { marginTop: 20, justifyContent: "space-between" }]}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#ccc" }]} onPress={() => { setShowCamera(false); setModalVisible(false); }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#1976d2" }]} onPress={submitDispute}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Submit Dispute</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
