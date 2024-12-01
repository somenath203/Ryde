import { View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps'; 
import { useEffect, useState } from 'react';
import MapViewDirections from 'react-native-maps-directions';

import { useDriverStore, useLocationStore } from '../zustand-store';
import { calculateRegion, generateMarkersFromData, calculateDriverTimes } from '../maps-helper-functions';
import { icons } from '../constants';
import { useFetch } from '../api-hooks.js';


const LocationMap = () => {


  const { data: allDriversFromDB, loading, error: allDriversLoadErrorFromDB } = useFetch(`${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/driver`);

 
  const { userLongitude, userLatitude, destinationLongitude, destinationLatitude } = useLocationStore();

  const { driverSelectedByUser, setAllDrivers } = useDriverStore();

  const [ driverMarkers, setDriverMarkers ] = useState([]);

  
  const region = calculateRegion({
    userLatitude: userLatitude,
    userLongitude: userLongitude,
    destinationLatitude: destinationLatitude,
    destinationLongitude: destinationLongitude
  });


  useEffect(() => {

    if (Array.isArray(allDriversFromDB)) {

      if (!userLatitude || !userLongitude) {

        return;

      }

      const newDriverMarkersOnTheMap = generateMarkersFromData({ 
        data: allDriversFromDB, 
        userLatitude: userLatitude, 
        userLongitude: userLongitude 
      });

      setDriverMarkers(newDriverMarkersOnTheMap);

    }

  }, [allDriversFromDB, userLatitude, userLongitude]);


  useEffect(() => {

    if (driverMarkers.length > 0 && destinationLatitude && destinationLongitude) {

      calculateDriverTimes({
        markers: driverMarkers,
        userLatitude: userLatitude,
        userLongitude: userLongitude,
        destinationLatitude: destinationLatitude,
        destinationLongitude: destinationLongitude,
      }).then((drivers) => {

        setAllDrivers(drivers);

      });

    }

  }, [driverMarkers, userLongitude, userLatitude, destinationLongitude, destinationLatitude]);


  if (loading || (!userLatitude || !userLongitude)) {

    return (
      <View className='w-full flex items-center justify-center'>

        <ActivityIndicator size='small' color='#000' />

      </View>
    )

  }


  
  if (allDriversLoadErrorFromDB) {

    return (
      <View className='w-full flex items-center justify-center'>

        <Text>Error: {allDriversLoadErrorFromDB}</Text>

      </View>
    )

  }

  return (
    <View style={{ width: '100%', height: '100%', borderRadius: 20 }}>

      <MapView
        provider={PROVIDER_DEFAULT}
        tintColor='black'
        mapType='standard'
        showsPointsOfInterest={false}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle='light'
        style={{ width: '100%', height: '100%', borderRadius: 20 }}
      >
        {driverMarkers.map((driverMarker) => (

          <Marker
            key={driverMarker.id}
            coordinate={{
              latitude: driverMarker.latitude,
              longitude: driverMarker.longitude
            }}
            title={driverMarker.title}
            image={driverSelectedByUser === driverMarker.id ? icons.selectedMarker : icons.marker}
          />

        ))}

        {/* marker that marks the destination where user wants to go */}
        {destinationLatitude && destinationLongitude && (
          <>

            <Marker
              key='destination'
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude
              }}
              title='Destination'
              image={icons.pin}
            />

             {/* it will display the whole path in the form of blue line from user's current location till
                 destination */}
            <MapViewDirections
              origin={{
                latitude: userLatitude,
                longitude: userLongitude
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude
              }}
              apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
              strokeColor='#0286ff'
              strokeWidth={6}
            />

          </>
        )}
        
      </MapView>

    </View>
  );

};

export default LocationMap;

