import { Injectable } from '@angular/core';
import { APP_API } from 'src/app/app.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { header_object } from 'src/app/authorization';
import { FuelStation } from './fuel_station.model';

@Injectable({
    providedIn: 'root'
})

export class FuelStationService {
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
    /*caso aconteça erro no fuelStation, chamo método errorHandler*/
    create(fuelStation: FuelStation): Observable<FuelStation> {
        return this.http.post<FuelStation>(`${this.endpoint}/new`, fuelStation).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        );
    }

    read(): Observable<FuelStation[]> {
        return this.http.get<FuelStation[]>(this.endpoint).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        );
    }

    readById(id: number): Observable<FuelStation> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<FuelStation>(url, { headers: header_object }).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        );
    }

    update(fuelStation: FuelStation): Observable<FuelStation> {
        const url = `${this.endpoint}/${fuelStation.id}`;
        return this.http.put<FuelStation>(url, fuelStation, { headers: header_object }).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        );
    }

    delete(id: number): Observable<FuelStation> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<FuelStation>(url, { headers: header_object }).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e))
        );
    }

    errorHandler(e: any): Observable<any> {
        console.log(e)
        this.showMessage("Ocorreu um erro!", true)
        return EMPTY;
    }
}