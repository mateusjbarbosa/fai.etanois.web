import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Observable, EMPTY } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class PostService {
    baseUrl = " http://localhost:3001/posts"
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
        return this.http.post<Post>(this.baseUrl, post).pipe(
            map((obj )=> obj),
            catchError(e => this.errorHandler(e))
        );
    }

    read(): Observable<Post[]> {
        return this.http.get<Post[]>(this.baseUrl).pipe(
            map((obj )=> obj),
            catchError(e => this.errorHandler(e))
        );
    }

    readById(id: number): Observable<Post> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Post>(url).pipe(
            map((obj )=> obj),
            catchError(e => this.errorHandler(e))
        );
    }

    update(post: Post): Observable<Post> {
        const url = `${this.baseUrl}/${post.id}`;
        return this.http.put<Post>(url, post).pipe(
            map((obj )=> obj),
            catchError(e => this.errorHandler(e))
        );
    }

    delete(id: number): Observable<Post> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<Post>(url).pipe(
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