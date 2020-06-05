export interface Usuario {
    avatar?: string;
    _id?: string;
    nombre?: string;
    email?: string;
    password?: string;
}

export interface Post {
    imagenes?: string[];
    _id?: string;
    mensaje?: string;
    coords?: string;
    usuario?: Usuario;
    created?: Date;
}

export interface RespuestaPosts {
    ok: boolean;
    posts: Post[];
    pagina: number;
}
