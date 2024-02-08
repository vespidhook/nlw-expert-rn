import { useState, useRef } from 'react';
import { View, FlatList, SectionList, Text } from 'react-native';
import { Header } from '@/components/header';

import { CATEGORIES, MENU } from '@/utils/data/products';
import { CategoryButton } from '@/components/category-button';
import { Product } from '@/components/products';

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList>(null);

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory);

    if(sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }
  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cardQuantityItems={5} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton 
            title={item} 
            isSelected={item === category} 
            onPress={() => handleCategorySelected(item)} />
          )}
        horizontal
        className='max-h-10 mt-5'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => 
          <Product data={item}
            
          />
        }
        renderSectionHeader={({ section: { title } }) => 
          <Text className='text-xl text-white font-heading mt-8 mb-3'>
            {title}
          </Text>
        }
        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 1000}}
      />
    </View>
  );
}