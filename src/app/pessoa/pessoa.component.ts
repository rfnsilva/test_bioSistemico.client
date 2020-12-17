import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Pessoa } from '../models/Pessoa';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})

export class PessoaComponent implements OnInit {
  title = 'pessoa';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    sobrenome: new FormControl(''),
    cpf: new FormControl(''),
    perfil: new FormControl('')
  });
  readonly apiURL : string;
  public rota: Router;
  public modal_id: number;
  public modal_nome: string = '';
  public modal_sobrenome: string = '';
  public modal_cpf: string = '';
  public modal_perfil: string = '';

  @Input()
  public pessoas: any;

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'http://localhost:3333';
    this.rota = r;
  }

  ngOnInit(): void {
    this.javascript();

    const headers= new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');

    this.http.get(`${this.apiURL}/getAllPessoa`, { 'headers': headers })
     .subscribe(result => {
       this.pessoas = result;
     });
  }

  Action(id_button: number, id: number, nome: string, sobrenome: string, cpf: string, perfil: string) {
    //edit = 1 del = 2 detalhes = 3
    if (id_button === 2) {
      if(confirm("confirma delete da pessoa: " + id)) {
        const headers= new HttpHeaders()
         .set('content-type', 'application/json')
         .set('Access-Control-Allow-Origin', '*');

        this.http.delete(`${this.apiURL}/deletePessoaById/${id}`, { 'headers': headers })
         .subscribe(result => {
           this.pessoas = result;
         });
      }
    }

    if (id_button === 1 || id_button === 3) {
      this.modal_id = id;
      this.modal_nome = nome;
      this.modal_sobrenome = sobrenome;
      this.modal_cpf = cpf;
      this.modal_perfil = perfil;
    }
  }

  editar(pessoa: Pessoa) {
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');

    this.http.put(`${this.apiURL}/updatePessoaById/${this.modal_id}`, pessoa, { 'headers': headers })
     .subscribe(result => {
       this.pessoas = result;
     });
  }

  onSubmit() {
    this.editar(this.profileForm.value);
  }

  add(pessoa: Pessoa) {
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');

    this.http.post(`${this.apiURL}/createPessoa`, pessoa, { 'headers': headers })
     .subscribe(result => {
       this.pessoas = result;
     });
  }

  onSubmit1() {
    this.add(this.profileForm.value);
  }

  javascript(){
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    $(document).ready(function() {
      function toggleSidebar() {
        $(".button").toggleClass("active");
        $("main").toggleClass("move-to-left");
        $(".sidebar-item").toggleClass("active");
      }

      $(".button").on("click tap", function() {
        toggleSidebar();
      });

      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          toggleSidebar();
        }
      });
    });
  }
}
