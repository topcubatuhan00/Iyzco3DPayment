import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	template: `
    <h1>Iyzco Pay</h1>
    <button (click)="pay()">Pay</button>
	<br />
	<br />
	<br />
	<iframe *ngIf="html" [src]="html"  width="500" height="500"></iframe>
  `
})
export class AppComponent {
	html: any
	constructor(
		private http: HttpClient,
		private senitizer: DomSanitizer
	) { }

	pay() {
		this.http.get("https://localhost:7099/api/Payments/Pay")
			.subscribe((res:any) => {
				console.log(res);
				const blob = new Blob([res.content], {type:'text/html'})
				const obj = URL.createObjectURL(blob);
				this.html = this.senitizer.bypassSecurityTrustResourceUrl(obj)
			})
	}
}
