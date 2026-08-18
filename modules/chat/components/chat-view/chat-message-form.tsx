"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIModels } from "@/modules/chat/hooks/useAIModels";
import { Spinner } from "@/components/ui/spinner";
import ModelSelector from "./model-selector";

interface ChatMessageFormProps {
    intialMessage?: string;
    onMessageChange?: () => void;
}

export default function ChatMessageForm({ intialMessage = "", onMessageChange }: ChatMessageFormProps) {

    const { data: models, isPending } = useAIModels();
    const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
    const [lastInitialMessage, setLastInitialMessage] = useState(intialMessage);
    const [message, setMessage] = useState(intialMessage);

    if (intialMessage && intialMessage !== lastInitialMessage) {
        setLastInitialMessage(intialMessage);
        setMessage(intialMessage);
    }

    const effectiveSelectedModel = selectedModel ?? models?.models[0]?.id;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-6">
            <form onSubmit={handleSubmit}>
                <div
                    className="relative rounded-2xl border-border shadow-sm transition-all"
                >
                    <Textarea
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            onMessageChange?.();
                        }}
                        placeholder="Type your mesage here..."
                        className="min-h-[60px] max-h-[200px] resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />

                    <div className="flex items-center justify-between gap-2 px-3 py-2 border-t">
                        <div className="flex items-center gap-1">
                            {isPending ? (
                                <Spinner />
                            ) : (
                                <ModelSelector
                                    models={models?.models ?? []}
                                    selectedModelId={effectiveSelectedModel}
                                    onModelSelect={setSelectedModel}
                                    className="ml-1"
                                />
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={!message.trim()}
                            size="sm"
                            variant={message.trim() ? "default" : "ghost"}
                            className="h-8 w-8 p-0 rounded-full"
                        >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
