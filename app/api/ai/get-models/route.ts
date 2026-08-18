import { NextResponse } from "next/server";

interface OpenRouterModel {
    id: string;
    name: string;
    description: string | null;
    context_length: number;
    architecture: {
        input_modalities: string[];
        output_modalities: string[];
        tokenizer: string;
        instruct_type: string | null;
    };
    pricing: {
        prompt: string;
        completion: string;
        request: string;
        image: string;
        web_search: string;
        internal_reasoning: string;
    };
    top_provider: {
        context_length: number;
        max_completion_tokens: number;
        is_moderated: boolean;
    };
}

export async function GET() {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/models", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            }
        });

        if(!response.ok) {
            return NextResponse.json({
                message: "Openrouter api error",
                status: 500
            });
        }

        const data = (await response.json()) as { data: OpenRouterModel[] };

        const freeModels = data.data.filter(model => {
            const promptPrice = parseFloat(model.pricing?.prompt || "0");
            const completionPrice = parseFloat(model.pricing?.completion || "0");
            
            return promptPrice === 0 && completionPrice === 0;
        });

        const formattedModels = freeModels.map(model => ({
            id: model.id,
            name: model.name,
            description: model.description,
            context_length: model.context_length,
            architecture: model.architecture,
            pricing: model.pricing,
            top_provider: model.top_provider,
        }));

        return NextResponse.json({
            models: formattedModels
        })

    } catch (error) {
        console.error("Error fetching models: ", error);

        return NextResponse.json({
            success: false,
            error: (error as Error).message || `Failed to fetch free models`,
            status: 500
        });
    }
}