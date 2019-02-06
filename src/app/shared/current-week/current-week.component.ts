import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-current-week',
    templateUrl: './current-week.component.html',
    styleUrls: ['./current-week.component.scss']
})
export class CurrentWeekComponent implements OnInit {
    data$: Observable<string>;
    errorText: string = '';

    constructor(private httpClient: HttpClient) {}

    ngOnInit() {
        this.data$ = this.httpClient
            .get(`${environment.apiHost}/gethomework`, {
                responseType: 'text'
            })
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 404) {
                        this.errorText = 'No homework found!!!!';
                    } else {
                        this.errorText = err.statusText;
                    }
                    return EMPTY;
                })
            );
    }
}
