// components/LogFeedCard.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";

const LogFeedCard = ({ logs }) => {
  // === FUNGSI EXPORT CSV ===
  const exportToCSV = async () => {
    if (!logs || logs.length === 0) return;

    let csv = "Tanggal,Waktu,Berat (gram),Status\n";

    logs.forEach((log) => {
      const dateObj = log.timestamp ? new Date(log.timestamp) : null;
      const tanggal = dateObj
        ? dateObj.toLocaleDateString("id-ID")
        : "-";
      const waktu = dateObj
        ? dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        : "-";
      const berat = log.berat ? log.berat : "-";
      const status =
        log.status === "success"
          ? "Berhasil"
          : log.status === "failed"
          ? "Gagal"
          : "Tidak Diketahui";

      csv += `${tanggal},${waktu},${berat},${status}\n`;
    });

    const fileUri = FileSystem.documentDirectory + "log_pakan.csv";

    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(fileUri);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Log Pakan</Text>

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

            const value =
              log.berat !== undefined ? `${log.berat} gram` : "Tidak Ada Data";

            const status =
              log.status === "success"
                ? "Berhasil"
                : log.status === "failed"
                ? "Gagal"
                : "Status Tidak Diketahui";

            return (
              <View key={index} style={styles.logItem}>
                <Text style={styles.logDate}>{formattedDate}</Text>
                <Text style={styles.logValue}>{value}</Text>
                <Text
                  style={[
                    styles.logStatus,
                    status === "Berhasil"
                      ? styles.success
                      : status === "Gagal"
                      ? styles.failed
                      : styles.unknown,
                  ]}
                >
                  {status}
                </Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>Belum ada log pakan.</Text>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#333" },

  logItem: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  logDate: { fontSize: 13, color: "#666", marginBottom: 4 },
  logValue: { fontSize: 15, fontWeight: "600", color: "#333" },
  logStatus: { marginTop: 4, fontSize: 13, fontWeight: "500" },

  success: { color: "#2e7d32" },
  failed: { color: "#d32f2f" },
  unknown: { color: "#888" },

  emptyText: { textAlign: "center", fontStyle: "italic", color: "#888" },
});

export default LogFeedCard;
