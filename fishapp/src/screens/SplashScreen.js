import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, Image} from "react-native";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import * as Notifications from "expo-notifications";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    registerForNotifications();

    // Check auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace("HomeTabs");
        } else {
          navigation.replace("Login");
        }
      }, 1200);
    });

    return unsubscribe;
  }, []);

  async function registerForNotifications() {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Notifikasi tidak diizinkan");
        return;
      }

      // Dapatkan token Expo Push
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Push Token:", token);

      // (Opsional) Simpan token ke Database untuk push target user
      // await set(ref(db, `users/${auth.currentUser.uid}/expoToken`), token);

    } catch (error) {
      console.log("Error get token:", error);
    }
  }

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center",backgroundColor:"#007aff" }}>
      <Image
        source={require("../../assets/splash-icon.png")}
        style={{ width: 180, height: 180}}
        resizeMode="contain"
      />
      {/* <Text style={{ fontSize:22, fontWeight:"bold",color:"white" }}>FishApp</Text> */}
      <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#ffffffff"/>
    </View>
  );
}


// import React, { useEffect } from "react";
// import { View, Text, ActivityIndicator, Platform } from "react-native";
// import { auth } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import messaging from "@react-native-firebase/messaging";

// export default function SplashScreen({ navigation }) {
//   useEffect(() => {
//     // Minta izin notifikasi (user Android 13 ke atas wajib)
//     const requestPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       console.log("Notification Permission:", authStatus);
//     };

//     // Ambil FCM Token
//     const getFcmToken = async () => {
//       try {
//         const token = await messaging().getToken();
//         console.log("FCM TOKEN:", token);
//         // ⬇ (Opsional) Simpan token ke database untuk push notification targeted
//         // await set(ref(db, `users/${auth.currentUser.uid}/fcmToken`), token);
//       } catch (error) {
//         console.log("Gagal ambil token:", error);
//       }
//     };

//     requestPermission();
//     getFcmToken();

//     // Check login
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setTimeout(() => {
//         if (user) {
//           navigation.replace("HomeTabs");
//         } else {
//           navigation.replace("Login");
//         }
//       }, 1200);
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
//       <Text style={{ fontSize:22, fontWeight:"bold" }}>FishApp</Text>
//       <ActivityIndicator size="large" style={{ marginTop: 20 }} />
//     </View>
//   );
// }

// import React, { useEffect } from "react";
// import { View, ActivityIndicator, Button } from "react-native";
// import { auth } from "../../firebase"; // pastikan firebase.js ada di folder project

// export default function SplashScreen({ navigation }) {
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) navigation.replace("HomeTabs");
//       else navigation.replace("Login");
//     });
//     return unsubscribe;
//   }, []);

//   // Optional: tombol manual untuk testing navigasi
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ActivityIndicator size="large" />
//       <Button title="Go to HomeTabs" onPress={() => navigation.replace("HomeTabs")} />
//       <Button title="Go to Login" onPress={() => navigation.replace("Login")} />
//     </View>
//   );
// }

//22222222222222222222222222222222222222222222222222222
// screens/SplashScreen.js
// import React, { useEffect } from "react";
// import { View, Text, ActivityIndicator } from "react-native";
// import { auth } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// export default function SplashScreen({ navigation }) {
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setTimeout(() => {
//         if (user) {
//           navigation.replace("HomeTabs");
//         } else {
//           navigation.replace("Login");
//         }
//       }, 1200);
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
//       <Text style={{ fontSize:22, fontWeight:"bold" }}>FishApp</Text>
//       <ActivityIndicator size="large" style={{ marginTop: 20 }} />
//     </View>
//   );
// }


