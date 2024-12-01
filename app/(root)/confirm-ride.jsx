import { View, FlatList } from 'react-native';
import { router } from 'expo-router';

import RideLayout from '../../components/RideLayout';
import DriverCard from '../../components/DriverCard';
import CustomButton from '../../components/CustomButton';
import { useDriverStore } from '../../zustand-store';


const ConfirmRide = () => {


  const { listOfDrivers, driverSelectedByUser, setSelectedDriverByUser } = useDriverStore();

  
  return (
    <RideLayout title='Choose a Driver' snapPoints={['65%', '85%']}>
      
      <FlatList
        data={listOfDrivers}
        renderItem={({ item }) => (

          <DriverCard 
            driverDetail={item}
            selected={driverSelectedByUser}
            setSelected={() => setSelectedDriverByUser(item.id)}
          />

        )}
        ListFooterComponent={() => (

          <View className='mx-5 mt-10'>

            <CustomButton title='Select Ride' onPress={() => router.push('/(root)/book-ride')} />

          </View>

        )}
      />

    </RideLayout>
  )
}


export default ConfirmRide;