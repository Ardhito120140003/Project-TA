import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardBar = ({ value, maxValue, label, title }) => {
    const percentage = (value / maxValue) * 100; // Konversi nilai ke persen

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${percentage}%` }]} />
            </View>
            <Text style={styles.labelText}>{label} : <Text style={styles.valueText}>{value}%</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    valueText: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: "bold",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    labelText: {
        fontSize: 16,
        marginTop: 5,
        color: "#666",
    },
    card: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10
    },
    progressFill: { height: '100%', backgroundColor: '#3498db' },
});

export default CardBar;
