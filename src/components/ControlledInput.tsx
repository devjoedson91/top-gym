import { TextInput, TextInputProps } from "react-native";
import { Control, Controller, FieldError } from "react-hook-form";
import { Error } from "./Error";

type Props = TextInputProps & {
    control: Control<any>;
    name: string;
    error?: FieldError
}

export function ControlledInput({ control, name, error, ...rest }: Props) {

   return (
        <>
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

            {
                error && <Error text={error.message} />
            }

        </>
   );

}