import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';
import { urlFor } from '../sanity';

const blueMinus = "../Icons/minus.png";
const bluePlus = "../Icons/plus.png";
const grayMinus = "../Icons/grayminus.png";
const grayPlus = "../Icons/grayplus.png";


const DishRow = ({id, name, description, price, image}) => {
    const [isPress, setIsPress] = useState(false);
    const items = useSelector(state => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();
    
    const addItem = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    }

    const removeItem = () => {
        if (!items.length > 0) return;

        dispatch(removeFromBasket({id}))
    }

    return (
        <>
            <TouchableOpacity
                className={`bg-white border p-4 border-gray-200 ${isPress && "border-b-0"}`}
                onPress={() => setIsPress(!isPress)}
            >
            <View className='flex-row'>
                <View className='flex-1 pr-2'>
                    <Text className='text-lg mb-1'>{name}</Text>
                    <Text className='text-gray-400'>{description}</Text>
                    <Text className='text-gray-400 mt-2'>
                        <Currency
                            quantity={price}
                            currency="EUR"
                            decimal="."
                        />
                    </Text>
                </View>
                <View>
                    <Image
                        style={{
                            borderWidth: 1,
                            borderColor: "#f3f3f4",
                        }}
                        source={{uri: urlFor(image).url()}}
                        className='h-20 w-20 bg-gray-300 p-4'
                    />
                </View>
            </View>
        </TouchableOpacity>
        
        {isPress && 
            <View className='bg-white px-4 -mt-1'>
                <View className='flex-row items-center space-x-2 pb-3'>
                    <TouchableOpacity onPress={removeItem} disabled={!items.length}>
                        <Image
                        source={require(blueMinus)}
                        className='h-7 w-7'
                    />
                    
                    </TouchableOpacity>

                    <Text className='px-2 font-bold'>{items.length}</Text>
                    
                    <TouchableOpacity onPress={addItem}>
                        <Image
                        source={require(bluePlus)}
                        className='h-7 w-7' 
                    />
                    </TouchableOpacity>
                </View>
            </View>
        }
    </>
    )
}

export default DishRow;
