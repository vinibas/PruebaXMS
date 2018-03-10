import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdicionarUsuarioComponent } from './adicionar-usuario/adicionar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ExcluirUsuarioComponent } from './excluir-usuario/excluir-usuario.component';

const usuarioRoutes: Routes = [
    { path: 'adicionar', component: AdicionarUsuarioComponent },
    { path: 'listar', component: ListarUsuarioComponent },
    { path: 'editar/:id', component: EditarUsuarioComponent },
    { path: 'excluir/:id', component: ExcluirUsuarioComponent },
];

@NgModule({
    imports: [RouterModule.forChild(usuarioRoutes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {}
