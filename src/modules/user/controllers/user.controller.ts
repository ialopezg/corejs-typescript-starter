import { Controller, RequestMapping, RequestMethod } from '@ialopezg/corejs';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { UserCreateDto } from '../dtos';

import { UserService } from '../services';

@Controller({ path: 'users' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @RequestMapping({ method: RequestMethod.POST })
  async createUser(request: Request, response: Response) {
    try {
      const userCreateDto: UserCreateDto = plainToInstance(UserCreateDto, request.body);
      const user = await this.service.createUser(userCreateDto);

      response.json(user);
    } catch (error: any) {
      const status = error?.getStatus() || 400;

      response.status(status).json({ errors: error });
    }
  }

  @RequestMapping()
  async getUsers(request: Request, response: Response) {
    const users = await this.service.getUsers();

    response.json(users);
  }

  @RequestMapping({ path: ':id' })
  async getUserByID(request: Request, response: Response) {
    const user = await this.service.getUserByID(+request.params.id);

    response.json(user);
  }

  @RequestMapping({ path: ':id', method: RequestMethod.PUT })
  async updateUserByID(request: Request, response: Response) {
    try {
      const { id: userId } = request.params;
      const userUpdateDto: UserCreateDto = plainToInstance(UserCreateDto, request.body);
      const user = await this.service.updateUserByID(+userId, userUpdateDto);

      response.json(user);
    } catch (error: any) {
      const status = error?.getStatus() || 400;

      response.status(status).json({ errors: error });
    }
  }

  @RequestMapping({ path: ':id', method: RequestMethod.DELETE })
  async deleteUser(request: Request, response: Response) {
    try {
      const { id: userId } = request.params;
      const user = await this.service.deleteUserByID(+userId);

      response.json(user);
    } catch (error: any) {
      const status = error?.getStatus() || 400;

      response.status(status).json({ errors: error });
    }
  }
}
