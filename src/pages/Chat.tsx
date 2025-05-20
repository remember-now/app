import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAssistant, useAssistantActions } from '@/core/assistant';
import { Send, Loader2 } from 'lucide-react';

const Chat = () => {
  const [input, setInput] = useState('');
  const { messages, isProcessing } = useAssistant();
  const { sendMessage } = useAssistantActions();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [messages, isProcessing]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim() && !isProcessing) {
      const message = input.trim();
      setInput('');
      void sendMessage(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-full max-h-screen w-full">
      {/* Chat messages */}
      <div className="mt-15 min-h-71 overflow-hidden">
        <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
          <div className="max-w-3xl mx-auto pt-2 p-5 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <p className="text-center">How can I help you today?</p>
                <p className="text-sm text-center max-w-md mt-2">
                  I can help you remember things, plan your day, or just chat.
                </p>
                <p className="text-sm text-center max-w-md mt-2">Ask me anything.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-[80%] rounded-lg ${
                      message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    } p-3`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="flex bg-muted rounded-r-lg rounded-bl-lg p-3">
                  <div className="flex space-x-2 items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="w-full max-w-3xl mx-auto p-4 mt-5 mb-8">
        <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="h-20 resize-none"
            rows={1}
          />
          <Button
            className="h-10 w-10 cursor-pointer"
            type="submit"
            size="icon"
            disabled={!input.trim() || isProcessing}
          >
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
