import { Component, OnInit } from '@angular/core';
import { TasksService } from "../../services/tasks.service";
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Materias } from "../../interfaces/materias";

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  materias: Materias[] = [];

  constructor(private tasksService: TasksService, private router: Router) { }

  ngOnInit(){
    this.getMaterias()
  }
  getMaterias(){
    this.tasksService.getPrivateTasks().subscribe(
      res => { this.materias = res;
      console.log(res)}
    )
  }

  deleteMateria(id: string){
    this.tasksService.deleteMateria(id)
    .subscribe(
      res =>{
        this.getMaterias();
      }
    )
  }

}
/*this.tasksService.getPrivateTasks().subscribe(
      res => {
        console.log(res)
        this.materias = res},
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/signin']);
          }
        }
      }
    )*/