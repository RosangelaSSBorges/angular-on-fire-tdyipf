import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { AuthService } from './auth.service';

interface auth {
  token: string;
  login: string;
  profile: Array<string>;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  site: 'https://agendaciro.herokuapp.com';
  name = 'Agenda Médica';

  login: 'bruno.pereira83@fatec.sp.gov.br';
  password: '123456';

  auth = null;
  list = null;

  //constructor(public authService: AuthService) {}
  constructor(private http: HttpClient) {}
  ngOnInit() {}

  postLogin() {
    this.http
      .post<auth>(this.site + '/login', {
        login: this.login,
        senha: this.password,
      })
      .subscribe((data) => (this.auth = data));
  }

  postLogout() {
    this.auth = null;
  }

  getMedico() {
    this.http.get<any>(this.site + '/medicos');
  }

  getPaciente() {
    this.http
      .get<any>(this.site + '/pacientes', {
        headers: { Authorization: 'Bearer ' + this.auth.token },
      })
      .subscribe((data) => {
        this.list = data;
      });
  }
  /*
  loginWithEmail() {
    this.authService.loginWithEmail(this.user, this.password);
    this.user = this.password = '';
  }
  */
  /*
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  */
  /*
  logout() {
    this.authService.logout();
  }
  */
}
