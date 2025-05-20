import { Loader2 } from 'lucide-react';

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex bg-muted rounded-r-lg rounded-bl-lg p-3">
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      <span className="text-sm">Thinking...</span>
    </div>
  </div>
);

export default TypingIndicator;
