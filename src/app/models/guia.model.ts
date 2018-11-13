export interface Guia1 {
    estado:       number;
    Guia:         Guia2;
    lugares:      Lugare[];
    idiomas:      Idioma[];
    titulos:      Titulo[];
    comentarios:  Comentario[];
    valoraciones: any[];
}

export interface Guia2 {
    id:               string;
    nombre:           string;
    apellido:         string;
    email:            string;
    pais:          string;
    fecha_nacimiento: string;
    sexo:             string;
    telefono:         string;
    disponibilidad:   string;
    foto:             string;
}

export interface Idioma {
    Idioma: string;
}

export interface Lugare {
    Lugar:                  string;
    precio_x_hora:          string;
    precio_x_persona_extra: string;
    lugar_de_encuentro:     string;
}

export interface Titulo {
    Titulo: string;
}

export interface Comentario{
    nombre:string;
    apellido:string;
    comentario:string;
}