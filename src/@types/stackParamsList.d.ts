// type ExerciseDetailProps = {
//     id: number;
//     name: string;
//     cover: string;
//     video: string | null;
//     category: string | undefined;
// }

type ExerciseDetailProps = {
    id: string;
    name: string;
    cover: string;
    video: string;
    categories: {
        muscle: string;
    };
}

type StackParamList = {
    Home: undefined;
    Details: ExerciseDetailProps;
}