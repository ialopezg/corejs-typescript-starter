import { AppFactory, LoggerService } from '@ialopezg/corejs';
import { AppModule } from './modules/app';

const logger = new LoggerService('Application');
const port = +process.env.APP_PORT || 8000;
const app = AppFactory.create(AppModule)

app.listen(port, () => {
  logger.log(`Application running on port ${port}`);
});
