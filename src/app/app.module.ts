import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { CrearPersonajeComponent } from './crear-personaje/crear-personaje.component';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';
import { DatosPersonajeComponent } from './datos-personaje/datos-personaje.component';
import { DatosRazaComponent } from './datos-raza/datos-raza.component';
import { DatosClaseComponent } from './datos-clase/datos-clase.component';
import { DatosSubclaseComponent } from './datos-subclase/datos-subclase.component';
import { DatosHechizoComponent } from './datos-hechizo/datos-hechizo.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    CrearUsuarioComponent,
    CrearPersonajeComponent,
    ListaPersonajesComponent,
    DatosPersonajeComponent,
    DatosRazaComponent,
    DatosClaseComponent,
    DatosSubclaseComponent,
    DatosHechizoComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
