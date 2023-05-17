import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-transportista',
  templateUrl: './qr-transportista.component.html',
  styleUrls: ['./qr-transportista.component.css']
})
export class QrTransportistaComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; // Retrieve the parameter value
      console.log("qr code url: " + id); // Do something with the parameter value
    });
  }

}
