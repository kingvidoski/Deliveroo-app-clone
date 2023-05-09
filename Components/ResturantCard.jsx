import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { urlFor } from '../sanity'


export default function ResturantCard({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}) {
    const navigation = useNavigation();
    return (
    <TouchableOpacity 
        className='bg-white mr-3 shadow'
        onPress={() =>{
            navigation.navigate("Restaurant", {
                id,
                imgUrl,
                title,
                rating,
                genre,
                address,
                short_description,
                dishes,
                long,
                lat})
        }}
    >
        <Image 
            source={{
                uri: urlFor(imgUrl).url()
            }}
            className='h-64 w-64 rounded-sm'
        />
        <View className='px-3 pb-4'>
            <Text className='font-bold text-lg pt-2'>{title}</Text>
            <View className='flex-row items-center space-x-1'>
                <Image 
                    source={require("../Icons/staricon.png")}
                    className='h-4 w-4 opacity-50'
                />
                    <Text className='text-xs text-gray-500'>
                        <Text className='text-green-500'>{rating}</Text> . {genre}
                    </Text>
            </View>
            
            <View className='flex-row items-center space-x-1'>
                <Image 
                    source={require("../Icons/locationicon.png")}
                    className='h-4 w-4 opacity-40'
                />
                <Text 
                    className='text-xs text-gray-500'>
                        Nearby . {address}
                    </Text>
            </View>
        </View>
    </TouchableOpacity>
    )
}

