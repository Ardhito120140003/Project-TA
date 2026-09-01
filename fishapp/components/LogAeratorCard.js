// components/LogAeratorCard.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const LogAeratorCard = ({ logs }) => {

  const exportToCSV = async () => {
    if (!logs || logs.length === 0) return;

    let csv = "Tanggal,Waktu,DO (mg/L),Suhu (Celcius),Frekuensi (Hz)\n";

    logs.forEach((log) => {
      const dateObj = log.timestamp ? new Date(log.timestamp) : null;
      const tanggal = dateObj ? dateObj.toLocaleDateString("id-ID") : "-";
      const waktu = dateObj
        ? dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        : "-";

      const doValue = log.do ?? "-";
      const suhu = log.suhu ?? "-";
      const freq = log.frekuensi ?? "-";

      csv += `${tanggal},${waktu},${doValue},${suhu},${freq}\n`;
    });

    const fileUri = FileSystem.documentDirectory + "log_aerator.csv";
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: "utf8" });

    await Sharing.shareAsync(fileUri);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Log Aerator</Text>

        {/* Tombol Download */}
        <TouchableOpacity onPress={exportToCSV}>
          <Ionicons name="download-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        nestedScrollEnabled
        showsVerticalScrollIndicator
      >
        {logs && logs.length > 0 ? (
          logs.map((log, index) => {
            const dateObj = log.timestamp ? new Date(log.timestamp) : null;
            const formattedDate = dateObj
              ? `${dateObj.toLocaleDateString("id-ID")} | ${dateObj.toLocaleTimeString(
                  "id-ID",
                  { hour: "2-digit", minute: "2-digit" }
                )}`
              : "Tanggal Tidak Tersedia";

            return (
              <View key={index} style={styles.logItem}>
                <Text style={styles.logDate}>{formattedDate}</Text>

                <Text style={styles.logValue}>
                  {log.do ?? "-"} mg/L | {log.suhu ?? "-"} °C
                </Text>

                <Text style={styles.logFreq}>
                  Frekuensi Aerator : {log.frekuensi ?? "-"} Hz
                </Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>Belum ada log aerator.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 5,
    marginTop: 5,
    minHeight: 290,
    maxHeight: 570,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#333" },
  logItem: { backgroundColor: "#f2f2f2", padding: 12, borderRadius: 8, marginBottom: 10 },
  logDate: { fontSize: 13, color: "#666", marginBottom: 4 },
  logValue: { fontSize: 15, fontWeight: "600", color: "#333" },
  logFreq: { marginTop: 4, fontSize: 13, fontWeight: "500", color: "#2e7d32" },
  emptyText: { textAlign: "center", fontStyle: "italic", color: "#888" },
});

export default LogAeratorCard;
