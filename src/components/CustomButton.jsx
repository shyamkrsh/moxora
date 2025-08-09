import { Pressable, Text } from "react-native";

const CustomButton = ({ title, onPress }) => (
  <Pressable
    onPress={onPress}
    className="bg-pink-500 py-4 rounded-full shadow-lg active:opacity-80"
  >
    <Text className="text-white text-lg font-semibold text-center">{title}</Text>
  </Pressable>
);

export default CustomButton