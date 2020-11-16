import { Component, OnInit } from '@angular/core';
import { redirectToCheckout, loadAirwallex } from "airwallex-payment-elements";

const intentid = "int_4UQsvc4WzgQ0NIMu5zlocJBeYIg";
const client_secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDU1MTYyOTEsImV4cCI6MTYwNTUxOTg5MSwiYWNjb3VudF9pZCI6ImFjNjZjZmRmLWM2ZTgtNGYxYy05NzIzLTYyNzI1NDQyZmExNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzRVUXN2YzRXemdRME5JTXU1emxvY0pCZVlJZyJ9.-n78OC6Rk5CRgTX-xOMQ7CHpLYstqBxrj_Cp48YETcE";

@Component({
  selector: 'app-hpp',
  templateUrl: './hpp.component.html',
  styleUrls: ['./hpp.component.less'],
})
export class HppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  redirectHpp = async () => {
    try {
      await loadAirwallex({
        env: 'staging',
      });
      await redirectToCheckout({
        env: 'staging',
        id: intentid,
        client_secret: client_secret,
      });
    } catch (error) {
      // handle errors here
    }
  };
}
