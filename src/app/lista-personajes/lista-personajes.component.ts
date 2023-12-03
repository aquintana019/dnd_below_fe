import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ELIMINAR_PERSONAJE, MOSTRAR_PERSONAJES_USUARIO } from '../graphql.operations';
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
  if(!this.cookieService.get("misDatos")){
    this.router.navigate(['']);
  }else{

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
}

asignarImagen(clasePersonaje: string): string {
  switch (clasePersonaje) {
    case 'Guerrero':
      return 'assets/clases/guerrero.png';
    case 'Artifice':
      return 'assets/clases/artifice.png';
    case 'Explorador':
      return 'assets/clases/explorador.png';
    case 'Bardo':
      return 'assets/clases/bardo.png';
    case 'Druida':
      return 'assets/clases/druida.png';
    case 'Pícaro':
      return 'assets/clases/picaro.png';
    case 'Paladín':
      return 'assets/clases/paladin.png';
    case 'Bárbaro':
      return 'assets/clases/barbaro.png';
    case 'Monje':
      return 'assets/clases/monje.png';
    case 'Mago':
      return 'assets/clases/mago.png';
    case 'Hechicero':
      return 'assets/clases/hechicero.png';
    case 'Brujo':
      return 'assets/clases/brujo.png';
    case 'Clérigo':
      return 'assets/clases/clerigo.png';
    default:
      return 'assets/clases/dm.png';
  }
}

verPersonaje(idPersonaje: string): void {
  this.router.navigate(['crear-personaje'], {state: {id: idPersonaje, bloqueado: true}});
}

confirmarEliminarPersonaje(idPersonaje: string): void {
  const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este personaje?');

  if (confirmacion) {
    this.eliminarPersonaje(idPersonaje);
  }
}

eliminarPersonaje(idPersonaje: string): void{

  this.apollo.mutate({
    mutation: ELIMINAR_PERSONAJE,
    variables: {id: parseInt(idPersonaje)}
  }).subscribe(
    (response: any) => {
      if (response.data && response.data.eliminarPersonaje) {
        alert('El personaje ha sido eliminado');
        window.location.reload();
      } else {
        alert('Error al eliminar el personaje');
      }
      
    }
  )

}

}
