import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { increment } from '../store/homeReducer';

const HomeScreen = ({ navigation }) => {
  const count = useSelector((state: RootState) => state.home.count);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;
