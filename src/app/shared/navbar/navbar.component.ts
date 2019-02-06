import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CalendarModel } from 'src/app/models/calendar.model';
import * as moment from 'moment';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    constructor(private httpClient: HttpClient) {}
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];

    ngOnInit() {}
    addToCalendar() {
        if (
            confirm(
                'This will open 4 new tabs with pre-filled gmail calendar events for each day!'
            )
        ) {
            this._addCalendarEvents();
        }
    }
    _addCalendarEvents() {
        this.httpClient
            .get<CalendarModel>(`${environment.apiHost}/calendar`)
            .subscribe((r) => {
                for (const [i, d] of this.days.entries()) {
                    const day = r.days[d];
                    const description = Object.keys(day)
                        .map((k) => `${k}: ${day[k]}`)
                        .join('\n');
                    console.log('navbar.component', 'Description', description);
                    const scheduledDate = new Date(
                        new Date(r.weekCommencing).getTime() +
                            i * (1000 * 60 * 60 * 24)
                    );
                    scheduledDate.setHours(16);
                    scheduledDate.setMinutes(0);
                    scheduledDate.setSeconds(0);
                    const scheduledEndDate = new Date(scheduledDate);
                    scheduledEndDate.setMinutes(30);
                    const s = moment(scheduledDate).format('YYYYMMDDTHHmm00');
                    const e = moment(scheduledEndDate).format('YYYYMMDDTHHmm00');
                    const url =
                        `https://calendar.google.com/calendar/r/eventedit` +
                        `?text=${d}'s Homework` +
                        `&dates=${s}/${e}` +
                        `&details=${encodeURIComponent(description)}` +
                        `&sprop=website:&sf=true`;
                    console.log('navbar.component', 'URL:', url);
                    window.open(url, '_blank');
                }
                // console.log('navbar.component', 'Monday', r.days['Monday']);
                // console.log('navbar.component', 'Tuesday', r.days['Tuesday']);
                // console.log(
                //     'navbar.component',
                //     'Wednesday',
                //     r.days['Wednesday']
                // );
                // console.log('navbar.component', 'Thursday', r.days['Thursday']);
            });
    }
}
