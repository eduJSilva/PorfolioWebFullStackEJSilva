import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Educacion,
  Experiencia,
  ImagenSubida,
  Persona,
  Proyecto,
  Skill,
} from './models';

/** Acceso a la API REST del portfolio (mismos endpoints que el back-end Spring Boot). */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  // Lectura pública
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.url}ver/personas`);
  }
  getFotos(): Observable<ImagenSubida[]> {
    return this.http.get<ImagenSubida[]>(`${this.url}list/fotos`);
  }
  getPortadas(): Observable<ImagenSubida[]> {
    return this.http.get<ImagenSubida[]>(`${this.url}list/imagen`);
  }

  // Persona
  updatePersona(persona: Partial<Persona>): Observable<void> {
    return this.http.patch<void>(`${this.url}modificar/persona`, persona);
  }
  updateAcercaDe(personaId: number, acercaDe: string): Observable<void> {
    return this.http.patch<void>(`${this.url}modificar/acercade/${personaId}`, { acercaDe });
  }

  // Experiencia
  createExperiencia(e: Experiencia): Observable<void> {
    return this.http.post<void>(`${this.url}new/experiencia`, e);
  }
  updateExperiencia(id: number, e: Experiencia): Observable<void> {
    return this.http.patch<void>(`${this.url}modificar/experiencia/${id}`, e);
  }
  deleteExperiencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}delete/experiencia/${id}`);
  }

  // Educación
  createEducacion(e: Educacion): Observable<void> {
    return this.http.post<void>(`${this.url}new/educacion`, e);
  }
  updateEducacion(id: number, e: Educacion): Observable<void> {
    return this.http.patch<void>(`${this.url}modificar/educacion/${id}`, e);
  }
  deleteEducacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}delete/educacion/${id}`);
  }

  // Skills
  createSkill(s: Skill): Observable<void> {
    return this.http.post<void>(`${this.url}new/skill`, s);
  }
  updateSkill(id: number, s: Skill): Observable<void> {
    return this.http.patch<void>(`${this.url}modificar/skill/${id}`, s);
  }
  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}delete/skill/${id}`);
  }

  // Proyectos
  createProyecto(p: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.url}new/proyecto`, p);
  }
  updateProyecto(id: number, p: Proyecto): Observable<void> {
    return this.http.patch<void>(`${this.url}modificar/proyecto/${id}`, p);
  }
  deleteProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}delete/proyecto/${id}`);
  }
  uploadImagenProyecto(proyectoId: number, file: File): Observable<string> {
    return this.http.post(`${this.url}upload/imagen-proyecto/${proyectoId}`, this.form(file), {
      responseType: 'text',
    });
  }
  replaceImagenProyecto(proyectoId: number, file: File): Observable<string> {
    return this.http.put(`${this.url}modificar/imagen-proyecto/${proyectoId}`, this.form(file), {
      responseType: 'text',
    });
  }

  // Foto de perfil y portada
  uploadFoto(file: File): Observable<string> {
    return this.http.post(`${this.url}upload/foto`, this.form(file), { responseType: 'text' });
  }
  uploadPortada(file: File): Observable<string> {
    return this.http.post(`${this.url}upload/imagen`, this.form(file), { responseType: 'text' });
  }

  private form(file: File): FormData {
    const data = new FormData();
    data.append('multipartFile', file);
    return data;
  }
}
