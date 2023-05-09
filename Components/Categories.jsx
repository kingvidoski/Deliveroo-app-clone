import { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import SanityClient, { urlFor } from '../sanity';
import CategoryCard from "./CategoryCard";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        SanityClient.fetch(`
            *[_type == "category"]
        `).then(data => {
            setCategories(data)
        });
    },[])

    return (
        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            showsHorizontalScrollIndicator={false}
        >
            
            {categories.map((category) => {
                return <CategoryCard
                    key={category._id}
                    imgUrl={urlFor(category.image).width(200).url()}
                    title={category.name}
                />
            })}
        </ScrollView>
    )
}


export default Categories;
