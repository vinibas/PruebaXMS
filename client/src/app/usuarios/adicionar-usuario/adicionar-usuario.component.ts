import { Component, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from '../generic-form-validator';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../model/usuario';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AlertModule } from 'ngx-bootstrap/alert';

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
      email: { required: 'El e-mail es obligatorio', email: 'El e-mail está inválido' },
      contrasena: { required: 'La contraseña es obligatoria' },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nombre: [''],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
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
    this.processandoRequisicao = true;
    this.submetidoComSucesso = false;
    this.submetidoComErro = false;

    this.displayMessage = this.genericValidator.processMessages(this.usuarioForm);

    if (this.usuarioForm.dirty && this.usuarioForm.valid) {
      const u = Object.assign({}, new Usuario(), this.usuarioForm.value);

      this.usuarioService.adicionarUsuario(u)
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
