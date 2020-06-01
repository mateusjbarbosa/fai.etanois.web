import { Post } from './post.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_API } from 'src/app/app.api';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    endpoint: string = ` ${APP_API}post`
    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
        })
    }

    create(post: Post): Observable<Post> {
        return this.http.post<Post>(this.endpoint, post);
    }

    //read(): Observable<Post[]> {
    //    return this.http.get<Post[]>(this.endpoint)
    //}

    readById(id: number): Observable<Post> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<Post>(url);
    }

    update(post: Post): Observable<Post> {
        const url = `${this.endpoint}/${post.id}`;
        return this.http.put<Post>(url, post);
    }

    delete(id: number): Observable<Post> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<Post>(url);
    }
}