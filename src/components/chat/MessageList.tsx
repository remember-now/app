import { Message } from '@/core/assistant';
import MessageBlob from './MessageBlob';
import TypingIndicator from './TypingIndicator';

export interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
}

const MessageList = ({ messages, isProcessing }: MessageListProps) => (
  <div className="space-y-4">
    {messages.map((message) => (
      <MessageBlob key={message.id} content={message.content} isUser={message.role === 'user'} />
    ))}

    {isProcessing && <TypingIndicator />}
  </div>
);

export default MessageList;
