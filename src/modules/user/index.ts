import { MiddlewareBuilder, Module } from '@ialopezg/corejs';
import { ChatGatewayService } from '../../../../corejs/example/modules/user/services';

import { UserController } from './controllers';
import { AuthMiddleware } from './middlewares';
import { ChatService, NotificationService, UserService } from './services';

@Module({
  controllers: [UserController],
  components: [UserService, NotificationService, ChatGatewayService, ChatService],
})
export class UserModule {
  configure(builder: MiddlewareBuilder) {
    builder.use({
      middlewares: [AuthMiddleware],
      forRoutes: [UserController],
    });
  }
}
