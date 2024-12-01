import { Text, ScrollView, View, Image, Alert } from 'react-native';
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { ReactNativeModal } from 'react-native-modal';
import { Link } from 'expo-router';

import { icons, images } from '../../constants'; 
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import { fetchAPI } from '../../api-hooks.js';


const SignUp = () => {


  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();


  const [ userInputFormValues, setUserInputFormValues ] = useState({
    fullName: '',
    email: '',
    password: ''
  });



  const [ userVerification, setUserVerification ] = useState({
    state: 'default',
    error: '',
    otpVerificationCode: ''
  });


  const [ showSuccessOtpVerificationModal, setShowSuccessotpVerificationModal ] = useState(false);


  const onSignUpUserPress = async () => {

    if (!isLoaded) {

      return;

    }

    try {

      await signUp.create({
        emailAddress: userInputFormValues.email,
        password: userInputFormValues.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setUserVerification({ ...userVerification, state: 'pending' });

    } catch (err) {

      Alert.alert('Error', err.errors[0].longMessage);

    }

  };


  const onPressVerify = async () => {

    if (!isLoaded) {

      return;

    }

    try {

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: userVerification.otpVerificationCode,
      });

      if (completeSignUp.status === 'complete') {

        await fetchAPI(`${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/user`, {
          method: 'POST',
          body: JSON.stringify({
            fullName: userInputFormValues.fullName,
            email: userInputFormValues.email,
            clerkId: completeSignUp.createdUserId
          }),
          // This tells the server that the body of the request is in JSON format. 
          headers: {
            'Content-Type': 'application/json',
          }
        });

        await setActive({ session: completeSignUp.createdSessionId });

        setUserVerification({ ...userVerification, state: 'success' });

      } else {

        setUserVerification({ ...userVerification, state: 'failed', error: 'Verification Failed' });

      }

    } catch (err) {

      setUserVerification({ ...userVerification, state: 'failed', error: err.errors[0].longMessage });

      Alert.alert('Error', err.errors[0].longMessage);

    }

  }


  return (
    <ScrollView className="flex-1 bg-white">

      <View className='bg-white flex-1'>

        <View className='relative w-full h-[250px]'>

          <Image
            source={images.signUpCar}
            className='z-0 w-full h-[250px]'
          />

          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Create your Account</Text>

        </View>

        <View className='p-5'>

          <InputField 
            label='Full Name' 
            placeholder='enter your full name' 
            icon={icons.person}
            value={userInputFormValues.fullName}
            onChangeText={(value) => setUserInputFormValues({...userInputFormValues, fullName: value})}
          />

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
            title='Sign Up'
            onPress={onSignUpUserPress}
            classNames='mt-6 w-full'
          />

          <Link href='/sign-in' className='text-lg text-center text-general-200 mt-10'>

            <Text>Already have an account? </Text>

            <Text className='text-primary-500'>Sign In</Text>

          </Link>

        </View>


        <ReactNativeModal 
          isVisible={userVerification.state === 'pending'}
          onModalHide={() => {

            if (userVerification.state === 'success') {

              setShowSuccessotpVerificationModal(true);

            }

          }}
        >

          <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
            
            <Text className='text-2xl font-JakartaExtraBold mb-2'>Account Verification</Text>

            <Text className='font-Jakarta mb-5'>We've sent a verification code to: {userInputFormValues.email}</Text>

            <InputField 
              label='OTP Code' 
              icon={icons.lock} 
              placeholder='123456' 
              value={userVerification.otpVerificationCode}
              keyboardType='numeric'
              onChangeText={(value) => setUserVerification({ ...userVerification, otpVerificationCode: value })}
            />

            {userVerification.error && (

              <Text className='text-red-500 text-sm mt-1'>{userVerification.error}</Text>

            )}

            <CustomButton 
              title='Verify Email' 
              onPress={onPressVerify} 
              bgVariant='success' 
              classNames='w-full mt-5'
            />

          </View>

        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessOtpVerificationModal}>

          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">

            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />

            <Text className="text-3xl font-JakartaBold text-center">Verified</Text>

            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account
            </Text>

            <CustomButton
              title="Proceed to Home"
              classNames="w-full mt-5"
              onPress={() => {

                setShowSuccessotpVerificationModal(false);

                router.replace('/(root)/(tabs)/home');

              }}
              
            />

          </View>

        </ReactNativeModal>

      </View>

    </ScrollView>
  )
}


export default SignUp;