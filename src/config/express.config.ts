import * as express from 'express';

export class ExpressConfig {
  public static setup(app: express.Application): void {
    app.use(express.json({ limit: '100mb' }));
    app.use(express.urlencoded({ extended: true }));
  }
}
