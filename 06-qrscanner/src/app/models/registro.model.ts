export class Registro {
    public format: string;
    public texto: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor(format: string, text: string) {
        this.format = format;
        this.texto = text;

        this.created = new Date();
        this.determinarTipo();
    }

    private determinarTipo() {
        const inicioTexto = this.texto.substring(0, 4);
        console.log('tipo', inicioTexto);

        switch (inicioTexto) {
            case 'http':
                this.type = 'http';
                this.icon = 'globe';
                break;
            case 'geo:':
                this.type = 'geo';
                this.icon = 'pin';
                break;
            default:
                this.type = 'No configurado';
                this.icon = 'create';
                break;
        }

    }
}
