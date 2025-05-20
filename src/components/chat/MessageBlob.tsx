export interface MessageBlobProps {
  content: string;
  isUser: boolean;
}

const MessageBlob = ({ content, isUser }: MessageBlobProps) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`flex max-w-[80%] rounded-lg p-3 ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      }`}
    >
      <div className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-hidden">
        {content}
      </div>
    </div>
  </div>
);

export default MessageBlob;
