import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Sparkles, Loader2, ChevronRight } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Assistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: "1",
            role: "assistant",
            content: "Hi! I'm your hospital AI assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponses = [
                "I can help you check the bed availability in the ICU.",
                "Based on recent data, the OPD traffic is higher than usual today.",
                "I've updated the patient records as requested.",
                "Here is the revenue summary for the last 24 hours.",
            ];
            const randomResponse =
                aiResponses[Math.floor(Math.random() * aiResponses.length)];

            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: randomResponse,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const suggestedPrompts = [
        "Check bed availability",
        "Show daily revenue",
        "List critical patients",
        "Staff schedule today",
    ];

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[380px] h-[600px] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-[50]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-muted/40 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Bot className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Vital AI</h3>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex w-full items-start gap-2",
                                        message.role === "user" ? "flex-row-reverse" : "flex-row"
                                    )}
                                >
                                    <Avatar className="w-8 h-8 border">
                                        <AvatarFallback className={cn(
                                            "text-xs",
                                            message.role === "assistant" ? "bg-primary/10 text-primary" : "bg-muted"
                                        )}>
                                            {message.role === "assistant" ? "AI" : "ME"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                                            message.role === "user"
                                                ? "bg-primary text-primary-foreground ml-auto rounded-tr-none"
                                                : "bg-muted mr-auto rounded-tl-none"
                                        )}
                                    >
                                        {message.content}
                                        <div className={cn(
                                            "text-[10px] mt-1 opacity-70",
                                            message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                                        )}>
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex w-full items-start gap-2">
                                    <Avatar className="w-8 h-8 border">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Suggested Prompts (only if few messages) */}
                        {messages.length < 3 && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-muted-foreground mb-2 font-medium">Suggested actions</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedPrompts.map((prompt) => (
                                        <button
                                            key={prompt}
                                            onClick={() => {
                                                setInputValue(prompt);
                                                // wrapper to avoid immediate send if we want user to confirm, or directly send:
                                                // handleSendMessage({ preventDefault: () => {} } as any); 
                                                // For now just set input
                                            }}
                                            className="text-xs bg-muted/60 hover:bg-muted border border-transparent hover:border-border transition-colors px-2.5 py-1.5 rounded-full flex items-center gap-1"
                                        >
                                            <Sparkles className="w-3 h-3 text-primary" />
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 border-t bg-background">
                            <form onSubmit={handleSendMessage} className="flex gap-2 relative">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask Vital AI anything..."
                                    className="pr-10 rounded-full border-muted-foreground/20 focus-visible:ring-offset-0 focus-visible:ring-1"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-1 top-1 h-8 w-8 rounded-full"
                                    disabled={!inputValue.trim() || isLoading}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white z-[50] transition-colors",
                    isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
                )}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="bot"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Bot className="w-7 h-7" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
}
