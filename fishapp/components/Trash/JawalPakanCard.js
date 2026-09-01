// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   Modal,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { db, ref, set, push, onValue, remove } from "../firebase";

// const JadwalPakanCard = () => {
//   const [jadwal, setJadwal] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [jam, setJam] = useState("");
//   const [berat, setBerat] = useState("");

//   // Fungsi tambah jadwal
//   const tambahJadwalPakan = () => {
//     if (!jam || !berat) return alert("Harap isi semua kolom!");

//     const scheduleRef = push(ref(db, "schedules"));
//     set(scheduleRef, { jam, berat })
//       .then(() => {
//         console.log("Jadwal berhasil ditambahkan");
//         setJam("");
//         setBerat("");
//         setModalVisible(false);
//       })
//       .catch((error) => console.error("Gagal menambahkan data:", error));
//   };

//   // Fungsi hapus jadwal
//   const hapusJadwalPakan = (id) => {
//     remove(ref(db, `schedules/${id}`))
//       .then(() => console.log("Jadwal berhasil dihapus"))
//       .catch((error) => console.error("Gagal menghapus data:", error));
//   };

//   // Fetch data dari Firebase
//   useEffect(() => {
//     const schedulesRef = ref(db, "schedules");

//     onValue(schedulesRef, (snapshot) => {
//       const data = snapshot.val();
//       setJadwal(
//         data
//           ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
//           : [],
//       );
//     });
//   }, []);

//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>Jadwal Pakan</Text>

//       {/* Tombol untuk membuka modal */}
//       {/* <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
//         <Text style={styles.addButtonText}>Tambah Jadwal</Text>
//       </TouchableOpacity> */}

//       {/* Modal Form */}
//       <Modal visible={modalVisible} animationType="slide" transparent>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Tambah Jadwal Pakan</Text>

//             <Text>Jam (HH:MM)</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Contoh: 11:00"
//               value={jam}
//               onChangeText={setJam}
//               keyboardType="default"
//             />

//             <Text>Berat Pakan (gram)</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Contoh: 50g"
//               value={berat}
//               onChangeText={setBerat}
//               keyboardType="numeric"
//             />

//             <View style={styles.buttonRow}>
//               <Button
//                 title="Batal"
//                 onPress={() => setModalVisible(false)}
//                 color="red"
//               />
//               <Button title="Simpan" onPress={tambahJadwalPakan} />
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* List Jadwal Pakan */}
//       <FlatList
//         data={jadwal}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.listItem}>
//             <Text>{`${item.jam} - ${item.berat}`}</Text>
//             <Button
//               title="Hapus"
//               onPress={() => hapusJadwalPakan(item.id)}
//               color="red"
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//     marginHorizontal: 5,
//     marginVertical: 5,
//     minHeight: 200, // Pastikan cukup tinggi agar bisa scroll
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   addButton: {
//     backgroundColor: "#3498db",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginBottom: 20,
//     elevation: 5,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   listItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 8,
//     marginBottom: 10,
//     borderRadius: 5,
//     width: "100%",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
// });

// export default JadwalPakanCard;
