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

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  formulario = this.fb.group(
    {
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    },
    { updateOn: 'blur' }
  );

  existeUsuario(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      debounceTime(300),
      switchMap((usuario) =>
        this.apollo
          .watchQuery({
            query: GET_USUARIO,
            variables: { user: usuario },
          })
          .valueChanges.pipe(
            map((result: any) => {
              const data = result.data;
              const usuarioExiste = !!(data && data.comprobarUsuario);
              console.log('usuarioExiste:', usuarioExiste);

              return usuarioExiste ? { usuarioExistente: true } : null;
            })
          )
      )
    );
  }

  // getUsuario(): void {
  //   this.apollo
  //     .watchQuery({
  //       query: GET_USUARIO,
  //       variables: {
  //         user: this.formulario.value.usuario,
  //       },
  //     })
  //     .valueChanges.subscribe((data: any) => {
  //       this.usuarioExiste = data.comprobarUsuario;
  //     });
  // }

  constructor(private apollo: Apollo, private fb: FormBuilder, private router: Router) {}

  guardarDatos(): void {
    console.log('Formulario válido:', this.formulario.valid);

    if (this.formulario.valid) {
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
            this.router.navigate(['']);
          },
          (error) => {
            console.error('Error al crear usuario:', error);
          }
        );
    }
  }
}
