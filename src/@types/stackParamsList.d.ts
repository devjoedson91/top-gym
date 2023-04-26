type ExerciseDetailProps = {
    id: number | string;
    name: string;
    cover: string;
}

type StackParamList = {
    Home: undefined;
    Details: ExerciseDetailProps;
}