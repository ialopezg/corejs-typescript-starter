import { Module } from '@ialopezg/corejs';

import { UserModule } from '../user';

@Module({
  modules: [UserModule],
})
export class AppModule {}
