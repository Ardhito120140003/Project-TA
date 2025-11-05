import { View, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { auth } from '../../firebase';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigation.replace("HomeTabs");
      else navigation.replace("Login");
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
