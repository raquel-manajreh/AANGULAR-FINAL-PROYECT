import { VehicleService } from './../../../services/vehicle.service';
import { Component } from '@angular/core';
import { Vehicle } from '../../../interfaces/vehicle';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DivisaPipe,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  vehicles: Vehicle[] = []

  constructor(private VehicleService: VehicleService){
    VehicleService.getAll().subscribe({
      next: (response)=>{
        this.vehicles = response as Vehicle[]
      },
      error: ()=>{}
    })
  }
}
