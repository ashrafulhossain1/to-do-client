import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../AxiosPublic/useAxiosPublic";
import useAuth from "../GetAuthInfo/useAuth";

const useToDos = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic()

    const { data: todos = [], isLoading, refetch } = useQuery({
        queryKey: ['todos', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axiosPublic.get(`/todos`);
            return response.data;
        },
    })
    console.log(todos)
    return { todos, isLoading, refetch }
};

export default useToDos;

