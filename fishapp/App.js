// App.js
import React, { useEffect } from "react";
// import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {

  // useEffect(() => {
  //   registerForPushNotifications();
  // }, []);

  // async function registerForPushNotifications() {
  //   try {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Izin notifikasi ditolak.");
  //       return;
  //     }

  //     const token = await Notifications.getDevicePushTokenAsync();
  //     console.log("FCM TOKEN:", token.data);
  //   } catch (error) {
  //     console.log("FCM Error:", error);
  //   }
  // }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

// // App.js
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/navigation/AppNavigator";

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// }
