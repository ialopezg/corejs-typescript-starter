import { AppMiddleware, HttpException, HttpStatus, Middleware } from '@ialopezg/corejs';

import { UserService } from '../services';

@Middleware()
export class AuthMiddleware implements AppMiddleware {
  constructor(private readonly userService: UserService) {}

  resolve() {
    return async (request, response, next) => {
      const accessToken = request.headers['x-access-token'];
      const user = await this.userService.getUserByName(accessToken);
      if (!user) {
        throw new HttpException('Access denied due to unauthorized access!', HttpStatus.UNAUTHORIZED);
      }

      request.user = user;

      next();
    };
  }
}
