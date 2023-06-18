import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
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
      headers:new HttpHeaders( {
        'Content-Type' : 'application/json',
        'x-access-token': localStorage.getItem("token") as string
      })
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
