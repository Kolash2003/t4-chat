import { useQuery } from "@tanstack/react-query";
import type { AIModel } from "@/modules/chat/types";

export const useAIModels = () => {
    return useQuery({
        queryKey: ["ai-models"],
        queryFn: async () => {
            const res = await fetch("/api/ai/get-models");
            const data = (await res.json()) as { models: AIModel[] };
            return data;
        },
    });
}
