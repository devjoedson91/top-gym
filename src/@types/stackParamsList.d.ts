type ExerciseDetailProps = {
    id: number;
    name: string;
    cover: string;
    video: string | null;
    category: string | undefined;
}

type StackParamList = {
    Home: undefined;
    Details: ExerciseDetailProps;
}