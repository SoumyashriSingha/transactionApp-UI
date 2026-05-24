import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
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
  
  scroll: { paddingHorizontal: 20, marginBottom: 70 },
  section: { marginTop: 20, fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 10 },
  
  card: { 
    backgroundColor: "#fff", 
    padding: 15, 
    marginBottom: 12, 
    borderRadius: 12, 
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 }
    })
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 5 },
  details: { flex: 1 },
  title: { fontSize: 16, fontWeight: "500", color: "#222" },
  amount: { fontSize: 15, color: "#d32f2f", marginTop: 2 },
  meta: { fontSize: 13, color: "#555", marginTop: 2 },
  
  raiseBtn: { backgroundColor: "#ff9800", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  raiseBtnText: { color: "#fff", fontWeight: "600", fontSize: 12 },

  evidenceThumbnail: { width: 240, height: 320, alignSelf: 'center', borderRadius: 8, marginTop: 10, resizeMode: 'cover' },

  footer: { 
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    flexDirection: "row", 
    justifyContent: "space-around", 
    padding: 15, 
    borderTopWidth: 1, 
    borderColor: "#ddd", 
    backgroundColor: "#fafafa" 
  },
  footerBtn: { paddingVertical: 10, paddingHorizontal: 20 },
  footerText: { color: "#555", fontWeight: "600" },
  activeText: { color: "#1976d2", fontWeight: "bold" },

  // Modal Styles
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  label: { marginTop: 15, fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 5 },
  
  typeBtn: { padding: 8, borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
  typeBtnActive: { backgroundColor: "#1976d2", borderColor: "#1976d2" },
  typeBtnText: { color: "#555", fontSize: 12 },
  typeBtnTextActive: { color: "#fff", fontWeight: "bold" },
  
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, height: 80, textAlignVertical: "top" },
  
  uploadBtn: { backgroundColor: "#e3f2fd", padding: 12, borderRadius: 8, alignItems: "center" },
  uploadBtnText: { color: "#1976d2", fontWeight: "600" },
  imgPreview: { width: 240, height: 320, alignSelf: 'center', borderRadius: 8, marginTop: 10, resizeMode: 'cover' },
  actionBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center", marginHorizontal: 5 }
});
