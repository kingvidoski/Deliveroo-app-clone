import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Categories, FeaturedRow } from "../Components";
import SanityClient from '../sanity';




export default function HomeScreen() {
    const navigation = useNavigation();
    const [featuredCategory, setFeaturedCategory] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
        SanityClient.fetch(`
            *[_type == "featured"]{
                ...,
                restaurant[]->{
                    ...,
                    dishes[]->,
                }
            }
        `).then(data => {
            // console.log(data)
            setFeaturedCategory(data)
        })
    }, []);

    return (
        <SafeAreaView className='bg-white pt-5'>
            <View className='flex-row pb-3 items-center mx-2 space-x-2'>
                <Image
                    source={{
                        uri: "https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr"
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <View className='flex-1'>
                    <Text className='font-bold text-gray-400 text-xs'>
                        Deliver Now</Text>
                    <Text className='font-bold text-xl'>
                        Current Location
                        <Image source={require('../Icons/chevron.png')} className="h-5 w-5" />

                    </Text>
                </View>
                <Image
                    source={require('../Icons/user.jpg')}
                    className="h-8 w-8"
                />
            </View>


            {/* Search Box */}
            <View className='flex-row items-center space-x-2 pb-2 mx-2'>
                <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
                    <Image
                        source={require('../Icons/search.png')}
                        className='h-6 w-6 mt-1'
                    />
                    <TextInput
                        placeholder='Restuarant and cuisines'
                        keyboardType='default'
                    />
                </View>
                <Image
                    source={require("../Icons/adjustment.png")}
                    className='h-5 w-5'
                />
            </View>

            <ScrollView
                className='bg-gray-100'
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {/* Categories */}
                <Categories />

                {/* Featured Rows */}
                {featuredCategory?.map(category => {
                    return <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                })}
            </ScrollView>

        </SafeAreaView>
    )
}
