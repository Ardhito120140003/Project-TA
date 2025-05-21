import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const CardCircular = ({ value, maxValue, label }) => {
  const percentage = (value / maxValue) * 100; // Konversi nilai ke persen

  return (
    <View style={styles.card}>
  
        <View style={styles.gaugeWrapper}>
          <AnimatedCircularProgress
            size={110}
            width={10}
            fill={percentage}
            tintColor="#3498db"
            backgroundColor="#ddd"
            arcSweepAngle={180} // Setengah lingkaran
            rotation={-90} // Posisi mulai dari kiri
            lineCap="round"
          />
          {/* Text berada di atas animasi dengan absolute positioning */}
          <View style={styles.textContainer}>
            <Text style={styles.valueText}>{value}</Text>
            <Text style={styles.labelText}>{label}</Text>
          </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  gaugeWrapper: {
    alignItems: "center",
    justifyContent: "center",

  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
  },
  valueText: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
  },
  labelText: {
    fontSize: 16,
    marginTop: 5,
    color: "#666",
  },
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  }
});

export default CardCircular;
