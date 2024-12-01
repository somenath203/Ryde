
import { Tabs } from 'expo-router';
import { Image, View } from 'react-native';

import { icons } from '../../../constants';


const TabIcon = ({ focused, source }) => {
  return (
    <View className={`flex flex-row justify-center items-center rounded-full ${focused ? 'bg-general-300' : ''}`}>

      <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? 'bg-general-400' : ''}`}>

        <Image source={source} tintColor='white' resizeMode='contain' className='w-7 h-7' />

      </View>

    </View>
  )
}


const Rootlayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInActiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333',
          borderRadius: 50,
          paddingBottom: 0,
          overflow: 'hidden',
          marginHorizontal: 20, 
          height: 78,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute', 
          bottom: 20 
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => {

            return <TabIcon focused={focused} source={icons.home} />

          }
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerShown: false,
          tabBarIcon: ({ focused }) => {

            return <TabIcon focused={focused} source={icons.list} />
            
          }
        }}
      />      

    </Tabs>
  );
};


export default Rootlayout;