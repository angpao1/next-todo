import { useAuth } from './useAuth';
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "@/grahpql/auth-queries";

export const useTasks = () => {
    const userId = useAuth();

    const { loading, error, data } = useQuery(GET_TASKS, {
        variables: { user_id: userId },
        skip: !userId  // Skip the query if userId is null
    });

    const [addTask] = useMutation(ADD_TASK, {
        refetchQueries: [{ query: GET_TASKS, variables: { user_id: userId } }],
    });

    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: GET_TASKS, variables: { user_id: userId } }],
    });

    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [{ query: GET_TASKS, variables: { user_id: userId } }],
    });

    return { loading, error, data, addTask, updateTask, deleteTask };
};
