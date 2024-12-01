import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store'

import '../global.css';


SplashScreen.preventAutoHideAsync();


const tokenCache = {

  async getToken(key) {

    try {

      const item = await SecureStore.getItemAsync(key);

      if (item) {

        console.log(`${key} was used 🔐 \n`);

      } else {

        console.log('No values stored under key: ' + key);

      }

      return item;

    } catch (error) {

      console.error('SecureStore get item error: ', error);

      await SecureStore.deleteItemAsync(key);

      return null;

    }

  },

  async saveToken(key, value) {

    try {

      return SecureStore.setItemAsync(key, value);

    } catch (err) {

      return;

    }

  },

}


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;


const Rootlayout = () => {


  const [ loaded ] = useFonts({
    'Jakarta-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'Jakarta-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'Jakarta-ExtraLight': require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
    'Jakarta-Light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    'Jakarta-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'Jakarta-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'Jakarta-SemiBold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  });


  
  if (!publishableKey) {

    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    );

  }


  useEffect(() => {

    if (loaded) {

      SplashScreen.hideAsync();

    }

  }, [loaded]);


  if (!loaded) {

    return null;
    
  }


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>

      <ClerkLoaded>

        <Stack>

          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen name="(root)" options={{ headerShown: false }} />

          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        </Stack>

      </ClerkLoaded>

    </ClerkProvider>
  );

};


export default Rootlayout;



