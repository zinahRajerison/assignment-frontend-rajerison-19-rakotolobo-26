import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  
  formOption (use_authorization = false) {
    const options = { 
      headers: {
        'Content-Type' : 'application/json'
      }
    };
    
    if (use_authorization) {
      // options['headers']['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    }
    return options;
  }
  
  makeBody (json:any) {
    let body :string [] = [];
    for (let key in json)
      body.push(key + '=' + json[key]);
    return body.join('&');
  }
}
