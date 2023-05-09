import { Component, OnInit } from '@angular/core';
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    name:"",
    lastName: "",
    carrera:"",
    email:"",
  }

  constructor(private taskService: TasksService){}

  ngOnInit(){
    this.getUser()
  }

  getUser(){
    this.taskService.getProfile().subscribe(
      res => { this.user = res;
        console.log(res)}
      )
  }

}
