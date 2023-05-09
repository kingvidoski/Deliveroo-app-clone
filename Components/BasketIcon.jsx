import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import Currency from 'react-currency-formatter';

const BasketIcon = () =>  {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    if (items.length === 0 ) return null;

    return (
        <View className='absolute bottom-10 w-full z-50'>
            <TouchableOpacity
                className='bg-[#00cc88] mx-5 p-4 rounded-lg flex-row items-center space-x-1'
                onPress={() => navigation.navigate('Basket')}
            >
                <Text className='text-white font-extrabold text-lg bg-[#046142] py-1 px-2'>{items.length}</Text>
                <Text className='flex-1 text-white font-extrabold text-center text-lg'>View Basket</Text>
                <Text className='text-lg text-white font-extrabold'>
                    <Currency
                            quantity={basketTotal}
                            currency="EUR"
                            decimal="."
                        />
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export default BasketIcon;