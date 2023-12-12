import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { BUSCAR_CLASE_POR_NOMBRE, BUSCAR_PERSONAJE_POR_ID, GET_ALL_CLASES, GUARDAR_PERSONAJE, MODIFICAR_PERSONAJE } from '../graphql.operations';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-personaje',
  templateUrl: './crear-personaje.component.html',
  styleUrls: ['./crear-personaje.component.css']
})
export class CrearPersonajeComponent {

  constructor(private apollo:Apollo, public cookieService: CookieService, private route: ActivatedRoute, private router: Router){}

  nombre: string = '';
  trasfondo: string = '';
  raza: string = '';
  alineamiento: string = '';
  experiencia: string = '';
  puntuacionFuerza: string = '';
  modificadorFuerza: number = 0;
  puntuacionDestreza: string = '';
  modificadorDestreza: number = 0;
  puntuacionConstitucion: string = '';
  modificadorConstitucion: number = 0;
  puntuacionSabiduria: string = '';
  modificadorSabiduria: number = 0;
  puntuacionInteligencia: string = '';
  modificadorInteligencia: number = 0;
  puntuacionCarisma: string = '';
  modificadorCarisma: number = 0;
  iniciativa: number = 0;
  dadoGolpe: string = '1d';
  claseSeleccionada: string = '';
  puntosGolpeMaximo: string = '';
  habilidadesMarcadas: any [] = [];
  salvacionesMarcadas: any [] = [];
  puntosGolpe: string = '';
  
  nivel: string = '1';
  valorCompetencia: number = 2;

  clases: any[] = [];
  datosPersonaje: any[] = [];
  error: any;
  checkboxesSeleccionados: number = 0;

  salvaciones: {
    fuerza: boolean;
    destreza: boolean;
    constitucion: boolean;
    sabiduria: boolean;
    inteligencia: boolean;
    carisma: boolean;
  } = {
    fuerza: false,
    destreza: false,
    constitucion: false,
    sabiduria: false,
    inteligencia: false,
    carisma: false,
  };

  textoSalvaciones: {
    salvacionFuerza: string;
    salvacionDestreza: string;
    salvacionConstitucion: string;
    salvacionInteligencia: string;
    salvacionSabiduria: string;
    salvacionCarisma: string;
  
  } = {
    salvacionFuerza: '',
    salvacionDestreza: '',
    salvacionConstitucion: '',
    salvacionInteligencia: '',
    salvacionSabiduria: '',
    salvacionCarisma: '',
  };

  habilidades: {
    acrobacias: boolean;
    tratoConAnimales: boolean;
    arcanos: boolean;
    atletismo: boolean;
    enganio: boolean;
    historia: boolean;
    perspicacia: boolean;
    intimidacion: boolean;
    investigacion: boolean;
    medicina: boolean;
    naturaleza: boolean;
    percepcion: boolean;
    interpretacion: boolean;
    persuasion: boolean;
    religion: boolean;
    juegoDeManos: boolean;
    sigilo: boolean;
    supervivencia: boolean;
  } = {
    acrobacias: false,
    tratoConAnimales: false,
    arcanos: false,
    atletismo: false,
    enganio: false,
    historia: false,
    perspicacia: false,
    intimidacion: false,
    investigacion: false,
    medicina: false,
    naturaleza: false,
    percepcion: false,
    interpretacion: false,
    persuasion: false,
    religion: false,
    juegoDeManos: false,
    sigilo: false,
    supervivencia: false,
  };

  textoHabilidades: {
    acrobacias: string;
    tratoConAnimales: string;
    arcanos: string;
    atletismo: string;
    enganio: string;
    historia: string;
    perspicacia: string;
    intimidacion: string;
    investigacion: string;
    medicina: string;
    naturaleza: string;
    percepcion: string;
    interpretacion: string;
    persuasion: string;
    religion: string;
    juegoDeManos: string;
    sigilo: string;
    supervivencia: string;
  } = {
    acrobacias: '',
    tratoConAnimales: '',
    arcanos: '',
    atletismo: '',
    enganio: '',
    historia: '',
    perspicacia: '',
    intimidacion: '',
    investigacion: '',
    medicina: '',
    naturaleza: '',
    percepcion: '',
    interpretacion: '',
    persuasion: '',
    religion: '',
    juegoDeManos: '',
    sigilo: '',
    supervivencia: '',
  };

