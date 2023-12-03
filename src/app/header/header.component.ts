import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql.operations';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private apollo: Apollo, private router: Router, public cookieService: CookieService) {}

  form = new FormGroup({
    usuario: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required)
  });

  usuario: String=""
  usuarioID: Number= 0
  esAdmin: Number= 0
  isMenuOpen: boolean = false;

  desplegarMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  cerrarMenu(): void {
    this.isMenuOpen = false;
  }

  ngOnInit(): void {
    const cookieData = this.cookieService.get("misDatos");
    if (cookieData) {
      const datosCookie = JSON.parse(cookieData);
      this.usuario = datosCookie[0];
      this.usuarioID = datosCookie[1];
      this.esAdmin = datosCookie[2];
    }
  }
  
  clickLogin(){
    if (this.form.invalid){
      return;
    }
    
    this.apollo.watchQuery({
      query: LOGIN,
      variables: {
        user: this.form.get('usuario')?.value,
        password: this.form.get('password')?.value
      },
    }).valueChanges.subscribe((result):any => {
      const data: any = result.data;
      this.usuario = data.login.nombreUsuario;
      this.esAdmin = data.login.esAdmin;
      this.usuarioID = data.login.ID;
      const DATOS_COOKIE= [this.usuario, this.usuarioID, this.esAdmin];

      this.cookieService.set('misDatos', JSON.stringify(DATOS_COOKIE), {secure: true, sameSite: 'None'});
      this.router.navigate(['/']);
    }
    );
  }
    

   clickLogout(): void {
    this.cookieService.delete('misDatos');
    this.usuario = '';
    this.usuarioID = 0;
    this.esAdmin = 0;
    this.router.navigate(['/']);
   }

  
}
