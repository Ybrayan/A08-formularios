import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.css']
})
export class TempleComponent implements OnInit {

  usuario = {
    nombre: "Yhors",
    apellido: "Brayan",
    correo: "ybrayan13@gmail.com",
    pais:"COL",
    genero:"M"
  }

  paises:any[]=[];

  constructor(private PaisService:PaisService) { }

  ngOnInit(): void {
    this.PaisService.getPaises()
      .subscribe(paises=>{
        this.paises=paises;
        this.paises.unshift({
          nombre:"Seleccione un Pais",
          codigo:""
        });
        /* console.log(this.paises); */
        
      });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    console.log(forma.value);


  }

}