  formularioBloqueado: boolean = false;

  
  actualizarModificadores(): void {
    

    if(this.puntuacionFuerza !== '') {
      this.modificadorFuerza = Math.floor((parseInt(this.puntuacionFuerza) - 10)/2);
    } else {
      this.modificadorFuerza = 0;
    }

    if(this.puntuacionDestreza !== ''){
      this.modificadorDestreza = Math.floor((parseInt(this.puntuacionDestreza) -10)/2);
      this.iniciativa = Math.floor((parseInt(this.puntuacionDestreza) -10)/2);
    }else {
      this.modificadorDestreza = 0;
    }

    if(this.puntuacionConstitucion !==''){
      this.modificadorConstitucion = Math.floor((parseInt(this.puntuacionConstitucion)-10)/2);
    }else{
      this.modificadorConstitucion = 0;
    }

    if(this.puntuacionSabiduria !==''){
      this.modificadorSabiduria = Math.floor((parseInt(this.puntuacionSabiduria)-10)/2);
    }else{
      this.modificadorSabiduria = 0;
    }

    if(this.puntuacionInteligencia !==''){
      this.modificadorInteligencia = Math.floor((parseInt(this.puntuacionInteligencia)-10)/2);
    }else{
      this.modificadorInteligencia = 0;
    }

    if(this.puntuacionCarisma !==''){
      this.modificadorCarisma = Math.floor((parseInt(this.puntuacionCarisma)-10)/2);
    }else{
      this.modificadorCarisma = 0;
    }

  }

  ngOnInit(): void {
    if(!this.cookieService.get("misDatos")){
      this.router.navigate(['']);
    }else{
      
      this.cargarClases();
      if (history.state.id != '0') {
        this.apollo.watchQuery({
          query: BUSCAR_PERSONAJE_POR_ID,
          variables: {
            id: parseInt(history.state.id)
          }
        }).valueChanges.subscribe(({data, error}:any) =>{
          this.datosPersonaje= data.encontrarPersonajePorId;
          this.cargarDatosPersonaje(data);
  
          if (history.state.bloqueado) {
            this.formularioBloqueado = true;
  
            
          }
  
          this.actualizarCompetencia();
          this.actualizarDadoGolpe();
          this.actualizarModificadores();
          this.guardarModificadorHabilidad();
        })
      }
    }
  }

