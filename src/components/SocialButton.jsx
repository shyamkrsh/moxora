import { Pressable, Text } from "react-native";

const SocialButton = ({ icon, title, bgColor, onPress }) => (
  <Pressable
    onPress={onPress}
    className={`flex-row items-center justify-center py-3 rounded-xl shadow-md mb-4 ${bgColor}`}
  >
    {icon}
    <Text className="text-white font-semibold text-lg ml-3">{title}</Text>
  </Pressable>
);

export default SocialButton