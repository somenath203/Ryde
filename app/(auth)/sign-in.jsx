import { Text, ScrollView, View, Image, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';

import { icons, images } from '../../constants'; 
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';


const SignIn = () => {


  const { signIn, setActive, isLoaded } = useSignIn();
  
  const router = useRouter();


  const [ userInputFormValues, setUserInputFormValues ] = useState({
    email: '',
    password: ''
  });



  const onSignInUserPress = useCallback(async () => {

    if (!isLoaded) {

      return;

    }

    try {

      const signInAttempt = await signIn.create({
        identifier: userInputFormValues.email,
        password: userInputFormValues.password,
      });

      if (signInAttempt.status === 'complete') {

        await setActive({ session: signInAttempt.createdSessionId });

        router.replace('/(root)/(tabs)/home');

      } 

    } catch (err) {

      Alert.alert('Error', err.errors[0].longMessage);

    }

  }, [isLoaded, userInputFormValues.email, userInputFormValues.password]);


  return (
    <ScrollView className="flex-1 bg-white">

      <View className='bg-white flex-1'>

        <View className='relative w-full h-[250px]'>

          <Image
            source={images.signUpCar}
            className='z-0 w-full h-[250px]'
          />

          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Welcome Back 👋</Text>

        </View>

        <View className='p-5'>

          <InputField 
            label='Email Address' 
            placeholder='enter your email address' 
            icon={icons.email}
            value={userInputFormValues.email}
            onChangeText={(value) => setUserInputFormValues({...userInputFormValues, email: value})}
          />

          <InputField 
            label='Password' 
            placeholder='enter a password' 
            icon={icons.lock}
            secureTextEntry={true}
            value={userInputFormValues.password}
            onChangeText={(value) => setUserInputFormValues({...userInputFormValues, password: value})}
          />

          <CustomButton
            title='Sign In'
            onPress={onSignInUserPress}
            classNames='mt-6 w-full'
          />

          <Link href='/sign-up' className='text-lg text-center text-general-200 mt-10'>

            <Text>Don't have an account? </Text>

            <Text className='text-primary-500'>Sign Up</Text>

          </Link>

        </View>

      </View>

    </ScrollView>
  )
}


export default SignIn;