import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { prjTimesheetEntity } from '../dto/prjTimesheet-entity.model';
@Injectable({
  providedIn: 'root'
})
export class prjTimesheetEntityService {

  private apiUrl = '/api/prjTimesheet-entities';

  constructor(private http: HttpClient) {}

  getAll(): Observable<prjTimesheetEntity[]> {
    return this.http.get<prjTimesheetEntity[]>(this.apiUrl);
  }

  getById(id: string): Observable<prjTimesheetEntity> {
    return this.http.get<prjTimesheetEntity>(`${this.apiUrl}/${id}`);
  }

  create(entity: prjTimesheetEntity): Observable<prjTimesheetEntity> {
    return this.http.post<prjTimesheetEntity>(this.apiUrl, entity);
  }

  update(id: string, entity: prjTimesheetEntity): Observable<prjTimesheetEntity> {
    return this.http.put<prjTimesheetEntity>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
