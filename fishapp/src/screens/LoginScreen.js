import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, ref, set } from "../../firebase";
import { getFCMToken } from "../utils/registerPushToken";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(() => navigation.replace("HomeTabs"))
  //     .catch((error) => alert(error.message));
  // };
  
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;

        // Ambil FCM Token
        const token = await getFCMToken();
        if (token) {
          // Simpan token ke Firebase
          await set(ref(db, `users/${uid}/fcmToken`), token);
          console.log("FCM Token disimpan:", token);
        } else {
          console.log("Gagal mendapatkan FCM Token");
        }

        navigation.replace("HomeTabs");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/splash-icon.png")}
          style={styles.logo}
        />
      </View>

      {/* LOGIN CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007aff",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingBottom: 100
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    color: "#000",
  },

  button: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});



// import React, { useState } from "react";
// import { View, TextInput, Button, Text, Alert } from "react-native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       console.log("LOGIN BERHASIL:", userCredential.user.email);
//       navigation.replace("HomeTabs");
//     })
//     .catch((err) => {
//       console.log("LOGIN ERROR:", err);
//       Alert.alert("Login gagal", err.message);
//     });
// };

//   return (
//     <View style={{ flex:1, justifyContent:"center", padding: 20 }}>
//       <Text style={{ fontSize:22, textAlign:"center", marginBottom:30 }}>Login</Text>

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={{ borderWidth:1, padding:10, marginBottom:15, borderRadius:5 }}
//       />

//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={{ borderWidth:1, padding:10, borderRadius:5, marginBottom:20 }}
//       />

//       <Button title="Login" onPress={handleLogin}/>
//     </View>
//   );
// }

// import React from "react";
// import { View, Text, Button } from "react-native";

// export default function LoginScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Login Screen</Text>
//       <Button title="Login (Go to HomeTabs)" onPress={() => navigation.replace("HomeTabs")} />
//     </View>
//   );
// }

// screens/LoginScreen.js
