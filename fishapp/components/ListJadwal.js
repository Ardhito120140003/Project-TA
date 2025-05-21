import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, ScrollView} from "react-native";
import { db, ref, onValue, remove } from "../firebase";

const ListJadwal = () => {
  const [jadwal, setJadwal] = useState([]);

  // Fetch data dari Firebase
  useEffect(() => {
    const schedulesRef = ref(db, "schedules");

    onValue(schedulesRef, (snapshot) => {
      const data = snapshot.val();
      setJadwal(data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : []);
    });
  }, []);

  // Fungsi hapus jadwal
  const hapusJadwalPakan = (id) => {
    remove(ref(db, `schedules/${id}`))
      .then(() => console.log("Jadwal berhasil dihapus"))
      .catch((error) => console.error("Gagal menghapus data:", error));
  };

  return (
      <View style={styles.card}>
      <Text style={styles.title}>Jadwal Pakan</Text>
        <FlatList
        data={jadwal}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{`${item.jam} - ${item.berat} gram`}</Text>
            <Button title="Hapus" onPress={() => hapusJadwalPakan(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    minHeight: 130,

  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default ListJadwal;
