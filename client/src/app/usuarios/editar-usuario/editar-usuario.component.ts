import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, OnDestroy } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../usuario.service';
import { EditarUsuario } from '../model/usuario';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GenericValidator } from '../generic-form-validator';
import { FormUtil } from '../../../utils/form.util';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  usuarioForm: FormGroup;
  usuario: EditarUsuario;
  usuarioId: string;

  private displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  private submetidoComSucesso = false;
  private submetidoComErro = false;

  private processandoRequisicao = true;
  private mostrarEsperaFormulario = true;

  private sub: any;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();

    this.validationMessages = {
      nombre: { maxlength: 'El usuario no puede tener más de 100 caracteres.'},
      email: { required: 'El e-mail es obligatorio', email: 'El e-mail está inválido' },
      contrasena: { pattern: 'La contraseña debe tener entre 3 y 100 caracteres.'},
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.pattern('^$|^.{3,100}$')]],
      pais: ['']
    });
  }

  preencherFormUsuario(): void {
    this.usuarioForm.patchValue({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      contrasena: '',
      pais: this.usuario.pais,
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
        this.usuario = Object.assign(new EditarUsuario(), usuario);
        this.preencherFormUsuario();
        this.processandoRequisicao = false;
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

      const u: EditarUsuario = Object.assign({}, new EditarUsuario(), this.usuarioForm.value);
      FormUtil.converterBrancosEmNulos(u);

      u.id = this.usuario.id;

      this.usuarioService.editarUsuario(u)
        .subscribe(
          result => {
            this.onSaveComplete();
            this.processandoRequisicao = false;
            this.submetidoComSucesso = true;
          },
          error => {
            console.log(error);
            this.errors = this.parseErrorsModelState(JSON.parse(error._body).ModelState);
            this.processandoRequisicao = false;
            this.submetidoComErro = true;
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
