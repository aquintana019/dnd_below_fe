import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ELIMINAR_PERSONAJE, MOSTRAR_PERSONAJES_USUARIO } from '../graphql.operations';
import { GUARDAR_PERSONAJE } from '../graphql.operations';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajesComponent {

  constructor(private apollo:Apollo, private router: Router, private cookieService: CookieService) { }

  personajes: any[] = [];
  error: any;



irAHojaPersonaje(idPersonaje: string):void{
  this.router.navigate(['crear-personaje'], {state: {id: idPersonaje}});
}

ngOnInit(): void {
  const cookieData = this.cookieService.get("misDatos");
  const datosCookie = JSON.parse(cookieData);

  this.apollo.watchQuery({
    query: MOSTRAR_PERSONAJES_USUARIO,
    variables: {usuarioId: parseInt(datosCookie[1])}
  }).valueChanges.subscribe(({data, error}:any) =>{
    this.personajes= data.mostrarPersonajesUsuario;
    this.error = error;
  })

}

verPersonaje(idPersonaje: string): void {
  this.router.navigate(['crear-personaje'], {state: {id: idPersonaje, bloqueado: true}});
}

eliminarPersonaje(idPersonaje: string): void{

  this.apollo.mutate({
    mutation: ELIMINAR_PERSONAJE,
    variables: {id: parseInt(idPersonaje)}
  }).subscribe(
    (response: any) => {
      if (response.data && response.data.eliminarPersonaje) {
        alert('El personaje ha sido eliminado');
        this.ngOnInit();
        window.location.reload();
      } else {
        alert('Error al eliminar el personaje');
      }
      
    }
  )

}

}
