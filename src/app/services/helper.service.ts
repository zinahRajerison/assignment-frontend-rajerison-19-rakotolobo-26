import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  
  formOption (use_authorization = false) {
    
    if (!use_authorization) {
      return { 
        headers: {
          'Content-Type' : 'application/json'
        }
      }
    }
    const options = { 
      headers: {
        'Content-Type' : 'application/json',
        'x-access-token': localStorage.getItem("token")
      }
    };
    return options;
  }
  
  makeBody (json:any) {
    let body :string [] = [];
    for (let key in json)
      body.push(key + '=' + json[key]);
    return body.join('&');
  }
}
