import { Stack } from 'expo-router';


const Rootlayout = () => {

  return (
    <Stack>

      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />

    </Stack>
  );

};


export default Rootlayout;



