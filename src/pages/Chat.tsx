import { useState, useEffect, useRef, FormEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAssistant, useAssistantActions } from '@/core/assistant';
import MessageInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/MessageList';
import WelcomeMessage from '@/components/chat/WelcomeMessage';

const Chat = () => {
  const [input, setInput] = useState<string>('');
  const { messages, isProcessing } = useAssistant();
  const { sendMessage } = useAssistantActions();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [messages, isProcessing]);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (input.trim() && !isProcessing) {
      const message = input.trim();
      setInput('');
      void sendMessage(message);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-full max-h-screen">
      {/* Chat content container */}
      <div className="pt-15 min-h-93 overflow-hidden">
        <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
          <div className="max-w-3xl mx-auto pt-2 px-5">
            <WelcomeMessage className="mt-5 mb-10" />

            {messages.length > 0 && <MessageList messages={messages} isProcessing={isProcessing} />}
          </div>
        </ScrollArea>
      </div>

      {/* Input container */}
      <div className="max-w-3xl mx-auto p-4 mt-7 mb-8 w-full">
        <MessageInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isProcessing={isProcessing}
          textareaRef={textareaRef}
        />
      </div>
    </div>
  );
};

export default Chat;
