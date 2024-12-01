import {Image, Text, TouchableOpacity, View} from "react-native";

import { icons } from '../constants';
import { formatTime } from '../helper-functions';


const DriverCard = ({driverDetail, selected, setSelected}) => {


    return (
        <TouchableOpacity
            onPress={setSelected}
            className={`${selected === driverDetail.id ? "bg-general-600" : "bg-white"} flex flex-row driverDetails-center justify-between py-5 px-3 rounded-xl`}
        >

            <Image
                source={{uri: driverDetail.profile_image_url}}
                className="w-14 h-14 rounded-full"
            />

            <View className="flex-1 flex flex-col driverDetails-start justify-center mx-3">


                <View className="flex flex-row driverDetails-center justify-start mb-1">

                    <Text className="text-lg font-JakartaRegular">{driverDetail.title}</Text>

                    <View className="flex flex-row driverDetails-center space-x-1 ml-2">

                        <Image source={icons.star} className="w-3.5 h-3.5"/>

                        <Text className="text-sm font-JakartaRegular">4</Text>

                    </View>

                </View>


                <View className="flex flex-row driverDetails-center justify-start">

                    <View className="flex flex-row driverDetails-center">

                        <Image source={icons.dollar} className="w-4 h-4"/>

                        <Text className="text-sm font-JakartaRegular ml-1">
                            Rs.{driverDetail.price}
                        </Text>

                    </View>


                    <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
                        |
                    </Text>

                    <Text className="text-sm font-JakartaRegular text-general-800">
                        {formatTime(parseInt(`${driverDetail.time}`) || 5)}
                    </Text>

                    <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
                        |
                    </Text>

                    <Text className="text-sm font-JakartaRegular text-general-800">
                        {driverDetail.car_seats} seats
                    </Text>

                </View>

            </View>


            <Image
                source={{uri: driverDetail.car_image_url}}
                className="h-14 w-14"
                resizeMode="contain"
            />

        </TouchableOpacity>

    );

};


export default DriverCard;