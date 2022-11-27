import { Application as IApplication } from '@ialopezg/corejs';
import * as express from 'express';

import { LoggerService } from '../../corejs/src';
import { ExpressConfig } from './config';

export class Application implements IApplication {
  private readonly logger = new LoggerService(Application.name);

  constructor(private readonly app: express.Application) {
    ExpressConfig.setup(app);
  }

  start(): void {
    // do something before server start

    const port = process.env.APP_PORT || 8000;
    this.app.listen(port, () => {
      this.logger.log(`Application listen on port: ${port}`);
    });
  }
}
