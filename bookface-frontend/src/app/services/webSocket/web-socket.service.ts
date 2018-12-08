declare var require: any;

import { Injectable } from '@angular/core';
// import Stomp from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import * as Stomp from 'stompjs';
var SockJS =  require("sockjs-client");
var Stomp = require("stompjs/lib/stomp.js").Stomp;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private serverUrl = "http://localhost:8080/socket";
  private stompClient;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {

          console.log("reçu " + message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
  }
}
