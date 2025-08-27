import { ChatRequest, ChatResponse } from '@/lib/types';
import createHttpService from './http-service';

class AgentService {
  private httpService = createHttpService('/agent/chat');

  sendMessage(chatRequest: ChatRequest) {
    return this.httpService.create<ChatResponse>(chatRequest);
  }
}

export const agentService = new AgentService();
