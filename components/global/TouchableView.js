import { TouchableWithoutFeedback, Keyboard } from "react-native";

export default function TouchableView({ children }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}
