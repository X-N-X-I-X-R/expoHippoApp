import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { decrement } from '../store/homeReducer';

const DetailsScreen = () => {
  const count = useSelector((state: RootState) => state.home.count);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Details Screen</Text>
      <Text>Count: {count}</Text>
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default DetailsScreen;
