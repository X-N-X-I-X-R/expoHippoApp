import React, { useState, useEffect } from 'react';   

import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, fetchUserProfile, UserProfile } from '../store/userSlice';
import { RootState, AppDispatch, selectProfile } from '../store';
import { FontAwesome as Icon } from '@expo/vector-icons';import Toast from 'react-native-toast-message';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, ActivityIndicator,Image } from 'react-native';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
type FormData = Partial<UserProfile>;



const UserProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector(selectProfile);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


interface ImagePickerResponse {
  didCancel?: boolean;
  error?: string;
  customButton?: string;
  data?: string;
  uri?: string;
  origURL?: string;
  isVertical?: boolean;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  path?: string;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
}

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserProfile())
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
        console.log(userProfile.user_profile_image); // Add this line




      setFormData({
        user_profile_image: userProfile.user_profile_image || '', // Add this line
        user_nickname: userProfile.user_nickname || '',
        user_gender: userProfile.user_gender || '',
        user_country: userProfile.user_country || '',
        user_phone: userProfile.user_phone || '',
        user_birth_date: userProfile.user_birth_date || '',
        user_bio: userProfile.user_bio || '',
        user_website: userProfile.user_website || '',
        // Populate other fields as needed
      });
    }
  }, [userProfile]);
const selectImage = () => {
  launchImageLibrary({
    mediaType: 'video'
  }, (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.uri) {
      setSelectedImage(response.uri);
    }
  });
};


  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const handleSubmit = async () => { // Add async here
  setLoading(true);
  if (isUserProfile(formData)) {
    if (userProfile) {
      // Create a new FormData instance
      let data = new FormData();
      // Append all fields to data
      for (let key in formData) {
        if (formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      }
      // If an image has been selected, append it to data
      if (selectedImage) {
        const blob = await fetch(selectedImage).then(r => r.blob()); // This line uses await
        data.append('user_profile_image', blob, 'user_profile_image.jpg');
      }

      dispatch(updateUserProfile(data)) // Send data instead of updatedProfile
        .unwrap()
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Profile Updated',
            text2: 'Your profile has been successfully updated.',
          });
          setLoading(false);
        })
        .catch((error) => {
          setErrors(error);
          Toast.show({
            type: 'error',
            text1: 'Update Failed',
            text2: 'There was an error updating your profile.',
          });
          setLoading(false);
        });
    } else {
      // Handle the case where userProfile is null
      setErrors({
        ...errors,
        form: 'User profile not loaded',
      });
      setLoading(false);
    }
  } else {
    // Handle the case where formData is not a UserProfile
    setErrors({
      ...errors,
      form: 'Invalid form data',
    });
    setLoading(false);
  }
};
function isUserProfile(data: FormData): data is UserProfile {
  return (
    'user_profile_image' in data &&
    'user_nickname' in data &&
    'user_gender' in data &&
    'user_country' in data &&
    'user_phone' in data &&
    'user_birth_date' in data &&
    'user_bio' in data &&
    'user_website' in data
  );
}

  const renderIcon = (field: keyof UserProfile) => {
    return formData[field] && formData[field] === userProfile?.[field] ? (
      <Icon name="check" size={20} color="green" style={styles.icon} />
    ) : null;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      
      <Text style={styles.info}>You can update your profile information below. Fields with the original data are marked with a check icon.</Text>

      {Object.keys(errors).length > 0 && (
        <View style={styles.errorContainer}>
          {Object.values(errors).map((error, index) => (
            <Text key={index} style={styles.errorText}>{error}</Text>
          ))}
        </View>
      )}

<Image
  tintColor='blue' 
  source={{ uri: `http://localhost${formData.user_profile_image}` }}  
/>




      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nickname"
          value={formData.user_nickname}
          onChangeText={(value: string) => handleChange('user_nickname', value)}
        />
        {renderIcon('user_nickname')}
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={formData.user_gender}
          onChangeText={(value: string) => handleChange('user_gender', value)}
        />
        {renderIcon('user_gender')}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={formData.user_country}
          onChangeText={(value: string) => handleChange('user_country', value)}
        />
        {renderIcon('user_country')}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={formData.user_phone}
          onChangeText={(value: string) => handleChange('user_phone', value)}
        />
        {renderIcon('user_phone')}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Birth Date"
          value={formData.user_birth_date}
          onChangeText={(value: string) => handleChange('user_birth_date', value)}
        />
        {renderIcon('user_birth_date')}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={formData.user_bio}
          onChangeText={(value: string) => handleChange('user_bio', value)}
        />
        {renderIcon('user_bio')}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Website"
          value={formData.user_website}
          onChangeText={(value: string) => handleChange('user_website', value)}
        />
        {renderIcon('user_website')}
      </View>
        <Pressable onPress={selectImage}>
        <Text>Select Image</Text>
      </Pressable>
            <Image source={selectedImage ? { uri: selectedImage } : undefined} />

<Pressable 
  style={{ pointerEvents: loading ? 'none' : 'auto' }} 
  role="button" 
  aria-label="Update Profile" 
  onPress={handleSubmit}
>
  <Text style={styles.buttonText}>Update Profile</Text>
</Pressable>

           <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  info: {
    marginBottom: 20,
    color: '#666',
  },
  errorContainer: {
    marginBottom: 20,
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#721c24',
  },
    profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProfileScreen;