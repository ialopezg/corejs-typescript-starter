import { Component } from '@ialopezg/corejs';

import { ChatGatewayService } from './chat-gateway.service';

@Component()
export class ChatService {
  constructor(private readonly gateway: ChatGatewayService) {
    const stream$ = this.gateway.msgStream;

    if (stream$) {
      stream$.subscribe(this.storeMessage.bind(this));
    }
  }

  storeMessage(data: any) {
    // store data
    console.log(data);
  }
}
