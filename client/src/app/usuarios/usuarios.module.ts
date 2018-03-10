import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';

import { AdicionarUsuarioComponent } from './adicionar-usuario/adicionar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ExcluirUsuarioComponent } from './excluir-usuario/excluir-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';

import { UsuarioService } from './usuario.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    AlertModule,
  ],
  declarations: [
    AdicionarUsuarioComponent,
    EditarUsuarioComponent,
    ExcluirUsuarioComponent,
    ListarUsuarioComponent
  ],
  providers: [ UsuarioService ]
})
export class UsuarioModule { }
