import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { db, ref, push, set } from "../firebase";
import { Ionicons } from "@expo/vector-icons";

const AddJadwal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [jam, setJam] = useState("");
  const [berat, setBerat] = useState("");

  const tambahJadwalPakan = () => {
    if (!jam || !berat) return alert("Harap isi semua kolom!");
    const scheduleRef = push(ref(db, "schedules"));
    set(scheduleRef, { jam, berat })
      .then(() => {
        console.log("Jadwal berhasil ditambahkan");
        setJam("");
        setBerat("");
        setModalVisible(false);
      })
      .catch((error) => console.error("Gagal menambahkan data:", error));
  };

  return (
    <>
      {/* Tombol Mengambang */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} style={{ color: "#fff" }} />
        {/* <Text style={styles.buttonText}>+</Text> */}
      </TouchableOpacity>

      {/* Modal Form Tambah Jadwal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambah Jadwal Pakan</Text>

            <Text style={{marginBottom:5}}>Jam (HH:MM)</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh : 11:00"
              placeholderTextColor="#555"
              value={jam}
              onChangeText={setJam}
              keyboardType="default"
            />

            <Text style={{marginBottom:5}}>Berat Pakan (gram)</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh : 100"
              placeholderTextColor="#555"
              value={berat}
              onChangeText={setBerat}
              keyboardType="numeric"
            />

            <View style={styles.buttonRow}>
              <Button
                title="Batal"
                onPress={() => setModalVisible(false)}
                color="red"
              />
              <Button 
                title="Simpan"
                onPress={tambahJadwalPakan}
                color={"#0077ff"}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007aff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default AddJadwal;
