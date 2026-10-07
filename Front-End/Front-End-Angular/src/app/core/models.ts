export interface PersonaRef {
  id: number;
}

export interface Experiencia {
  idExperiencia?: number;
  empresa: string;
  puesto: string;
  imagen?: string | null;
  descripcion?: string | null;
  inicio?: string | null;
  fin?: string | null;
  persona?: PersonaRef;
}

export interface Educacion {
  idEducacion?: number;
  escuela: string;
  titulo: string;
  nivel?: string | null;
  imagen?: string | null;
  carrera?: string | null;
  estado?: string | null;
  puntaje?: number;
  inicio?: string | null;
  fin?: string | null;
  persona?: PersonaRef;
}

export type TipoSkill = 'hard' | 'soft';

export interface Skill {
  idSkill?: number;
  nombreSkill: string;
  tipoSkill: TipoSkill;
  dominio: number;
  persona?: PersonaRef;
}

export interface ImagenProyecto {
  id: number;
  name?: string;
  imagenUrl: string;
  imagenId?: string;
}

export interface Proyecto {
  idProyecto?: number;
  nombreProyecto: string;
  fecha?: string | null;
  descripcion?: string | null;
  link?: string | null;
  listaDeImagenProyectos?: ImagenProyecto[] | null;
  persona?: PersonaRef;
}

export interface Persona {
  id: number;
  documento?: number | null;
  nombre: string;
  apellido: string;
  fechaNacimiento?: string | null;
  telefono?: string | null;
  email?: string | null;
  puesto?: string | null;
  calle?: string | null;
  numero?: string | null;
  localidad?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  zip?: string | null;
  logoInstitucionUno?: string | null;
  institucionUno?: string | null;
  linkInstitucionUno?: string | null;
  logoInstitucionDos?: string | null;
  institucionDos?: string | null;
  linkInstitucionDos?: string | null;
  acercaDe?: string | null;
  listaDeExperiencias: Experiencia[];
  listaDeEducacion: Educacion[];
  listaDeSkills: Skill[];
  listaDeProyectos: Proyecto[];
}

export interface ImagenSubida {
  id: number;
  name?: string;
  imagenUrl: string;
  imagenId?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiryDuration: number;
}
