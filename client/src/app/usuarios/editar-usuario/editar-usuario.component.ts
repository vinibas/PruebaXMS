import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, OnDestroy } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../usuario.service';
import { Usuario } from '../model/usuario';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GenericValidator } from '../generic-form-validator';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  usuarioForm: FormGroup;
  usuario: Usuario;
  usuarioId: string;

  private displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  private submetidoComSucesso = false;
  private submetidoComErro = false;

  private processandoRequisicao = false;

  private sub: any;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();

    this.validationMessages = {
      email: { required: 'El e-mail es obligatorio', email: 'El e-mail está inválido' },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nombre: [''],
      email: ['', [Validators.required, Validators.email]],
      contrasena: [''],
      pais: ['']
    });
  }

  preencherFormUsuario(usuario: Usuario): void {
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      contrasena: '',
      pais: usuario.pais,
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => this.usuarioId = params['id']);

    this.obterUsuario();
  }

  obterUsuario() {
    this.usuarioService.obterUsuario(this.usuarioId)
      .subscribe(usuario => {
        this.usuario = usuario;
        this.preencherFormUsuario(usuario);
      });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.usuarioForm.valueChanges, ...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.usuarioForm);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editarUsuario() {
    this.displayMessage = this.genericValidator.processMessages(this.usuarioForm);

    if (this.usuarioForm.dirty && this.usuarioForm.valid) {
      this.processandoRequisicao = true;
      this.submetidoComSucesso = false;
      this.submetidoComErro = false;

      const u: Usuario = Object.assign({}, new Usuario(), this.usuarioForm.value);

      u.id = this.usuario.id;

      this.usuarioService.editarUsuario(u)
        .subscribe(
          result => {
            this.onSaveComplete();
            this.submetidoComSucesso = true;
            this.processandoRequisicao = false;
          },
          error => {
            console.log(error);
            this.errors = this.parseErrorsModelState(JSON.parse(error._body).ModelState);
            this.submetidoComErro = true;
            this.processandoRequisicao = false;
          });
    }
  }

  onSaveComplete(): void {
    this.usuarioForm.controls['contrasena'].reset();
    this.errors = [];
    this.obterUsuario();
  }

  private parseErrorsModelState(modelState: any): string[] {
    const errors = [];
    // tslint:disable-next-line:forin
    for (const key in modelState) {
      for (let i = 0; i < modelState[key].length; i++) {
        errors.push(modelState[key][i]);
      }
    }

    return errors;
  }
}
