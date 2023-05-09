import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { BasketIcon, DishRow } from '../Components';
import { setRestaurant } from '../features/restaurantSlice';
import { urlFor } from '../sanity';

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
    }} = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }));
    }, []);

    return (
        <>
            <BasketIcon />

            <ScrollView>
            <View className='relative'>
                <Image
                    source={{
                        uri: urlFor(imgUrl).url()
                    }}
                    className='w-full h-56 bg-gray-300 p-4'
                />
                <TouchableOpacity
                    className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
                    onPress={navigation.goBack}
                >
                    <Image 
                        source={require("../Icons/back.png")}
                        className='w-5 h-5'
                    />
                </TouchableOpacity>
            </View>

            <View className='bg-[#fff]'>
                <View className='px-4 pt-4'>
                    <Text className="text-3xl font-bold">{title}</Text>
                    <View className='flex-row space-x-2 my-1'>
                        <View className='flex-row item-center space-x-1'>
                            <Image 
                                source={require("../Icons/staricon.png")}
                                className='h-4 w-4 opacity-50'
                            />
                            <Text className='text-xs text-gray-500'>
                                <Text className='text-green-500'>{rating}</Text> . {genre}
                            </Text>
                        </View>

                        <View className='flex-row item-center space-x-1'>
                            <Image 
                                source={require("../Icons/locationicon.png")}
                                className='h-4 w-4 opacity-40'
                            />
                            <Text className='text-xs text-gray-500'>
                                Nearby . {address}
                            </Text>
                        </View>
                    </View>

                    <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
                </View>

                <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                    <Image 
                        source={require("../Icons/questionmark.png")}
                        className='h-4 w-4 opacity-60'
                    />
                    <Text className='pl-2 flex-1 text-sm font-bold'>
                    Have a food allergy?
                    </Text>
                    <Image 
                        source={require("../Icons/chevron.png")}
                        className='h-5 w-5'
                    />
                </TouchableOpacity>
            </View>

            <View className='pb-36'>
                <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>

                {/* Dishes */}
                {dishes.map(dish =>{
                    return <DishRow
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                    />
                })}
            </View>
        </ScrollView>
        </>
    )
}

export default RestaurantScreen;
