import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CrearPersonajeComponent} from './crear-personaje/crear-personaje.component'
import {CrearUsuarioComponent} from './crear-usuario/crear-usuario.component'
import {DatosClaseComponent} from './datos-clase/datos-clase.component'
import {DatosHechizoComponent} from './datos-hechizo/datos-hechizo.component'
import {DatosPersonajeComponent} from './datos-personaje/datos-personaje.component'
import { DatosRazaComponent } from './datos-raza/datos-raza.component'
import { DatosSubclaseComponent } from './datos-subclase/datos-subclase.component'
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component'
import { PerfilComponent } from './perfil/perfil.component'


const routes: Routes = [
{ path: '', component: HomeComponent},
{path: 'crear-personaje', component: CrearPersonajeComponent},
{path: 'crear-usuario', component: CrearUsuarioComponent},
{path: 'datos-clase', component: DatosClaseComponent},
{path: 'datos-hechizo', component:DatosHechizoComponent },
{path: 'datos-personaje', component:DatosPersonajeComponent},
{path: 'datos-raza', component:DatosRazaComponent},
{path: 'datos-subclase', component: DatosSubclaseComponent},
{path: 'lista-personajes', component: ListaPersonajesComponent},
{path: 'perfil', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
