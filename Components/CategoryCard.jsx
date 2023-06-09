import { Image, Text, TouchableOpacity, View } from 'react-native';

const CategoryCard = ({imgUrl, title}) => {
    return (
        <TouchableOpacity className='relative mr-2'>
            <Image
                source={{uri: imgUrl}}
                className='h-20 w-20 rounded'
            />
            <Text className='absolute bottom-1 text-[#fff] font-bold'>{title}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard

