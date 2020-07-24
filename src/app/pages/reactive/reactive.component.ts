import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get departamentoNoValido() {
    return this.forma.get('direccion.departamento').invalid && this.forma.get('direccion.departamento').touched;
  }

  get municipioNoValido() {
    return this.forma.get('direccion.municipio').invalid && this.forma.get('direccion.municipio').touched;
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      usuario: ['', Validators.required, this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        departamento: ['', Validators.required],
        municipio: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners() {
    this.forma.valueChanges.subscribe(valor => {
      console.log(valor);
    })
    this.forma.statusChanges.subscribe(status=>console.log({status}));
  }

  cargarDataFormulario() {

    /* Todas son obligatorias... o almenos vacias('') */

    /* this.forma.setValue({
      nombre: 'yhors',
      apellido: 'brayan',
      correo: 'a@gmail.com',
      direccion: {
        departamento: 'Antioquia',
        municipio: 'med'
      }
    }); */

    /* Se recetea todo y se puede mandar los valores */

    this.forma.reset({
      nombre: 'yhors',
      apellido: 'brayan',
      correo: 'a@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        departamento: 'Antioquia',
        municipio: 'med'
      }
    });

    /* Una forma de autocompletar la tabla */

    /* ['Comer','Dormir','Robar'].forEach(valor => this.pasatiempos.push(this.fb.control(valor))); */
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('Nuevo Elemento', Validators.required))
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }
      });
    }
    console.log(this.forma);

    /* Posteo de la Informacion */

    this.forma.reset({
      nombre: 'eo'
    });

  }

}
