import { Component, GatewayServer, isUndefined, SocketGateway, SubscribeMessage } from '@ialopezg/corejs';
import { Subject } from 'rxjs';

@SocketGateway({ port: 2000 })
@Component()
export class ChatGatewayService {
  private msg$ = new Subject<any>();

  @GatewayServer server;

  get msgStream() {
    if (isUndefined(this.msg$)) {
      this.msg$ = new Subject<any>();
    }

    return this.msg$.asObservable();
  }

  @SubscribeMessage({ value: 'message' })
  onMessage(client, data) {
    this.msg$.next({ client, data });
  }
}
