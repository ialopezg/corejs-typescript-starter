import { AppRunner } from '@ialopezg/corejs';
import { Application } from './app';
import { AppModule } from './modules/app';

AppRunner.run(Application, AppModule)
