export interface GetConversationId {
  username_1: string;
  username_2: string;
}

export interface SendMessage {
  currentUsername: string;
  conversation_id: number;
  content: string;
}
