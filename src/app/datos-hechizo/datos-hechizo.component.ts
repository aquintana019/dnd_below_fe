import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {GET_ALL_HECHIZOS} from '../graphql.operations';

@Component({
  selector: 'app-datos-hechizo',
  templateUrl: './datos-hechizo.component.html',
  styleUrls: ['./datos-hechizo.component.css']
})
export class DatosHechizoComponent implements OnInit {

  hechizos: any[] = [];
  error: any;

  constructor(private apollo: Apollo){}

  ngOnInit():void{
    this.apollo.watchQuery({
      query: GET_ALL_HECHIZOS
    }).valueChanges.subscribe(({data, error}:any) =>{
      this.hechizos= data.getAllHechizos;
      this.error = error;
    })
  }

}
