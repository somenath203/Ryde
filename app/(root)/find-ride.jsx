import { View, Text } from 'react-native';
import { router } from 'expo-router';

import { useLocationStore } from '../../zustand-store/index';
import RideLayout from '../../components/RideLayout';
import GoogleSearchInput from '../../components/GoogleSearchInput';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
 

const FindRide = () => {

  const { userAddress, setUserLocation, destinationAddress, setDestinationLocation } = useLocationStore();
  
  return (
    <RideLayout title='Ride' snapPoints={['60%', '85%']}>

      <View className='my-3'>

        <Text className='text-lg font-JakartaSemiBold mb-3'>From</Text>

        <GoogleSearchInput 
          icon={icons.target} 
          initialLocation={userAddress} 
          containerStyle='bg-neutral-100'
          textInputBackgroundColor='#f5f5f5'
          handlePress={(location) => setUserLocation(location)}
        />

      </View>

      <View className='my-3'>

        <Text className='text-lg font-JakartaSemiBold mb-3'>To</Text>

        <GoogleSearchInput 
          icon={icons.map} 
          initialLocation={destinationAddress} 
          containerStyle='bg-neutral-100'
          textInputBackgroundColor='transparent'
          handlePress={(location) => setDestinationLocation(location)}
        />

      </View>


      <CustomButton 
        title='Find Now' 
        onPress={() => router.push('/(root)/confirm-ride')} 
        classNames='mt-5'
      />


    </RideLayout>
  )
}


export default FindRide;