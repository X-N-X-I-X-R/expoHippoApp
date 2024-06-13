import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setMessage } from '../store/introSlice';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Register: undefined;
  Userprofile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;



const IntroScreen = () => {
    const navigation = useNavigation<NavigationProp>();

  const message = useSelector((state: RootState) => state.intro.message);
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);


  

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    scrollDown();
  };

  const scrollDown = () => {
    scrollViewRef.current?.scrollTo({ y: 100 }); // replace 100 with the y-coordinate to which you want to scroll
  };

  const handlePress = () => {
    dispatch(setMessage('Welcome to Hippoputamos!'));
};
  return (
<ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
        <View style={styles.intro}>
        <Text style={styles.header}>Empower Your Investment Journey</Text>
        <Text style={styles.paragraph}>{message}</Text>
        <Text style={styles.paragraph}>Whether you're a seasoned investor or just starting out, we're here to guide you through the maze of market volatility with confidence and expertise.</Text>
        <Text style={styles.paragraph}>Join us and discover how you can turn market unpredictability into opportunity.</Text>
        <Image source={require('../assets/hippo.jpeg')} style={styles.img} resizeMode="contain" />
        <Pressable style={styles.button} onPress={toggleOptions}>
          <Text style={styles.buttonText}>Sign Up Now!</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <Text style={styles.textDecoder}>We are Hippoputamos!</Text>
      </View>
      {showOptions && (
        <View style={styles.sections1}>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Free Membership</Text>
            <Text style={styles.sectionText}>Join our community of investors and gain access to our exclusive resources and tools.</Text>
            <Text style={styles.sectionText}>Our free membership includes:</Text>
            <Text style={styles.sectionText}>Weekly market updates</Text>
            <Text style={styles.sectionText}>Investment guides</Text>
            <Text style={styles.sectionText}>Financial planning tools</Text>
            <Text style={styles.loginRegister}>Not a member yet? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Sign up for free NOW</Text></Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Premium Membership</Text>
            <Text style={styles.sectionText}>Upgrade to our premium membership and unlock a world of investment opportunities.</Text>
            <Text style={styles.sectionText}>Our premium membership includes:</Text>
            <Text style={styles.sectionText}>Personalized investment advice</Text>
            <Text style={styles.sectionText}>Access to our expert analysts</Text>
            <Text style={styles.sectionText}>Exclusive investment opportunities</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
          <View style={styles.hr} />
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Investment Courses</Text>
            <Text style={styles.sectionText}>Enroll in our investment courses and learn how to navigate the financial markets with confidence.</Text>
            <Text style={styles.sectionText}>Our courses include:</Text>
            <Text style={styles.sectionText}>Stock market fundamentals</Text>
            <Text style={styles.sectionText}>Options trading strategies</Text>
            <Text style={styles.sectionText}>Real estate investing</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
          <View style={styles.hr} />
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Technical Analysis Courses</Text>
            <Text style={styles.sectionText}>Master the art of technical analysis and take your trading skills to the next level.</Text>
            <Text style={styles.sectionText}>Our courses include:</Text>
            <Text style={styles.sectionText}>Chart patterns</Text>
            <Text style={styles.sectionText}>Technical indicators</Text>
            <Text style={styles.sectionText}>Candlestick analysis</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  intro: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Cochin',
    color: '#F37748',
  },
  paragraph: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: 'white',
  },
  sections1: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#17D080',
  },
  sectionText: {
    color: 'white',
  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  hr: {
    borderBottomColor: 'pink',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  loginRegister: {
    marginTop: 10,
  },
  link: {
    color: '#067BC2',
    textDecorationLine: 'underline',
  },
  textDecoder: {
    fontSize: 30,
    color: '#8859FF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IntroScreen;