import { Component, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from '../generic-form-validator';
import { UsuarioService } from '../usuario.service';
import { AdicionarUsuario } from '../model/usuario';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AlertModule } from 'ngx-bootstrap/alert';
import { FormUtil } from '../../../utils/form.util';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.scss']
})
export class AdicionarUsuarioComponent implements AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  usuarioForm: FormGroup;

  private displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  private submetidoComSucesso = false;
  private submetidoComErro = false;

  private processandoRequisicao = false;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.createForm();

    this.validationMessages = {
      nombre: { maxlength: 'El usuario no puede tener más de 100 caracteres.'},
      email: { required: 'El e-mail es obligatorio', email: 'El e-mail está inválido' },
      contrasena: { required: 'La contraseña es obligatoria',
        pattern: 'La contraseña debe tener entre 3 y 100 caracteres.'},
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.pattern('^$|^.{3,100}$')]],
      pais: ['']
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.usuarioForm.valueChanges, ...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.usuarioForm);
    });
  }

  adicionarUsuario() {
    this.displayMessage = this.genericValidator.processMessages(this.usuarioForm);

    if (this.usuarioForm.dirty && this.usuarioForm.valid) {
      this.processandoRequisicao = true;
      this.submetidoComSucesso = false;
      this.submetidoComErro = false;

      const u = Object.assign({}, new AdicionarUsuario(), this.usuarioForm.value);
      FormUtil.converterBrancosEmNulos(u);


      this.usuarioService.adicionarUsuario(u)
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
    this.usuarioForm.reset();
    this.usuarioForm.controls['pais'].setValue('');
    this.errors = [];
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
