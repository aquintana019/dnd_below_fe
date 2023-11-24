import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql.operations';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private apollo: Apollo, private router: Router) {}

  form = new FormGroup({
    usuario: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required)
  });

  usuario: String=""
  usuarioID: Number= 0
  esAdmin: Number= 0
  
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
      this.router.navigate(['/']);
    });
    

  //   this.apollo.
  //   login(this.form.get('usuario'))?.value, this.form.get('password')?.value)
  //   .subscribe((response)) => {
  //     this.router.navigate(['/']);
  //   }
  // };

  //  logout(): void {
    
  //  }

  // login(form:NgForm){

  //   const usuario = form.value.usuario
  //   const password = form.value.password

  //   this.apollo.watchQuery({
  //     query: LOGIN,
  //     variables: {user:usuario, password: password},
  //   }).valueChanges.subscribe
  // }
  }
}
