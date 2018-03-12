abstract class Usuario {
    nombre: string;
    email: string;
    pais: string;

    get nomePais(): string {
        switch (this.pais) {
            case 'Br':
                return 'Brasil';
            case 'Cl':
                return 'Chile';
            default:
                return this.pais;
        }
    }
}

export class ObterUsuario extends Usuario {
    id: string;
}

export class AdicionarUsuario extends Usuario {
    contrasena: string;
}

export class EditarUsuario extends Usuario {
    id: string;
    contrasena: string;
}
