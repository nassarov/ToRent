import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Filter = () => {
  const [filters, setFilters] = useState({
    brands: [],
    modelYear: '',
    priceRange: '',
    color: '',
    vehicleCondition: '',
    numberOfSeats: '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.nativeEvent;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      modelYear: '',
      priceRange: '',
      color: '',
      vehicleCondition: '',
      numberOfSeats: '',
    });
  };

  return (
    <View className='flex flex-col mb-4'>
      <Text className='text-xl font-bold mb-2'>Filter</Text>
      <View className={('mb-2')}>
        <Text className={('block mb-1 text-sm font-medium')}>Brands</Text>
        <Picker
          selectedValue={filters.brands}
          className={('w-full border rounded-md px-2 py-1 focus:outline-none')}
          onValueChange={handleFilterChange}
          mode="dropdown"
        >
          <Picker.Item label="Brand 1" value="brand1" />
          <Picker.Item label="Brand 2" value="brand2" />
          <Picker.Item label="Brand 3" value="brand3" />
        </Picker>
        </View>
      {/* Other filter options would be implemented here */}
      <View className={('flex mt-4')}>
        <Button title="Clear all" onPress={clearFilters} />
        <Button title="Apply" className={('ml-4')} />
      </View>
    </View>
  );
};

export default Filter;
