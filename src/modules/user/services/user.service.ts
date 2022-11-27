import { Component, HttpException, HttpStatus } from '@ialopezg/corejs';
import { validate } from 'class-validator';

import { UserCreateDto, UserUpdateDto } from '../dtos';
import { UserEntity } from '../entities';

let users: UserEntity[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Alice Caeiro' },
  { id: 3, name: 'Who Knows' },
];

@Component()
export class UserService {
  public async createUser(userCreateDto: UserCreateDto): Promise<UserEntity> {
    const errors = await validate(userCreateDto);
    if (errors.length && errors[0].property === 'name' && Object.keys(errors[0].constraints).includes('isNotEmpty')) {
      throw new HttpException(errors[0].constraints['isNotEmpty'], HttpStatus.PRECONDITION_FAILED);
    }
    if (errors.length && errors[0].property === 'name' && Object.keys(errors[0].constraints).includes('isString')) {
      throw new HttpException(errors[0].constraints['isString'], HttpStatus.PRECONDITION_FAILED);
    }

    users.push({ id: users.length + 1, ...userCreateDto });
    const user = this.getUserByName(userCreateDto.name);

    return Promise.resolve(user);
  }

  public async getUsers(): Promise<UserEntity[]> {
    return Promise.resolve(users);
  }

  public async getUserByID(id: number): Promise<UserEntity> {
    const user = await this.getUser({ id });

    if (!user) {
      throw new HttpException(`User with ID ${id} not found!`, 404);
    }

    return Promise.resolve(user);
  }

  public async getUserByName(name: string): Promise<UserEntity> {
    const user = this.getUser({ name });
    if (!user) {
      throw new HttpException(`User with name ${name} not found!`, 404);
    }

    return Promise.resolve(user);
  }

  public async updateUserByID(userId: number, userUpdateDto: UserUpdateDto): Promise<UserEntity> {
    let storedUser = await this.getUserByID(userId);
    storedUser = Object.assign(storedUser, userUpdateDto);

    return storedUser;
  }

  public async deleteUserByID(userId: number): Promise<UserEntity> {
    const storedUser = await this.getUserByID(userId);

    const index = users.indexOf(storedUser);
    users.splice(index, 1);

    return storedUser;
  }

  private getUser(options: Partial<{ id: number; name: string }>): Promise<UserEntity> {
    let user: UserEntity;
    if (options.id) {
      user = users.find((user) => user.id === options.id);
    } else {
      user = users.find((user) => user.name === options.name);
    }

    return Promise.resolve(user);
  }
}
