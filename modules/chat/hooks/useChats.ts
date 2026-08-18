import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { createChatWithMessage, deleteChatById, getAllChats } from "../actions";


export const useGetChats = (chatId: string) => {
    return useQuery({
        queryKey: ['chats', chatId],
        queryFn: getAllChats
    })
}

export const useCreateChat = () => {
    const queryClient = useQueryClient();

    const router = useRouter();

    return useMutation({
        mutationFn: createChatWithMessage,
        onSuccess: (res: any) => {
            if(res.success && res.data) {
                queryClient.invalidateQueries({
                    queryKey: ["chats"]
                })
                router.push(`/chat/${res.data.id}?autotrigger=true`)
            } 
        },
        onError: (error: Error) => {
            console.error("Create chat error:", error);
            toast.error("Failed to create chat");
        }
    })
}

export const useDeleteChat = (chatId: string) => {
    const queryClient = useQueryClient();

    const router = useRouter();

    return useMutation({
        mutationFn: () => deleteChatById(chatId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["chats"]
            });
            router.push("/");
        },
        onError: () => {
            toast.error("Failed to delete chat");
        }
    });
}



