import { HttpClient } from '@angular/common/http';
import { Template } from '../../models/Template';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class TemplateService {
    constructor(private http: HttpClient) { }
    templateUrl = 'https://catfact.ninja/fact';
    getTemplates(){
        return this.http.get<Template[]>(this.templateUrl);
    }
}