export class Usuario {
    id: string;
    nombre: string;
    email: string;
    contrasena: string;
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
