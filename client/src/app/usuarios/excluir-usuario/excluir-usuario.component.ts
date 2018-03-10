import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-excluir-usuario',
  templateUrl: './excluir-usuario.component.html',
  styleUrls: ['./excluir-usuario.component.scss']
})
export class ExcluirUsuarioComponent implements OnInit {

  public usuarioId = '';
  public usuario: Usuario;
  public excluidoComSucesso = false;
  public excluidoComErro = false;

  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.usuarioId = params['id'];
      });

    this.usuarioService.obterUsuario(this.usuarioId)
    .subscribe( usuario => { this.usuario = usuario; });
  }

  public excluirUsuario() {
    this.usuarioService.excluirUsuario(this.usuarioId)
      .subscribe(
      usuario => this.excluidoComSucesso = true,
      error => this.excluidoComErro = true);
  }

  onClosedAlert($event) {
    this.router.navigate(['/listar']);
  }
}
