import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { icons } from '../constants';
import LocationMap from './LocationMap';


const RideLayout = ({ children, title, snapPoints }) => {

  
  const confirmRideBottomSheetRef = useRef(null);


  return (
    <GestureHandlerRootView>

      <View className='flex-1 bg-white'>

        <View className='h-screen bg-blue-500'>


            <View className="flex-row absolute z-10 top-16 items-center justify-start px-5">

                <TouchableOpacity 
                    onPress={() => router.back()}   
                >

                    <View className='w-10 h-10 bg-white rounded-full items-center justify-center'>

                        <Image source={icons.backArrow} resizeMode='contain' className='w-6 h-6' />

                    </View>

                </TouchableOpacity>

                <Text className='text-xl font-JakartaSemiBold ml-5'>{ title || 'Go Back' }</Text>

            </View>
            
            <LocationMap />

        </View>

        <BottomSheet 
            ref={confirmRideBottomSheetRef}             
            snapPoints={snapPoints ? snapPoints : ['40%', '85%']} 
            index={0}
        >

            <BottomSheetView style={{ flex: 1, padding: 20 }}>

                { children }

            </BottomSheetView>

        </BottomSheet>

      </View>

    </GestureHandlerRootView>
  )
}


export default RideLayout;