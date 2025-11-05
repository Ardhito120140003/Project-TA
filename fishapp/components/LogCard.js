import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const LogCard = ({ logs, title }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
            >
                {logs && logs.length > 0 ? (
                    logs.map((log, index) => {
                        const dateObj = log.timestamp ? new Date(log.timestamp) : null;
                        const formattedDate = dateObj
                            ? `${dateObj.toLocaleDateString("id-ID", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                              })} | ${dateObj.toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })}`
                            : "Tanggal Tidak Tersedia";

                        // const value = log.rpm !== undefined
                        //     ? `${log.rpm} RPM`
                        //     : log.weight !== undefined
                        //     ? `${log.weight} gram`
                        //     : "Tidak Ada Data";
                        // Gabungkan nilai-nilai yang tersedia
                        const valueParts = [];
                        if (log.do !== undefined) valueParts.push(`${log.do} mg/L`);
                        if (log.suhu !== undefined) valueParts.push(`${log.suhu} °C`);
                        // if (log.rpm !== undefined) valueParts.push(`${log.rpm} Hz`);
                        
                        if (log.berat !== undefined) valueParts.push(`${log.berat} gram`);

                        const value = valueParts.length > 0 ? valueParts.join(" | ") : "Tidak Ada Data";

                        const status = log.status === "success"
                            ? "Berhasil"
                            : log.status === "failed"
                            ? "Gagal"
                            : `Frekuensi Aerator : ${log.frekuensi} Hz`
                            // : "Status Tidak Diketahui"

                        return (
                            <View key={index} style={styles.logItem}>
                                <Text style={styles.logDate}>{formattedDate}</Text>
                                <Text style={styles.logValue}>{value}</Text>
                                <Text style={[styles.logStatus, 
                                    status === "Berhasil" ? styles.success : 
                                    status === "Gagal" ? styles.failed : styles.unknown]}>
                                    {status}
                                </Text>
                            </View>
                        );
                    })
                ) : (
                    <Text style={styles.emptyText}>Belum ada log.</Text>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
        marginHorizontal: 10,
        marginTop: 10,
        minHeight: 290,
        maxHeight: 570,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    logItem: {
        backgroundColor: "#f2f2f2",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    logDate: {
        fontSize: 13,
        color: "#666",
        marginBottom: 4,
    },
    logValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    logStatus: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: "500",
    },
    success: {
        color: "#2e7d32", // Hijau
    },
    failed: {
        color: "#d32f2f", // Merah
    },
    unknown: {
        // color: "#888",
        color: "#2e7d32", // Hijau
    },
    emptyText: {
        fontSize: 14,
        color: "#888",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 10,
    },
});

export default LogCard;