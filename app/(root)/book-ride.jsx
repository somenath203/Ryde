import { useUser } from '@clerk/clerk-expo';
import { Image, Text, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';

import RideLayout from '../../components/RideLayout';
import { icons } from '../../constants';
import { formatTime } from '../../helper-functions.js';
import { useDriverStore, useLocationStore } from '../../zustand-store';
import PaymentDrive from '../../components/PaymentDrive.jsx';


const BookRide = () => {


  const { user } = useUser();


  const { userAddress, destinationAddress } = useLocationStore();


  const { listOfDrivers, driverSelectedByUser } = useDriverStore();


  const detailsOfDriverSelectedByUser = listOfDrivers?.filter(
    (driver) => driver.id === driverSelectedByUser
  )[0];



  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.rydesom.com" 
      urlScheme="ryde"
    >
      <RideLayout title="Book Ride" snapPoints={['60%', '85%']}>
        <>

          <Text className="text-xl font-JakartaSemiBold mb-3">
            Ride Information
          </Text>


          <View className="flex flex-col w-full items-center justify-center mt-10">

            <Image
              source={{ uri: detailsOfDriverSelectedByUser?.profile_image_url }}
              className="w-28 h-28 rounded-full"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">

              <Text className="text-lg font-JakartaSemiBold">
                {detailsOfDriverSelectedByUser.title}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">

                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />

                <Text className="text-lg font-JakartaRegular">
                  {detailsOfDriverSelectedByUser.rating}
                </Text>

              </View>

            </View>

          </View>


          <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
           
            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              
              <Text className="text-lg font-JakartaRegular">Ride Price</Text>

              <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                Rs.{detailsOfDriverSelectedByUser?.price}
              </Text>

            </View>


            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              
              <Text className="text-lg font-JakartaRegular">Pickup Time</Text>

              <Text className="text-lg font-JakartaRegular">
                {formatTime(parseInt(`${detailsOfDriverSelectedByUser.time}`) || 5)}
              </Text>

            </View>


            <View className="flex flex-row items-center justify-between w-full py-3">
             
              <Text className="text-lg font-JakartaRegular">Car Seats</Text>

              <Text className="text-lg font-JakartaRegular">
                {detailsOfDriverSelectedByUser.car_seats}
              </Text>

            </View>

          </View>


          <View className="flex flex-col w-full items-start justify-center mt-5">
            
            <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
              
              <Image source={icons.to} className="w-6 h-6" />

              <Text className="text-lg font-JakartaRegular ml-2">
                {userAddress}
              </Text>

            </View>


            <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
              
              <Image source={icons.point} className="w-6 h-6" />

              <Text className="text-lg font-JakartaRegular ml-2">
                {destinationAddress}
              </Text>

            </View>

          </View>


          <PaymentDrive
            fullName={user?.fullName}
            email={user?.emailAddresses[0]?.emailAddress}
            amount={detailsOfDriverSelectedByUser?.price}
            driverId={detailsOfDriverSelectedByUser?.id}
            rideTime={detailsOfDriverSelectedByUser?.time}
          />

        </>

      </RideLayout>

    </StripeProvider>

  );

};


export default BookRide;
