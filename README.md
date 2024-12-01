# Car Booking Mobile Application

## Demo video of the overall application

![picture_ryde_project](https://github.com/user-attachments/assets/2b210c13-02a3-4bf8-82d4-210d7ea802d8)

https://www.youtube.com/watch?v=lbGS07Fiw2c

---

## Introduction  
This is a user-friendly online car booking mobile application built using React Native. The app provides an easy and efficient way to book rides. It allows users to authenticate, view their current location, search for destinations, choose a driver, and make secure payments for their rides. The app is designed to deliver a seamless and reliable ride-booking experience.

---

## Features of the Application  
- **Authentication**: Users sign in or sign up using Clerk for secure authentication.  
- **Location Access**: After authentication, users can grant location permission to view their current location on a map.  
- **Interactive Map**: The app displays the user's location on a map with markers for available drivers nearby.  
- **Search Functionality**: Users can search for destinations using the Google API-powered search box.  
- **Route Display**: A route is displayed with a blue line connecting the current location (To Location) and the destination (From Location).  
- **Driver Details**: Users can view driver details, including name, rating, fare, estimated time to reach the destination, and profile picture.  
- **Ride Booking**: Users select a driver and proceed to the booking screen to confirm and pay for the ride.  
- **Payment Integration**: The app uses Stripe for secure payment processing. Users can confirm their ride by entering credit card details.  
- **Booking History**: Users can view all previous rides in the history section or check recent rides (latest 5 bookings) on the home screen.  

---

## Technologies Used  
- **Frontend Framework**: React Native  
- **Development Tool**: Expo  
- **Authentication**: Clerk  
- **Location Services**: Expo-location  
- **Styling**: NativeWind  
- **Search Box**: react-native-google-places-autocomplete (powered by Google Maps API)  
- **Map Display**: react-native-maps  
- **Route Directions**: react-native-maps-directions (powered by Google Directions API)
- **Google Places API**: Retrieves location data.
- **Google Directions API**: Fetches routes and directions.
- **Payment Processing**: Stripe  
- **State Management**: Zustand  
- **Geocoding API**: GEOAPIFY_API  
- **Database**: Neon PostgreSQL (for user, driver, and ride details)  
