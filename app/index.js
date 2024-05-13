import {  Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View >
        <Text className=" text-3xl" >Hello World</Text>
        <Text className=" text-xl">This is the first page of your app.</Text>
        <Link  className="text-blue-500 text-xl" href={'/profile'}>
          Go to Profile
        </Link>
      </View>
    </View>
  );
}

