import { Component } from '@ialopezg/corejs';

@Component()
export class NotificationService {
  public storeNotification(data) {
    const notification = this.mapDataToNotification(data);
    // store notification
    console.log(notification);
  }

  private mapDataToNotification(message: string) {
    return message;
  }
}
