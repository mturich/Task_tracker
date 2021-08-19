import { Component, OnInit } from '@angular/core';
//imports the interface
import { Task } from '../../Task';
// imports the tasks created in mock-tasks
//import { TASKS } from '../../mock-tasks';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  toggleReminder(task: Task) {

    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(newTask: Task) {

    this.taskService.addTaskTo(newTask).subscribe(
      (newTask) => (
        this.tasks.push(newTask))
    );
  }
    /* 
1. taskToDelete is the element that has to be deleted.
2. because the server gives me a observable, we have to subscribe to it by defining a function 
2a. this is done by giving overwriting the tasks Array with a filtered one
3 't' is the every task in the task Array and it is checked against the by the filter method.
3a The filter method only gives those task back, that passed the test
*/
 /*  deleteTask(taskToDelete: Task) {
    this.taskService.deleteTask(taskToDelete).subscribe(() => {  const taskArrayWithoutDeleted = this.tasks.filter(
      (t) => t.id !== taskToDelete.id);

    this.tasks = taskArrayWithoutDeleted;});
  } */

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(
      () =>( 
      this.tasks = this.tasks.filter((t) => t.id !== task.id))
    );
  }


}



