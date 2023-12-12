import { Component, OnInit, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { CREAR_USUARIO, GET_USUARIO } from '../graphql.operations';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import {
  Observable,
  catchError,
  debounceTime,
  delay,
  map,
  of,
  switchMap,
} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  formulario = this.fb.group(
    {
      usuario: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)/), 
        ],
      ]
    },
    { updateOn: 'change' }
  );

  mensajeError: string | null = null;

  constructor(private apollo: Apollo, private fb: FormBuilder, private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cookieService.delete('misDatos');
  }

  existeUsuario(): boolean {
    var usuarioExiste: boolean = false;
    
    this.apollo
      .watchQuery({
        query: GET_USUARIO,
        variables: { user: this.formulario.value.usuario },
      })
      .valueChanges.subscribe((result: any) => {
          const data = result.data;
          usuarioExiste = !!(data && data.comprobarUsuario);

          this.mensajeError = usuarioExiste ? 'El nombre de usuario ya existe.' : null;
        })

    return usuarioExiste;
  }

  guardarDatos(): void {
    console.log('Formulario válido:', this.formulario.valid);
  
    if (this.formulario.valid && !this.existeUsuario()) {
      this.apollo
        .mutate({
          mutation: CREAR_USUARIO,
          variables: {
            user: this.formulario.value.usuario,
            password: this.formulario.value.password,
            esAdmin: 0,
          },
        })
        .subscribe(
          (response) => {
            console.log('Usuario creado exitosamente:', response);
            if(!this.cookieService.get("misDatos")){

              const DATA:any = response.data;
              const DATOS_COOKIE= [this.formulario.value.usuario, DATA.crearUsuario.ID, 0 ];

              this.cookieService.set('misDatos', JSON.stringify(DATOS_COOKIE), {secure: true, sameSite: 'None'});
            }
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });;
          },
          (error) => {
            console.error('Error al crear usuario:', error);
          }
        );
    }
  }
}

