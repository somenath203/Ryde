import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import { onboarding } from '../../constants';
import CustomButton from '../../components/CustomButton';


const Welcome = () => {

  const swiperRef = useRef(null);

  const [ activeSlideIndex, setActiveSlideIndex ] = useState(0);

  const isLastActiveSliderIndex = activeSlideIndex === onboarding.length - 1;
  
  return (
    <SafeAreaView className="h-full bg-white">

      <ScrollView 
        contentContainerStyle={{ height: '100%' }}
        showsVerticalScrollIndicator={false}
      >

        <View className="h-full flex items-center justify-between">

          <TouchableOpacity 
            className='w-full flex items-end justify-end p-5'
            onPress={() => {
              router.replace('/(auth)/sign-up')
            }}
          >

            <Text className='text-black text-md font-JakartaBold'>Skip</Text>

          </TouchableOpacity>


          <Swiper 
            ref={swiperRef}
            loop={false} 
            dot={<View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full' />}
            activeDot={<View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full' />}
            onIndexChanged={(index) => setActiveSlideIndex(index)}
          >

            {onboarding.map((onboardingItem) => (

              <View key={onboardingItem.id} className='items-center justify-center p-5'>
                
                <Image 
                  source={onboardingItem.image}
                  className='w-full h-[378px]'
                  resizeMode='contain'
                />

                <View className='w-full mt-10 flex flex-row items-center justify-center'>

                  <Text className='text-black text-3xl font-bold mx-10 text-center'>
                    {onboardingItem.title}
                  </Text>

                </View>

                <Text className='text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3'>
                  {onboardingItem.description}
                </Text>

              </View>

            ))}

          </Swiper>

          {isLastActiveSliderIndex && (
            <CustomButton 
              title='Get Started' 
              classNames='mt-1 mb-8 w-80'
              onPress={() => router.replace('/(auth)/sign-up')}
            />
          )}

        </View>

      </ScrollView>

    </SafeAreaView>
  )
}


export default Welcome;