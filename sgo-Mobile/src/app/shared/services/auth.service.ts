import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;

  baseUrl = 'https://sgoengenharia.herokuapp.com/';
  // baseUrl = '127.0.0.1:8000/';


  constructor(
    private http: HttpClient,
    public navCtrl: NavController,
  ) { }

  login(creds): Observable<any> {
    return this.http.post(`${this.baseUrl}obter-token/`, creds);
  }


  logout() {
    localStorage.removeItem('Token');
    this.navCtrl.navigateBack('');
    this.isLoggedIn = false;
  }

// logout (): Observable<any> {
//   return this.http.get<any>(`${this.baseUrl}obter-token/`)
// }

   // sucessfulLogin(authorizationValue: string) {
  //   let tok = authorizationValue.replace('"', '').replace('"', '').replace('"', '')
  //                               .replace('"', '').replace('{', '').replace('}', '').replace(':', ' ');
  //   localStorage.setItem("token", tok);
  //   this.isLoggedIn = true;
  // }


//   login(email: String, password: String) {
//     return this.http.post(`${this.baseUrl}obter-token/`,
//       {email: email, password: password}
//     ).pipe(
//       tap(token => {
//         this.storage.setItem('token', token)
//         .then(
//           () => {
//             console.log('Token Stored');
//           },
//           error => console.error('Error storing item', error)
//         );
//         this.token = token;
//         this.isLoggedIn = true;
//         return token;
//       }),
//     );
//   }

//   register(fName: String, lName: String, email: String, password: String) {
//     return this.http.post(this.baseUrl + 'auth/register',
//       {fName: fName, lName: lName, email: email, password: password}
//     )
//   }

//   logout() {
//     const headers = new HttpHeaders({
//       'Authorization': this.token["token_type"]+" "+this.token["access_token"]
//     });

//     return this.http.get(this.baseUrl + 'auth/logout', { headers: headers })
//     .pipe(
//       tap(data => {
//         this.storage.remove("token");
//         this.isLoggedIn = false;
//         delete this.token;
//         return data;
//       })
//     )
//   }

//   user() {
//     const headers = new HttpHeaders({
//       'Authorization': this.token["token_type"]+" "+this.token["access_token"]
//     });

//     return this.http.get<User>(this.baseUrl + 'auth/user', { headers: headers })
//     .pipe(
//       tap(user => {
//         return user;
//       })
//     )
//   }

//   getToken() {
//     return this.storage.getItem('token').then(
//       data => {
//         this.token = data;

//         if(this.token != null) {
//           this.isLoggedIn=true;
//         } else {
//           this.isLoggedIn=false;
//         }
//       },
//       error => {
//         this.token = null;
//         this.isLoggedIn=false;
//       }
//     );
//   }
}
