import { VehicleService } from './../../../services/vehicle.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../../interfaces/vehicle';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [DivisaPipe, ReactiveFormsModule],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent {
  parametro: string|null = null
  vehicle: Vehicle|null = null
  mostrarCodigoPromocional: boolean = false
  form!: FormGroup


  constructor(private route: ActivatedRoute,
    private VehicleService: VehicleService,
    private builder: FormBuilder){

      this.form = builder.group({
        "fechaInicio": new FormControl(null, [Validators.required]),
        "fechaFin": new FormControl(null, [Validators.required]),
        "codigoPromocional": new FormControl(null, [Validators.required]),
      })

    route.paramMap.subscribe(params=>(
      this.parametro = params.get("id")
    ))
    if(this.parametro !== null){
      VehicleService.getById(this.parametro).subscribe({
        next: (response)=>{
          this.vehicle = response as Vehicle
        },
        error: ()=>{

        }
      })
    }
  }

  
  public get numDias() : number {
    const fechaIni = new Date(this.form.value.fechaInicio)
    const fechaFin = new Date(this.form.value.fechaFin)

    const millisDif = fechaFin.getTime() - fechaIni.getTime()
    const dias = millisDif / 1000/ 60 / 60 / 24

    if(dias < 0){
      return 0
    }else{
      return dias
    }
  }
  
}
