import { useAuth, useUser } from '@clerk/clerk-expo';
import { FlatList, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { router } from 'expo-router';

import RideCard from '../../../components/RideCard';
import { icons, images } from '../../../constants';
import GoogleSearchInput from '../../../components/GoogleSearchInput';
import LocationMap from '../../../components/LocationMap';
import { useLocationStore } from '../../../zustand-store';
import { useFetch } from '../../../api-hooks';


const Home = () => {

  const { user } = useUser();

  const { signOut } = useAuth();

  
  const { data: recentRides, loading } = useFetch(`${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/${user.id}`);


  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const [ hasLocationPermissions, setHasLocationPermissions ] = useState(false);


  const handleSignOutUser = () => {

    signOut();

    router.replace('/(auth)/sign-in');

  }


  const handleSearchedDestinationPress = (location) => {

    setDestinationLocation(location); 

    router.push('/(root)/find-ride');

  };


  useEffect(() => {


    const requestForLocationPermission = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {

        setHasLocationPermissions(false);

        return;

      }


      let location = await Location.getCurrentPositionAsync();


      const userCurrentLocationAddress = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude
      });


      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${userCurrentLocationAddress[0].name}, ${userCurrentLocationAddress[0].region}`
      });


    }

    requestForLocationPermission();

  }, []);


  return (
    <SafeAreaView className="bg-general-500">

      <FlatList
        data={recentRides?.slice(0, 5)} 
        renderItem={({ item }) => <RideCard ride={item} />}
        className='px-5'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          paddingTop: 25,
          paddingBottom: 130 
        }}
        ListEmptyComponent={() => (
          <View className='flex flex-col items-center justify-center'>

            {!loading ? (

              <>

                <Image 
                  source={images.noResult} 
                  className='w-40 h-40' 
                  alt='no recent rides found' 
                  resizeMode='contain'
                />

                <Text className='text-sm'>No recent result found</Text>

              </>
            
            ) : (

              <>

                <ActivityIndicator size='small' color='#000' />

              </>

            )}

          </View>
        )}
        ListHeaderComponent={() => (
          <>

            <View className='items-start gap-2 my-5'>

              <Text className='text-lg font-JakartaExtraBold capitalize'> Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0]} 👋 </Text>

              <TouchableOpacity onPress={handleSignOutUser} className='justify-center items-center w-10 h-10 rounded-full bg-white'>

                <Image source={icons.out} className='w-4 h-4' />

              </TouchableOpacity>

            </View>

            <GoogleSearchInput 
              icon={icons.search} 
              containerStyle='bg-white shadow-md shadow-neutral-300'
              handlePress={handleSearchedDestinationPress}
            />

            <>
              <Text className='text-xl font-JakartaBold mt-5 mb-3'>
                Your Current Location
              </Text>

              <View className='flex-row items-center bg-transparent h-[300px]'>

                <LocationMap />
                
              </View>

            </>

            <Text className='text-xl font-JakartaBold mt-5 mb-3'>
                Recent Rides
            </Text>

          </>
        )}
      />

    </SafeAreaView>
  );

};


export default Home;
