//SettingScreen
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, FlatList, Modal, StyleSheet, TextInput, Switch, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db, ref, set, remove } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";

export default function SettingScreen({ navigation }) {
    const handleLogout = () => {
        Alert.alert("Konfirmasi", "Yakin ingin logout?", [
            { text: "Batal", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                // onPress: () => signOut(auth).then(() => navigation.replace("Login")),
                onPress: async () => {
                    try {
                        const uid = auth.currentUser?.uid;

                        // Hapus FCM Token dulu
                        if (uid) {
                            await remove(ref(db, `users/${uid}/fcmToken`));
                            console.log("FCM Token dihapus dari database");
                        }

                        // Baru logout
                        await signOut(auth);
                        navigation.replace("Login");
                    } catch (e) {
                        console.log("Logout error:", e);
                    }
                },
            },
        ]);
    };

    const settingsData = [
        { id: '1', title: 'Log Aerator', group: 'Atur durasi Log Aerator', icon: 'options-outline'},
        { id: '2', title: 'Notification', group: 'Atur Notifikasi', icon: 'notifications-outline' },
        { id: '3', title: 'About', group: 'Tentang', icon: 'information-circle-outline' }
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // State Modal 1
    const [logDuration, setLogDuration] = useState("");

    // State Modal 2
    const [doMin, setDoMin] = useState("");
    const [doMax, setDoMax] = useState("");
    const [tempMin, setTempMin] = useState("");
    const [tempMax, setTempMax] = useState("");
    const [notifEnabled, setNotifEnabled] = useState(false);

    // const openModal = (item) => {
    //     setModalContent(`${item.group}: ${item.title}`);
    //     setModalVisible(true);
    // };

    const openModal = (item) => {
        setSelectedId(item.id);
        setModalVisible(true);
    };

    const renderModalContent = () => {
        // Modal 1 → Log Aerator
        if (selectedId === '1') {
            return (
                <>
                    <Text style={styles.modalTitle}>Durasi Log Aerator</Text>
                    <Text style={{ marginBottom: 5 }}>Durasi Log (Menit) </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh : 15"
                        placeholderTextColor="#555"
                        keyboardType="numeric"
                        value={logDuration}
                        onChangeText={setLogDuration}
                    />
                    <View style={styles.buttonRow}>
                        <Button
                            title="Batal"
                            onPress={() => setModalVisible(false)}
                            color="red"
                        />
                        <Button
                            title="Simpan"
                            onPress={() => {
                                if (!logDuration) return alert("Harap isi durasi log!");
                                set(ref(db, "/aerator/log_duration"), Number(logDuration));
                                setModalVisible(false);
                            }}
                            color={"#0077ff"}
                        />
                    </View>
                </>
            );
        }

        // Modal 2 → Notifikasi DO
        if (selectedId === '2') {
            return (
                <>
                    <Text style={styles.modalTitle}> Atur Notifikasi</Text>

                    {notifEnabled && (
                        <>
                            <Text style={{ marginBottom: 5 }}>Minimum DO (mg/L)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Contoh : 3"
                                placeholderTextColor="#555"
                                keyboardType="numeric"
                                value={doMin}
                                onChangeText={setDoMin}
                            />

                            <Text style={{ marginBottom: 5 }}>Maksimum DO (mg/L)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Contoh : 7"
                                placeholderTextColor="#555"
                                keyboardType="numeric"
                                value={doMax}
                                onChangeText={setDoMax}
                            />

                            <Text style={{ marginBottom: 5 }}>Minimum Temperatur (°C)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Contoh : 23"
                                placeholderTextColor="#555"
                                keyboardType="numeric"
                                value={tempMin}
                                onChangeText={setTempMin}
                            />

                            <Text style={{ marginBottom: 5 }}>Maksimum Temperatur (°C)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Contoh : 35"
                                placeholderTextColor="#555"
                                keyboardType="numeric"
                                value={tempMax}
                                onChangeText={setTempMax}
                            />
                        </>
                    )}

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, marginBottom: 15, justifyContent: "space-between" }}>
                        <Text style={{ marginRight: 10 }}>Aktifkan Notifikasi</Text>
                        <Switch
                            value={notifEnabled}
                            onValueChange={setNotifEnabled}
                            trackColor={{ false: "#bfbfbf", true: "#4CAF50" }}
                            thumbColor={notifEnabled ? "#ffffff" : "#f4f3f4"}
                        />
                    </View>

                    <View style={styles.buttonRow}>
                        <Button
                            title="Batal"
                            onPress={() => setModalVisible(false)}
                            color="red"
                        />
                        <Button
                            title="Simpan"
                            onPress={() => {
                                if (!doMin & notifEnabled || !doMax & notifEnabled || !tempMin & notifEnabled || !tempMax & notifEnabled) return alert("Harap isi semua kolom!");
                                set(ref(db, "/notification/do/min"), Number(doMin));
                                set(ref(db, "/notification/do/max"), Number(doMax));
                                
                                set(ref(db, "/notification/suhu/min"), Number(tempMin));
                                set(ref(db, "/notification/suhu/max"), Number(tempMax));

                                set(ref(db, "/notification/notify_enabled"), notifEnabled);

                                setModalVisible(false);
                            }}
                            color={"#0077ff"}
                        />
                    </View>
                </>
            );
        }


        // Modal 3 → About (Kosong dulu)
        if (selectedId === '3') {
            return (
                <>
                    <Text style={styles.modalTitle}>Versi aplikasi: 1.0.0</Text>
                    <View style={{justifyContent:"center", paddingHorizontal: 50}}>
                        <Button
                            title="Oke"
                            onPress={() => setModalVisible(false)}
                            color={"#0077ff"}
                        />
                    </View>
                </>
            );
        }

        return null;
    };

    // const renderItem = ({ item }) => (
    //     <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
    //         <View style={{ flexDirection: "row", alignItems: "center" }}>
    //             <Ionicons name={item.icon} size={24} style={{ marginRight: 15, color: "#000" }} />
    //             <View>
    //                 <Text style={{ fontSize: 16, color: "#000" }}>{item.title}</Text>
    //                 {item.group ? <Text style={{ fontSize: 12, color: "#888" }}>{item.group}</Text> : null}
    //             </View>
    //         </View>
    //         <Ionicons name="chevron-forward-outline" size={24} style={{ color: "#000" }} />
    //     </TouchableOpacity>
    // );

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name={item.icon} size={24} style={{ marginRight: 15 }} />
                <View>
                    <Text style={{ fontSize: 16, color: "#000" }}>{item.title}</Text>
                    <Text style={{ fontSize: 12, color: "#888" }}>{item.group}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} />
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 40, marginBottom: 25 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={26} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Settings</Text>
                <Text style={{ fontSize: 26, fontWeight: "bold", color: "#fff" }}>xx</Text>
            </View>

            <FlatList
                data={settingsData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#ccc" }} />}
            />

            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    padding: 15,
                    backgroundColor: "#ff0000",
                    borderRadius: 8,
                    marginVertical: 40,
                }}
            >
                <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                    Logout
                </Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {renderModalContent()}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        justifyContent: "space-between",
        flexDirection: "row"
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
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
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
    cancelBtn: {
        padding: 10,
        backgroundColor: "red",
        borderRadius: 6,
        width: "48%",
        alignItems: "center"
    },
    saveBtn: {
        padding: 10,
        backgroundColor: "#0077ff",
        borderRadius: 6,
        width: "48%",
        alignItems: "center"
    },
});


