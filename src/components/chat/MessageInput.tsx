import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormEvent, KeyboardEvent, ChangeEvent, RefObject } from 'react';

export interface MessageInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e?: FormEvent) => void;
  isProcessing: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

const MessageInput = ({
  input,
  setInput,
  handleSubmit,
  isProcessing,
  textareaRef,
}: MessageInputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
      <Textarea
        ref={textareaRef}
        placeholder="Type your message here..."
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isProcessing}
        className="h-20 resize-none"
        rows={1}
      />
      <Button
        className="h-10 w-10"
        type="submit"
        size="icon"
        disabled={!input.trim() || isProcessing}
      >
        <Send />
      </Button>
    </form>
  );
};

export default MessageInput;
