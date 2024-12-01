import { Alert, View, Image, Text } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import ReactNativeModal from 'react-native-modal';

import { useLocationStore } from '../zustand-store';
import CustomButton from './CustomButton';
import { fetchAPI } from '../api-hooks.js';
import { images } from '../constants';


const PaymentDrive = ({ fullName, email, amount, driverId, rideTime }) => {


  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  
  const { userAddress, userLongitude, userLatitude, destinationLatitude, destinationAddress, destinationLongitude } = useLocationStore();
  
  const { userId } = useAuth();

  const [success, setSuccess] = useState(false);


  const initializePaymentSheet = async () => {
    
    try {
      
      const response = await fetchAPI(`${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName || email.split('@')[0],
          email,
          amount,
        }),
      });

      const { paymentIntent, ephemeralKey, customer } = response;

      if (!paymentIntent || !ephemeralKey || !customer) {

        throw new Error('Failed to initialize PaymentSheet.');

      }


      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey.secret,
        paymentIntentClientSecret: paymentIntent.client_secret,
        defaultBillingDetails: {
          name: fullName,
          email: email
        },
      });

      if (error) {

        throw new Error(`PaymentSheet Initialization Error: ${error.message}`);

      }

    } catch (error) {
      
      Alert.alert('Error', error.message);
    
    }
  };


  const openPaymentSheet = async () => {

    try {

      await initializePaymentSheet();

      const { error } = await presentPaymentSheet();

      if (error) {

        Alert.alert(`Error code: ${error.code}`, error.message);

      } else {

        await fetchAPI(`${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/createnewride`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            origin_address: userAddress,
            destination_address: destinationAddress,
            origin_latitude: userLatitude,
            origin_longitude: userLongitude,
            destination_latitude: destinationLatitude,
            destination_longitude: destinationLongitude,
            ride_time: rideTime.toFixed(0),
            fare_price: parseInt(amount) * 100,
            payment_status: 'paid',
            driver_id: driverId,
            user_id: userId,
          }),
        });

        
        setSuccess(true);

      }

    } catch (error) {

      Alert.alert('Error', error.message);

    }

  };

  return (
    <>

      <CustomButton 
        title='Confirm Ride'
        bgVariant='success' 
        classNames='my-10' 
        onPress={openPaymentSheet}
      />


      <ReactNativeModal 
        isVisible={success} 
        onBackdropPress={() => setSuccess(false)} 
      >

        <View className='items-center justify-center bg-white p-7 rounded-2xl'>

          <Image source={images.check} className='w-28 h-28 mt-5' />

          <Text className='text-2xl text-center font-JakartaBold mt-5'>Booking Placed Succesfully</Text>

          <Text className='text-md text-general-200 font-JakartaMedium text-center mt-3'>
            Thank you for your booking. Your reservation has been placed successfully.
          </Text>

          <CustomButton 
            title='Back Home' 
            onPress={() => {
              setSuccess(false);
              router.push('/(root)/(tabs)/home');
            }}
            classNames='mt-5 w-full'
          />

        </View>

      </ReactNativeModal>

    </>
  )

};


export default PaymentDrive;
