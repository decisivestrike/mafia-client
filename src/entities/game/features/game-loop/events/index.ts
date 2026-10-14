export type WebSocketMessage = {
  message_type: string;
  topic: string;
  timestamp: string;
  payload: any;
};
