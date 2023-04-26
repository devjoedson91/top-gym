type ExerciseDetailProps = {
    id: number | string;
    name: string;
    cover: string;
    video: string | null;
}

type StackParamList = {
    Home: undefined;
    Details: ExerciseDetailProps;
}