import { Component, OnInit } from '@angular/core';
import { ObterUsuario } from '../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-excluir-usuario',
  templateUrl: './excluir-usuario.component.html',
  styleUrls: ['./excluir-usuario.component.scss']
})
export class ExcluirUsuarioComponent implements OnInit {

  private usuarioId = '';
  private usuario: ObterUsuario;
  private excluidoComSucesso = false;
  private excluidoComErro = false;
  private processandoRequisicao = true;

  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.usuarioId = params['id'];
      });

    this.usuarioService.obterUsuario(this.usuarioId)
    .subscribe( usuario => {
      this.usuario = usuario;
      this.processandoRequisicao = false;
    });
  }

  public excluirUsuario() {
    this.processandoRequisicao = true;
    this.usuarioService.excluirUsuario(this.usuarioId)
      .subscribe(
      usuario => {
        this.excluidoComSucesso = true;
        this.processandoRequisicao = false;
      }, error => {
        this.excluidoComErro = true;
        this.processandoRequisicao = false;
      });
  }

  onClosedAlert($event) {
    this.router.navigate(['/listar']);
  }
}
