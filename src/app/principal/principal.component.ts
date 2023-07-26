import { Component } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  // Obj cliente
  cliente = new Cliente();

  // var para visibilidade dos btn
  btnCadastro:boolean = true;

  // Var para ver a tabela
  tabela:boolean = true;

  // Json de clientes 
  clientes:Cliente[] = [];

  // Construyor

  constructor(private servico:ClienteService){

  }

  // Método de seleção
  selecionar():void{
    this.servico.selecionar().subscribe(retorno => this.clientes = retorno);
  }

  cadastrar():void{
    this.servico.cadastrar(this.cliente).subscribe(retorno => {
      
      // Casdastra o cliente no vetor
      this.clientes.push(retorno);

      // Limpa o form
      this.cliente = new Cliente();

      // Mensagem
      alert('Cliente cadastrado!');

    });
  }
  // método para selcionar 1 cliente
  selecionarCliente(p:number):void {
    // selecionar cliente do vetor
    this.cliente = this.clientes[p];

    this.btnCadastro= false;

    this.tabela = false;
  }

  // metodo editar clientes
  editar():void{
    this.servico.editar(this.cliente).subscribe(retorno => {
      // obter posição do vetor cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.id == retorno.id;
      });

      // Alterar os dados do cliente no vetor 
      this.clientes[posicao] = retorno;

      // limpa form
      this.cliente = new Cliente();

      // Visibilidade dos btn
      this.btnCadastro = true;

      // visibilidade da tabela
      this.tabela = true;

      alert('Cliente alterado!');
    });
  }

 // remover clientes
 remover():void{
  this.servico.remover(this.cliente.id).subscribe(retorno => {
    // obter posição do vetor cliente
    let posicao = this.clientes.findIndex(obj => {
      return obj.id == this.cliente.id;
    });

    // remover os dados do cliente no vetor 
    this.clientes.splice(posicao, 1);

    // limpa form
    this.cliente = new Cliente();

    // Visibilidade dos btn
    this.btnCadastro = true;

    // visibilidade da tabela
    this.tabela = true;

    alert('Cliente deletado!');
  });
  }

  // metodo cancelar
  cancelar():void{
     // limpa form
     this.cliente = new Cliente();

     // Visibilidade dos btn
     this.btnCadastro = true;
 
     // visibilidade da tabela
     this.tabela = true;
  }
  // Método de inicialização
  ngOnInit(){
    this.selecionar();
  }
}