// // import React from "react";
// // import { View, Text, TouchableOpacity, Alert } from "react-native";
// // import { signOut } from "firebase/auth";
// // import { auth } from "../../firebase";

// // import { Ionicons } from "@expo/vector-icons";
// // import { FlatList } from "react-native-web";

// // export default function SettingScreen({ navigation }) {
// //     const handleLogout = () => {
// //         Alert.alert("Konfirmasi", "Yakin ingin logout?", [
// //             { text: "Batal", style: "cancel" },
// //             {
// //                 text: "Logout",
// //                 style: "destructive",
// //                 onPress: () => {
// //                     signOut(auth).then(() => navigation.replace("Login"));
// //                 },
// //             },
// //         ]);
// //     };

// //     return (
// //         <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
// //             <View style={{flexDirection: "row", justifyContent: "space-between" }}>
// //                 <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 30, marginTop: 40 }}>Pengaturan</Text>
// //                 <TouchableOpacity
// //                     style={{ marginBottom: 30, marginTop: 40 }}
// //                     onPress={() => navigation.navigate("HomeTabs")}
// //                 ><Ionicons name="chevron-back" size={26} /></TouchableOpacity>
// //             </View>

// //             <View>
                
// //             </View>


// //             {/* Tambahkan menu lain di sini jika mau */}

// //             <TouchableOpacity
// //                 onPress={handleLogout}
// //                 style={{
// //                     padding: 15,
// //                     backgroundColor: "#ff0000ff",
// //                     borderRadius: 8,
// //                     marginTop: 580,
// //                 }}
// //             >
// //                 <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" }}>
// //                     Logout
// //                 </Text>
// //             </TouchableOpacity>

// //         </View>
// //     );
// // }


// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Alert, FlatList, Modal, StyleSheet } from "react-native";
// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase";
// import { Ionicons } from "@expo/vector-icons";

// export default function SettingScreen({ navigation }) {
//   const handleLogout = () => {
//     Alert.alert("Konfirmasi", "Yakin ingin logout?", [
//       { text: "Batal", style: "cancel" },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: () => signOut(auth).then(() => navigation.replace("Login")),
//       },
//     ]);
//   };

//   // Gabungkan semua data dalam satu array dengan property 'group'
//   const settingsData = [
//     { id: '1', title: 'Aerator', group: 'Setting Output Frekuensi Aerator' },
//     { id: '2', title: 'Log Aerator', group: 'Atur durasi Log Aerator' },
//     { id: '3', title: 'About', group: 'Tentang' },
//     { id: '4', title: ' ', group: ' ' },
//   ];

//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState("");

//   const openModal = (item) => {
//     setModalContent(`${item.group}: ${item.title}`);
//     setModalVisible(true);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
//       <Text style={{ fontSize: 16 }}>{item.title}</Text>
//       <Text style={{ fontSize: 12, color: "#888" }}>{item.group}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
//       <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 40, marginBottom: 20 }}>
//         <Text style={{ fontSize: 20, fontWeight: "bold"}}>Pengaturan</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={26} />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={settingsData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#ccc" }} />}
//       />

//       <TouchableOpacity
//         onPress={handleLogout}
//         style={{
//           padding: 15,
//           backgroundColor: "#ff0000",
//           borderRadius: 8,
//           marginVertical: 40,
//         }}
//       >
//         <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" }}>
//           Logout
//         </Text>
//       </TouchableOpacity>

//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={{ fontSize: 18, marginBottom: 20 }}>{modalContent}</Text>
//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//               style={styles.modalButton}
//             >
//               <Text style={{ color: "#fff", fontWeight: "bold" }}>Tutup</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   item: {
//     padding: 15,
//     justifyContent: "space-between",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     padding: 20,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalButton: {
//     padding: 10,
//     backgroundColor: "#007AFF",
//     borderRadius: 8,
//   },
// });
