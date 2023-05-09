import React, { Component, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import sanityClient from '../sanity';
import ResturantCard from './ResturantCard';


export default function FeaturedRow({id, title, description}) {
    const [restuarants, setRestaurants] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "featured" && _id == $id]{
                ...,
                restaurant[]->{
                    ...,
                    dishes[]->,
                    type->{name}
                }
                }[0]
        `, { id }).then(data => {
            setRestaurants(data?.restaurant)
        });
    },[id])

    return (
    <View>
        <View className='mt-4 flex-row items-center justify-between px-4'>
            <Text className='font-bold text-lg'>{title}</Text>
            <Image
                source={require("../Icons/right-arrow.png")}
                className='h-5 w-5'
            />
        </View>
        <Text className='text-xs text-gray-500 px-4'>{description}</Text>

        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
            showsHorizontalScrollIndicator={false}
            className='pt-4'
        >
            {/* Resturant Cards */}
            {restuarants?.map(restaurant => {
                return <ResturantCard
                    key={restaurant._id}
                    id={restaurant._id}
                    imgUrl={restaurant.image}
                    title={restaurant.name}
                    rating={restaurant.rating}
                    genre={restaurant.type?.name}
                    address={restaurant.address}
                    short_description={restaurant.short_description}
                    dishes={restaurant.dishes}
                    long={restaurant.long}
                    lat={restaurant.lat}
                />
            })}
        </ScrollView>

    </View>
    )
}

