import { View, Text, ActivityIndicator, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';

import { images } from '../../../constants';
import RideCard from '../../../components/RideCard';
import { useFetch } from '../../../api-hooks';


const History = () => {


  const { user } = useUser();

  const { data: allRides, loading } = useFetch(`${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/${user.id}`);


  return (
    <SafeAreaView>
      
      <FlatList
        data={allRides} 
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

          <Text className='text-2xl font-JakartaBold my-5'>Ride History</Text>

        )}
      />

    </SafeAreaView>
  )
}


export default History;