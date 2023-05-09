import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectRestaurantStore } from '../features/restaurantSlice';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurantStore);

    return (
        <View className='bg-[#00cc88] flex-1'>
        <SafeAreaView className='z-50'>
                <View className='flex-row justify-between items-center p-5'>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Image
                            source={require('../Icons/closewhite.png')}
                            className='h-6 w-6'
                        />
                    </TouchableOpacity>

                    <Text className='font-light text-white text-lg'>Order Help</Text>
            </View>

                <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md overflow-hidden'>
                    <View className='flex-row justify-between'>
                        <View>
                            <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
                            <Text className='text-4xl font-bold'>45-55 Minutes</Text>
                        </View>
                        <Image
                            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9woMqe5NZuw_t6iTNNH5okpvVl9fq84B3Q&usqp=CAU"}}
                            className='h-20 w-20'
                            />
                    </View>
                        <Image
                            source={{uri: "https://user-images.githubusercontent.com/54050160/171843826-044a9f23-6539-4f90-8053-fd34f0794402.gif"}}
                            className='h-2 w-66 -ml-32'
                        />

                        <Text className='mt-3 text-gray-500'>
                            Your order at {restaurant.title} is being prepared
                        </Text>
                </View>
        </SafeAreaView>

        {/* Does not support on web */}
        <MapView
            initialRegion={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            className='flex-1 -mt-10 z-0'
            mapType='mutedStandard'
        >
            <Marker 
                coordinate={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                }}
                title={restaurant.title}
                description={restaurant.short_description}
                identifier="origin"
                pinColor='#00cc88'
            />
        </MapView>

        <SafeAreaView className='bg-white flex-row items-center h-28 space-x-5'>
            <Image 
                source={require('../Icons/face.png')}
                className="h-12 w-12 bg-gray-300 rounded-full ml-5"
            />

                <View className='flex-1'>
                    <Text className='text-lg'>Kingsley KO</Text>
                    <Text className='text-gray-400'>Your Rider</Text>
                </View>

                <Text className='text-[#00cc88] text-lg mr-5 font-bold'>Call</Text>
        </SafeAreaView>
        </View>
    )
  }

export default DeliveryScreen;