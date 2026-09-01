//HomeTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AeratorScreen from "../screens/AeratorScreen";
import FeedScreen from "../screens/FeedScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007aff",   // Biru saat aktif
        tabBarInactiveTintColor: "#999",    // Abu saat tidak aktif
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings-outline" size={26} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="Aerator" component={AeratorScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="water-outline" size={size} color={color} />
          ),
        }}/>
      <Tab.Screen name="Pakan Ikan" component={FeedScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="reader-outline" size={size} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Button } from "react-native";
// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase";

// import AeratorScreen from "../screens/AeratorScreen";
// import FeedScreen from "../screens/FeedScreen";

// const Tab = createBottomTabNavigator();

// export default function HomeTabs({ navigation }) {
//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       navigation.replace("Login");
//     });
//   };

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerRight: () => (
//           <Button title="Logout" onPress={handleLogout} />
//         ),
//       }}
//     >
//       <Tab.Screen name="Aerator" component={AeratorScreen} />
//       <Tab.Screen name="Pakan Ikan" component={FeedScreen} />
//     </Tab.Navigator>
//   );
// }
