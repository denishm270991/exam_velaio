import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StateTaskPipe } from 'src/app/pipes/state-task.pipe';
import { TasksService } from 'src/app/services/tasks.service';
import { TasksType } from 'src/app/types/tasks.type';

@Component({
  selector: 'app-see-task',
  standalone: true,
  imports: [StateTaskPipe, NgFor, NgIf, RouterLink],
  templateUrl: './see-task.component.html',
  styleUrls: ['./see-task.component.scss'],
})
export class SeeTaskComponent implements OnInit {
  idTask: number = -1;
  task: TasksType;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly tasksService: TasksService
  ) {
    this.task = {
      id: -1,
      title: '',
      completed: false,
      date: '',
      people: [],
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idTask = parseInt(params['id']);
      this.getTaskById();
    });
  }

  getTaskById() {
    this.task = this.tasksService.getTaskById(this.idTask);
  }
}
