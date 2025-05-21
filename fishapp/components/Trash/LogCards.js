import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const LogCard = ({ logs, title }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView 
                style={styles.logContainer} 
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                showsVerticalScrollIndicator={true} 
                keyboardShouldPersistTaps="handled"
            >
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <Text key={index} style={styles.logText}>
                            {log.timestamp ? String(log.timestamp) : "Waktu Tidak Tersedia"} - {log.rpm ? String(log.rpm) : "Tidak Ada Data"}
                        </Text>
                    ))
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
        minHeight: 100, // Pastikan cukup tinggi agar bisa scroll
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    logContainer: {
        minHeight: 170, // Pastikan cukup tinggi agar bisa scroll
        maxHeight: 155, // Beri batasan tinggi agar bisa di-scroll
    },
    logText: {
        fontSize: 14,
        color: "#333",
        marginVertical: 3,
    },
    emptyText: {
        fontSize: 14,
        color: "#888",
        fontStyle: "italic",
    },
});

export default LogCard;
