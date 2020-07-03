import { Injectable } from '@angular/core';
import { APP_API } from 'src/app/app.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { header_object } from 'src/app/authorization';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    endpoint: string = ` ${APP_API}fuel_station`
    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-success']
        })
    }
/*caso aconteça erro no post, chamo método errorHandler*/
    create(post: Post): Observable<Post> {
        return this.http.post<Post>(`${this.endpoint}/new`, post).pipe(
            map((obj )=> obj),
            catchError(e => this.errorHandler(e))
        );
    }

  //  read(): Observable<Post[]> {
   //     return this.http.get<Post[]>(this.endpoint).pipe(
   //         map((obj )=> obj),
   //         catchError(e => this.errorHandler(e))
   //     );
   // }

    readById(id: number): Observable<Post> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<Post>(url, { headers: header_object }).pipe(
            map((obj )=> obj),
            catchError(e => this.errorHandler(e))
        );
    }

    update(post: Post): Observable<Post> {
        const url = `${this.endpoint}/${post.id}`;
        return this.http.put<Post>(url, post, { headers: header_object }).pipe(
            map((obj )=> obj),
            catchError(e => this.errorHandler(e))
        );
    }

    delete(id: number): Observable<Post> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<Post>(url, { headers: header_object }).pipe(
            map((obj )=> obj),
            catchError(e => this.errorHandler(e))
        );
    }

    errorHandler(e: any): Observable<any>{
        console.log(e)
        this.showMessage("Ocorreu um erro!", true)
        return EMPTY;
    }
}