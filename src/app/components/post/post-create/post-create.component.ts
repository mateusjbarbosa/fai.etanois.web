import { PostService } from '../post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


  post: Post = {
    name: undefined,
    cnpj: undefined,
    flag_of_fuel_station: undefined,
    address: undefined
    // cep: '65068-687',
    // email: 'posto@hotmail.com',
    // phone_number: '(35)3473-1221',
    // payment_card: 1234567898745632,
    // password: '12345678',
    // openning_hours: '24h',
    // restaurant: false,
    // car_wash: true,
    // mechanical: false
  }

  // Aqui damos um nome para nosso formulário
  // E ele precisa ser do tipo FormGroup
  formulario: FormGroup;
  // Via DI, nós obtemos o FormBuilder.
  constructor(
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.criarFormularioDeUsuario();
  }

  enviarDados() {
    const dadosFormulario = this.formulario.value;
    const usuario = (
      dadosFormulario.name,
      dadosFormulario.cnpj,
      dadosFormulario.flag_of_fuel_station,
      dadosFormulario.address
    );
    alert(`O usuário ${usuario.name} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(usuario)}`);
    this.formulario.reset();
  }

  criarFormularioDeUsuario() {
    this.formulario = this.fb.group({
      name: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ])],

        cnpj: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ])],
      
      flag_of_fuel_station: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      ],
      address: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ])],

    });
  }



  createPost(): void {
    console.log(this.post);
    this.postService.create(this.post).subscribe(() => {
      this.postService.showMessage('Posto criado com sucesso!')
      this.router.navigate(['post/created/successfully'])
    })
  }
  cancel(): void {
    this.router.navigate(['/post'])
  }

  // Propriedades do formulário que vamos utilizar para obter os erros
  get name() {
    return this.formulario.get('name');
  }
  get cnpj() {
    return this.formulario.get('cnpj');
  }

  get flag_of_fuel_station() {
    return this.formulario.get('flag_of_fuel_station');
  }

  get address() {
    return this.formulario.get('address');
  }

}
