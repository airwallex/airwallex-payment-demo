import { Component, OnInit } from '@angular/core';
import { loadAirwallex, createElement } from 'airwallex-payment-elements';

const intentid = 'int_4UQsvc4WzgQ0NIMu5zlocJBeYIg';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDU1MTYyOTEsImV4cCI6MTYwNTUxOTg5MSwiYWNjb3VudF9pZCI6ImFjNjZjZmRmLWM2ZTgtNGYxYy05NzIzLTYyNzI1NDQyZmExNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzRVUXN2YzRXemdRME5JTXU1emxvY0pCZVlJZyJ9.-n78OC6Rk5CRgTX-xOMQ7CHpLYstqBxrj_Cp48YETcE';

@Component({
  selector: 'app-drop-in',
  templateUrl: './drop-in.component.html',
  styleUrls: ['./drop-in.component.less'],
})
export class DropInComponent implements OnInit {
  constructor() {}

  onSuccess(event: any) {
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  }

  ngOnInit(): void {
    loadAirwallex({
      env: 'staging',
      origin: window.location.origin,
    }).then(() => {
      const dropIn = createElement('dropIn', {
        intent: {
          id: intentid,
          client_secret,
        },
      });
      dropIn?.mount('dropIn');
    });
    window.addEventListener('onSuccess', this.onSuccess);
  }

  ngOnDestroy(): void {
    window.removeEventListener('onSuccess', this.onSuccess);
  }
}
