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

}
