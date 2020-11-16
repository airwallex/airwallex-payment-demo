import { Component, OnInit } from '@angular/core';
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

const intentid = 'int_4UQsvc4WzgQ0NIMu5zlocJBeYIg';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDU1MTYyOTEsImV4cCI6MTYwNTUxOTg5MSwiYWNjb3VudF9pZCI6ImFjNjZjZmRmLWM2ZTgtNGYxYy05NzIzLTYyNzI1NDQyZmExNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzRVUXN2YzRXemdRME5JTXU1emxvY0pCZVlJZyJ9.-n78OC6Rk5CRgTX-xOMQ7CHpLYstqBxrj_Cp48YETcE';

@Component({
  selector: 'app-we-chat',
  templateUrl: './we-chat.component.html',
  styleUrls: ['./we-chat.component.less'],
})
export class WeChatComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    loadAirwallex({
      env: 'staging',
      origin: window.location.origin,
    }).then(() => {
      const wechat = createElement('wechat', {
        intent: {
          id: intentid,
          client_secret,
        },
      });
      wechat?.mount('wechat');
    });
    window.addEventListener('onSuccess', this.onSuccess);
  }

  onSuccess(event: any) {
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  }

  ngOnDestroy(): void {
    window.removeEventListener('onSuccess', this.onSuccess);
  }
}
