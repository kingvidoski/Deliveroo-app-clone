import { useNavigation } from '@react-navigation/native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestaurantStore } from '../features/restaurantSlice';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
    const [groupItemsBasket, setGroupItemsBasket] = useState([]);
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurantStore);
    const total = useSelector(selectBasketTotal);
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();

    useMemo(() => {
        const groupItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupItemsBasket(groupItems);
    }, [items]);

    const handlePrepNavigatio = () => {
        navigation.navigate("PrepScreen");
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 bg-gray-100'>
                <View className=' p-5 border-b border-[#00cc88] bg-white shadow-sm'>
                    <View>
                        <Text className='text-lg font-bold text-center'>Basket</Text>
                        <Text className='text-center text-gray-400'>{restaurant.title }</Text>
                    </View>

                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className='rounded-full bg-gray-300 absolute top-3 right-5'
                    >
                        <Image
                            source={require("../Icons/close.png")} 
                            className='h-8 w-8 rounded-full'
                        />
                    </TouchableOpacity>
                </View>

                <View className='flex-row itwms-center space-x-4 px-4 py-3 bg-white my-5'>
                    <Image
                        source={{

                        }}
                        className='w-7 h-7 bg-gray-300 p-4 rounded-full'
                    />
                    <Text className=''>Deliver in 50-75 mins</Text>
                    <TouchableOpacity>
                        <Text className='text-[#00cc88]'>Change</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className='divide-y divide-gray-200'>
                    {Object.entries(groupItemsBasket).map(([key, items]) => {
                        return <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                            <Text className='text-[#00cc88]'>{items.length} x</Text>
                            <Image
                                source={{uri: urlFor(items[0]?.image).url()}}
                                className='h-12 w-12 rounded-full'
                            />
                            <Text className='flex-1'>{items[0]?.name}</Text>

                            <Text className='text-gray-600'>
                                <Currency quantity={items[0]?.price} currency="EUR" decimal="." />
                            </Text>

                            <TouchableOpacity>
                                <Text
                                    className='text-[#00cc88] text-xs'
                                    onPress={() => dispatch(removeFromBasket({id: key}))}
                                >
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    })}
                </ScrollView>

                <View className='p-5 bg-white mt-5 space-y-4'>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Subtotal</Text>
                        <Text className='text-gray-400'>
                            <Currency quantity={total} currency="EUR" decimal="." />
                        </Text>
                    </View>

                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Delivery fee</Text>
                        <Text className='text-gray-400'>
                            <Currency quantity={5.99} currency="EUR" decimal="." />
                        </Text>
                    </View>

                    <View className='flex-row justify-between'>
                        <Text>Order Total</Text>
                        <Text className='font-extrabold'>
                            <Currency quantity={total + 5.99} currency="EUR" decimal="." />
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={handlePrepNavigatio}
                        className='rounded-lg bg-[#00cc88] p-4'>
                        <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen;
