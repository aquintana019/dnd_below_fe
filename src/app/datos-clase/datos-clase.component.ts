import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_CLASES } from '../graphql.operations';

@Component({
  selector: 'app-datos-clase',
  templateUrl: './datos-clase.component.html',
  styleUrls: ['./datos-clase.component.css']
})
export class DatosClaseComponent implements OnInit{

  clases: any[] = [];
  error: any;

  constructor(private apollo: Apollo){}

  ngOnInit(): void {
      this.apollo.watchQuery({
        query: GET_ALL_CLASES
      }).valueChanges.subscribe(({data, error}:any) =>{
        this.clases= data.getAllClases;
        this.error = error;
      })
  }

  asignarImagen(nombreClase: string): string {
    switch (nombreClase) {
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

}
