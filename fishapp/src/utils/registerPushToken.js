// utils/registerPushToken.js
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function getFCMToken() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Izin notifikasi tidak diberikan.");
    return null;
  }

  // Ambil Expo Push Token (untuk Expo workflow)
  const pushToken = await Notifications.getDevicePushTokenAsync();
  const token = pushToken.data;

  console.log("FCM Token:", token);

  return token;
}
