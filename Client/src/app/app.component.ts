import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SignalRService } from './signal-r.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	template: `
    <h1>Iyzco Pay</h1>
	<div *ngIf="!isPaymentSuccess">
    <button (click)="pay()">Pay</button>
	<br />
	<br />
	<br />
	<iframe *ngIf="html" [src]="html"  width="500" height="500"></iframe>
	</div>
	<div *ngIf="isPaymentSuccess">
		<h1>{{success}}</h1>
	</div>
  `
})
export class AppComponent {
	html: any
	success: string = "Ödeme Başarılı"
	isPaymentSuccess: boolean = false
	constructor(
		private http: HttpClient,
		private senitizer: DomSanitizer,
		private signalR : SignalRService
	) { 
		this.signalR.startConnection()
		this.signalR.paymentResult((data:any) => {
			if(data.status === "success"){
				this.isPaymentSuccess = true
			}
		})
	}

	pay() {
		this.http.get("https://localhost:7099/api/Payments/Pay")
			.subscribe((res:any) => {
				const blob = new Blob([res.content], {type:'text/html'})
				const obj = URL.createObjectURL(blob);
				this.html = this.senitizer.bypassSecurityTrustResourceUrl(obj)
			})
	}
}
