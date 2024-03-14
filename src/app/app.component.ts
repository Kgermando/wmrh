import { Component, OnDestroy, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'wmrh';
  // updateAvailable = false;

  // constructor(private swPush: SwPush, private notifactionService: NotificationService,
  //   private updates: SwUpdate,
  //   private checkForUpdateService: CheckUpdateService) {
  //   this.swPush.notificationClicks.subscribe( event => {
  //     console.log('Received notification: ', event);
  //     const url = event.notification.data.url;
  //     window.open(url, '_blank');
  //   });

  //   this.updates.versionUpdates.subscribe((event) => {
  //     this.updateAvailable = true;
  //     console.log('versionUpdates', event);
  //   });
  // }
 
  // ngOnInit(): void {
  //   this.notifactionService.subscribeToNotifications();
  //   this.notifactionService.subscribeMessage();
  // }

  // ngOnDestroy(): void {
  //   this.notifactionService.unsubscribeFromPushNotification();
  // }
} 