export interface AIModel {
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
