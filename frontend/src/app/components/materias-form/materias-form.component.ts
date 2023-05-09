import { Component, OnInit } from '@angular/core';
import { Materias } from "../../interfaces/materias";
import { TasksService } from "../../services/tasks.service";
import { Router, ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-materias-form',
  templateUrl: './materias-form.component.html',
  styleUrls: ['./materias-form.component.css']
})
export class MateriasFormComponent implements OnInit {
  materias: Materias = {
    name: "",
    plan: "",
    ano: ""
  };

  constructor(private tasksService: TasksService, private router: Router) { }

  ngOnInit(){

  }
  submitMateria(){
    this.tasksService.createRegistro(this.materias)
     .subscribe(
       res=>{
         console.log(res);
        this.router.navigate(['/private'])
       }
     )
   }

}