  deshabilitarCheckboxes(claseCheckbox: string): void {
    const checkboxes = document.getElementsByClassName(claseCheckbox) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].disabled = true;
    }
  }

  cargarDatosPersonaje(data: any): void {
    this.nombre = data.encontrarPersonajePorId.nombrePersonaje;
    this.nivel = data.encontrarPersonajePorId.nivel;
    this.claseSeleccionada = data.encontrarPersonajePorId.clasePersonaje;
    this.trasfondo = data.encontrarPersonajePorId.trasfondo;
    this.raza = data.encontrarPersonajePorId.raza;
    this.alineamiento = data.encontrarPersonajePorId.alineamiento;
    this.experiencia = data.encontrarPersonajePorId.experiencia;

    this.puntuacionFuerza = data.encontrarPersonajePorId.fuerza;
    this.puntuacionCarisma = data.encontrarPersonajePorId.carisma;
    this.puntuacionConstitucion = data.encontrarPersonajePorId.constitucion;
    this.puntuacionDestreza = data.encontrarPersonajePorId.destreza;
    this.puntuacionInteligencia = data.encontrarPersonajePorId.inteligencia;
    this.puntuacionSabiduria = data.encontrarPersonajePorId.sabiduria;

    (this.habilidades as any)[data.encontrarPersonajePorId.competencia1] = true;
    (this.habilidades as any)[data.encontrarPersonajePorId.competencia2] = true;
    (this.habilidades as any)[data.encontrarPersonajePorId.competencia3] = true;
    (this.habilidades as any)[data.encontrarPersonajePorId.competencia4] = true;
    (this.habilidades as any)[data.encontrarPersonajePorId.competencia5] = true;

    this.apollo.watchQuery({
      query: BUSCAR_CLASE_POR_NOMBRE,
      variables:{
        nombre: this.claseSeleccionada
      }
    }).valueChanges.subscribe(({datosClase}:any) =>{
      (this.salvaciones as any)[datosClase.getClasesPorNombre.tiradaSalvacion1] = true;
      (this.salvaciones as any)[datosClase.getClasesPorNombre.tiradaSalvacion2] = true;
    })

    this.puntosGolpeMaximo = data.encontrarPersonajePorId.puntosGolpeMaximo;
    this.puntosGolpe = data.encontrarPersonajePorId.puntosGolpe;
  } 

  actualizarCompetencia(): void {

   let nivelPersonaje = parseInt(this.nivel);
  
    if (nivelPersonaje >= 17) {
      this.valorCompetencia = 6;
    } else if (nivelPersonaje >= 13) {
      this.valorCompetencia = 5;
    } else if (nivelPersonaje >= 9) {
      this.valorCompetencia = 4;
    } else if (nivelPersonaje >= 5) {
      this.valorCompetencia = 3;
    } else {
      this.valorCompetencia = 2;
    }
    
  }

  cargarClases():void{
    
      this.apollo.watchQuery({
        query: GET_ALL_CLASES
      }).valueChanges.subscribe(({data, error}:any) =>{
        this.clases= data.getAllClases;
        this.error = error;
      })
  
  }

  actualizarDadoGolpe(): void{

    this.apollo.watchQuery({
      query: BUSCAR_CLASE_POR_NOMBRE,
      variables:{
        nombre: this.claseSeleccionada
      }
    }).valueChanges.subscribe(({data}:any) =>{
      this.dadoGolpe = '1d' + data.getClasesPorNombre.dadoGolpe;
      this.salvaciones.carisma = false;
      this.salvaciones.constitucion = false;
      this.salvaciones.destreza = false;
      this.salvaciones.fuerza = false;
      this.salvaciones.inteligencia = false;
      this.salvaciones.sabiduria = false;
      (this.salvaciones as any)[data.getClasesPorNombre.tiradaSalvacion1] = true;
      (this.salvaciones as any)[data.getClasesPorNombre.tiradaSalvacion2] = true;
      this.guardarModificadorHabilidad();
    })
  }

  comprobarLimiteHabilidades(): void {
    const limiteCheckboxes = 5;
    const checkboxes = document.getElementsByClassName('habilidadesCheckbox') as HTMLCollectionOf<HTMLInputElement>;
  
    this.checkboxesSeleccionados = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
  
    if (this.checkboxesSeleccionados >= limiteCheckboxes) {
      for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
          checkboxes[i].disabled = true;
        }
      }
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = false;
      }
    }
  }
  
  comprobarLimiteSalvaciones(): void {
    const limiteCheckboxes = 2;
    const checkboxes = document.getElementsByClassName('salvacionCheckbox') as HTMLCollectionOf<HTMLInputElement>;
  
    this.checkboxesSeleccionados = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
  
    if (this.checkboxesSeleccionados >= limiteCheckboxes) {
      for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
          checkboxes[i].disabled = true;
        }
      }
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = false;
      }
    }
  }
  
  obtenerSalvacionesMarcadas() {
     this.salvacionesMarcadas = Object.entries(this.salvaciones)
      .filter(([_, marcada]) => marcada)
      .map(([salvacion, _]) => salvacion);
  
    console.log('Salvaciones marcadas:', this.salvacionesMarcadas);
  }
  
  obtenerHabilidadesMarcadas() {
     this.habilidadesMarcadas = Object.entries(this.habilidades)
      .filter(([_, marcada]) => marcada)
      .map(([habilidad, _]) => habilidad);
  
    console.log('Habilidades marcadas:', this.habilidadesMarcadas);
  }

   guardarModificadorHabilidad(): void{
   
   if (this.habilidades.acrobacias == true) {
      this.textoHabilidades.acrobacias = String(this.modificadorDestreza + this.valorCompetencia);
   } else {
      this.textoHabilidades.acrobacias = String(this.modificadorDestreza);
   }

   if (this.habilidades.tratoConAnimales == true) {
    this.textoHabilidades.tratoConAnimales = String(this.modificadorSabiduria + this.valorCompetencia);
   } else {
      this.textoHabilidades.tratoConAnimales = String(this.modificadorSabiduria);
   }

   if (this.habilidades.arcanos == true) {
    this.textoHabilidades.arcanos = String(this.modificadorInteligencia + this.valorCompetencia);
   } else {
      this.textoHabilidades.arcanos = String(this.modificadorInteligencia);
   }

   if (this.habilidades.atletismo == true) {
    this.textoHabilidades.atletismo = String(this.modificadorFuerza + this.valorCompetencia);
   } else {
      this.textoHabilidades.atletismo = String(this.modificadorFuerza);
   }

   if (this.habilidades.enganio == true) {
    this.textoHabilidades.enganio = String(this.modificadorCarisma + this.valorCompetencia);
   } else {
      this.textoHabilidades.enganio = String(this.modificadorCarisma);
   }

   if (this.habilidades.historia == true) {
    this.textoHabilidades.historia = String(this.modificadorInteligencia + this.valorCompetencia);
   } else {
      this.textoHabilidades.historia = String(this.modificadorInteligencia);
   }

   if (this.habilidades.perspicacia == true) {
    this.textoHabilidades.perspicacia = String(this.modificadorSabiduria + this.valorCompetencia);
   } else {
      this.textoHabilidades.perspicacia = String(this.modificadorSabiduria);
   }
   
   if (this.habilidades.intimidacion == true) {
    this.textoHabilidades.intimidacion = String(this.modificadorCarisma + this.valorCompetencia);
   } else {
      this.textoHabilidades.intimidacion = String(this.modificadorCarisma);
   }

   if (this.habilidades.investigacion == true) {
    this.textoHabilidades.investigacion = String(this.modificadorInteligencia + this.valorCompetencia);
   } else {
      this.textoHabilidades.investigacion = String(this.modificadorInteligencia);
   }

   if (this.habilidades.medicina == true) {
    this.textoHabilidades.medicina = String(this.modificadorSabiduria + this.valorCompetencia);
   } else {
      this.textoHabilidades.medicina = String(this.modificadorSabiduria);
   }

   if (this.habilidades.naturaleza == true) {
    this.textoHabilidades.naturaleza = String(this.modificadorInteligencia + this.valorCompetencia);
   } else {
      this.textoHabilidades.naturaleza = String(this.modificadorInteligencia);
   }

   if (this.habilidades.percepcion == true) {
    this.textoHabilidades.percepcion = String(this.modificadorSabiduria + this.valorCompetencia);
   } else {
      this.textoHabilidades.percepcion = String(this.modificadorSabiduria);
   }

   if (this.habilidades.interpretacion == true) {
    this.textoHabilidades.interpretacion = String(this.modificadorCarisma + this.valorCompetencia);
   } else {
      this.textoHabilidades.interpretacion = String(this.modificadorCarisma);
   }

   if (this.habilidades.persuasion == true) {
    this.textoHabilidades.persuasion = String(this.modificadorCarisma + this.valorCompetencia);
   } else {
      this.textoHabilidades.persuasion = String(this.modificadorCarisma);
   }
   
   if (this.habilidades.religion == true) {
    this.textoHabilidades.religion = String(this.modificadorInteligencia + this.valorCompetencia);
   } else {
      this.textoHabilidades.religion = String(this.modificadorInteligencia);
   }
   
   if (this.habilidades.juegoDeManos == true) {
    this.textoHabilidades.juegoDeManos = String(this.modificadorDestreza + this.valorCompetencia);
   } else {
      this.textoHabilidades.juegoDeManos = String(this.modificadorDestreza);
   }
   
   if (this.habilidades.sigilo == true) {
    this.textoHabilidades.sigilo = String(this.modificadorDestreza + this.valorCompetencia);
   } else {
      this.textoHabilidades.sigilo = String(this.modificadorDestreza);
   }
      
   if (this.habilidades.supervivencia == true) {
    this.textoHabilidades.supervivencia = String(this.modificadorSabiduria + this.valorCompetencia);
   } else {
      this.textoHabilidades.supervivencia = String(this.modificadorSabiduria);
   }

   if (this.salvaciones.fuerza == true) {
    this.textoSalvaciones.salvacionFuerza = String(this.modificadorFuerza + this.valorCompetencia);
   } else {
      this.textoSalvaciones.salvacionFuerza = String(this.modificadorFuerza);
   }

   if (this.salvaciones.destreza == true) {
    this.textoSalvaciones.salvacionDestreza = String(this.modificadorDestreza + this.valorCompetencia);
   } else {
      this.textoSalvaciones.salvacionDestreza = String(this.modificadorDestreza);
   }
   
   if (this.salvaciones.constitucion == true) {
    this.textoSalvaciones.salvacionConstitucion = String(this.modificadorConstitucion + this.valorCompetencia);
   } else {
      this.textoSalvaciones.salvacionConstitucion = String(this.modificadorConstitucion);
   }

   if (this.salvaciones.sabiduria == true) {
    this.textoSalvaciones.salvacionSabiduria = String(this.modificadorSabiduria + this.valorCompetencia);
   } else {
      this.textoSalvaciones.salvacionSabiduria = String(this.modificadorSabiduria);
   }

   if (this.salvaciones.inteligencia == true) {
    this.textoSalvaciones.salvacionInteligencia = String(this.modificadorInteligencia + this.valorCompetencia);
   } else {
      this.textoSalvaciones.salvacionInteligencia = String(this.modificadorInteligencia);
   }

   if (this.salvaciones.carisma == true) {
    this.textoSalvaciones.salvacionCarisma = String(this.modificadorCarisma + this.valorCompetencia);
   } else {
      this.textoSalvaciones.salvacionCarisma = String(this.modificadorCarisma);
   }
   
 }

 guardarPersonaje(): void {
    this.obtenerHabilidadesMarcadas()
    const cookieData = this.cookieService.get("misDatos");
    const datosCookie = JSON.parse(cookieData);
    console.log(datosCookie[1])
    console.log(datosCookie[0])
    console.log(datosCookie[2])

    if (history.state.id == '0') {
      this.apollo
      .mutate({
        mutation: GUARDAR_PERSONAJE,
        variables: {
         
          nombrePersonaje: this.nombre,
          nivel: parseInt(this.nivel),
          experiencia: parseInt(this.experiencia),
          raza: this.raza,
          clasePersonaje: this.claseSeleccionada,
          subclasePersonaje: null,
          puntosGolpe: parseInt(this.puntosGolpe),
          bonificadorCompetencia: this.valorCompetencia,
          fuerza: parseInt(this.puntuacionFuerza),
          destreza: parseInt(this.puntuacionDestreza),
          constitucion: parseInt(this.puntuacionConstitucion),
          inteligencia: parseInt(this.puntuacionInteligencia),
          sabiduria: parseInt(this.puntuacionSabiduria),
          carisma: parseInt(this.puntuacionCarisma),
          competencia1: this.habilidadesMarcadas[0],
          competencia2: this.habilidadesMarcadas[1],
          competencia3: this.habilidadesMarcadas[2],
          competencia4: this.habilidadesMarcadas[3],
          competencia5: this.habilidadesMarcadas[4],
          usuarioId: parseInt(datosCookie[1]),
          alineamiento: this.alineamiento,
          trasfondo: this.trasfondo,
          puntosGolpeMaximo: parseInt(this.puntosGolpeMaximo),  
          
        },
      }).subscribe(
        (response) => {
          console.log('Personaje creado exitosamente:', response);
          this.router.navigate(['lista-personajes'])
          .then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error al crear personaje:', error);
        }
      );
    } else {
      this.apollo
      .mutate({
        mutation: MODIFICAR_PERSONAJE,
        variables: {
          id: parseInt(history.state.id),
          nombrePersonaje: this.nombre,
          nivel: parseInt(this.nivel),
          experiencia: parseInt(this.experiencia),
          raza: this.raza,
          clasePersonaje: this.claseSeleccionada,
          subclasePersonaje: null,
          puntosGolpe: parseInt(this.puntosGolpe),
          bonificadorCompetencia: this.valorCompetencia,
          fuerza: parseInt(this.puntuacionFuerza),
          destreza: parseInt(this.puntuacionDestreza),
          constitucion: parseInt(this.puntuacionConstitucion),
          inteligencia: parseInt(this.puntuacionInteligencia),
          sabiduria: parseInt(this.puntuacionSabiduria),
          carisma: parseInt(this.puntuacionCarisma),
          competencia1: this.habilidadesMarcadas[0],
          competencia2: this.habilidadesMarcadas[1],
          competencia3: this.habilidadesMarcadas[2],
          competencia4: this.habilidadesMarcadas[3],
          competencia5: this.habilidadesMarcadas[4],
          usuarioId: parseInt(datosCookie[1]),
          alineamiento: this.alineamiento,
          trasfondo: this.trasfondo,
          puntosGolpeMaximo: parseInt(this.puntosGolpeMaximo),  
          
        },
      }).subscribe(
        (response) => {
          console.log('Personaje modificado exitosamente:', response);
          this.router.navigate(['lista-personajes']);
        },
        (error) => {
          console.error('Error al modificar personaje:', error);
        }
      );
    }
 
    
      
}

}
