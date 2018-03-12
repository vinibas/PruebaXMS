import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ObterUsuario } from '../model/usuario';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  private usuarios: ObterUsuario[];
  private processandoRequisicao = true;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.obterTodos()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        this.processandoRequisicao = false;
      }, error => this.processandoRequisicao = false);
  }
}
