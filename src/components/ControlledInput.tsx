import { TextInput, TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

type Props = TextInputProps & {
    control: Control<any>
    name: string
}

export function ControlledInput({ control, name, ...rest }: Props) {

   return (
        <Controller 
            name={name}
            control={control}
            render={({field: { onChange, value }}) => (
                <TextInput 
                    onChangeText={onChange}
                    value={value}
                    {...rest}
                />
            )}
        />  
        
   );

}