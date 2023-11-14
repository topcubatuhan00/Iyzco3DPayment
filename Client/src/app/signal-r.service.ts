import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection:signalR.HubConnection | any
  constructor() { }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7099/pay-hub").build()

    this.hubConnection.start().then(() => {console.log("Connected")})
    .catch((err:any) => {console.log(err)})
  }

  paymentResult = (status:any) => 
  {
    this.hubConnection.on("Receive", (res:any)=>{
      status(res)
    })
  }
}
