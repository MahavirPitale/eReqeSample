import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { UserDetails } from "../model/login";
// import { Configuration } from "../../app.constants";
// import {getipDetails} from '../../_models/common/com-mod-index';

@Injectable()
export class LoginService {

    constructor(private _http: Http) {
    }

    public validateUser = (body: any,options: any): Observable<UserDetails> => {
            
     
              return this._http.post("http://10.10.20.205:8000/v1/auth/login",body,options)
            .map(data => data.json());

    }
    
     logout() {
        // remove user from session storage to log user out
        window.sessionStorage.clear();
        sessionStorage.clear();
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("Entity");
        sessionStorage.removeItem("UserId");
        sessionStorage.removeItem("UserType");
        sessionStorage.removeItem("UserName");
    }
   
}