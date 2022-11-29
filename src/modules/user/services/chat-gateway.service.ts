import { isUndefined } from '@ialopezg/corejs';
import { GatewayServer, WebSocketGateway, SubscribeMessage } from '@ialopezg/corejs/lib/socket/decorators';
import { Subject } from 'rxjs';

@WebSocketGateway({ port: 2000 })
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
