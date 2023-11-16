import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const CustomFontSize = size => size / fontScale

export default CustomFontSize;