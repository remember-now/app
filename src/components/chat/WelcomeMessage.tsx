interface WelcomeMessageProps {
  className?: string;
}

const WelcomeMessage = ({ className = '' }: WelcomeMessageProps) => (
  <div
    className={`flex flex-col items-center justify-center py-6 text-muted-foreground ${className}`}
  >
    <p>How can I help you today?</p>
    <p className="text-sm max-w-md mt-2">
      I can help you remember things, plan your day, or just chat.
    </p>
    <p className="text-sm max-w-md mt-2">Ask me anything.</p>
  </div>
);

export default WelcomeMessage;
