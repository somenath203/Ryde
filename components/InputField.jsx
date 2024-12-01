import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import { useState } from 'react';


const InputField = ({
  labelStyles,
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  secureTextEntry = false,   
  containerStyles,
  inputFieldStyles,
  iconStyles,
  classNames,
  ...props
}) => {


  const [isFocused, setIsFocused] = useState(false);


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View className="my-2 w-full">

            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyles}`}>
                {label}
            </Text>

            <View
                className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border ${isFocused ? 'border-primary-500' : 'border-neutral-100'} focus:border-primary-500 ${containerStyles}`}
            >

                {icon && (

                <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyles}`} />

                )}

                <TextInput
                    className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputFieldStyles} text-left`}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                    {...props}
                />

            </View>

            </View>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default InputField;
