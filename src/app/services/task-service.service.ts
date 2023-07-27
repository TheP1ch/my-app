import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Tasks, Url, WorkGroups } from '../commons/constants';
import { PostRequestDTO, Task, WorkGroup } from '../commons/interfaces';
import { Statuses } from '../commons/constants';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private Tasks: Task[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  private readonly _tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<
    Task[]
  >(this.Tasks);

  get tasks$(): Observable<any[]> {
    return this._tasks$.asObservable();
  }

  setTasks(tasks: any[]) {
    this.Tasks = tasks;
    this._tasks$.next(this.Tasks);
  }

  public getTasks(): Observable<any> {
    return this.http.get(`${Url}/Request`);
  }

  getTasksMapByWorkGroupId(
    workGroupId: number
  ): Observable<Map<number, Task[]>> {
    let taskMap = this._tasks$.pipe(
      map((tasks) => {
        let result: Map<number, Task[]> = new Map<number, Task[]>();
        for (let status of Statuses) {
          result.set(status.id, []);
        }
        for (let task of tasks) {
          if (task.workGroupId !== workGroupId) continue;
          result.get(task.statusNumber)?.push(task);
        }
        return result;
      })
    );
    return taskMap;
  }

  editTask(task: Task) {
    let editTaskDTO = {
      name: task.name,
      price: task.price,
      priorityId: task.priorityId,
      statusNumber: task.statusNumber,
      userId: task.userId,
      comment: task.comment,
    };
    let params = new HttpParams();
    params = params.append('id', task.id);
    return this.http.put<any>(`${Url}/Request/EditRequest`, editTaskDTO, {
      params,
    });
  }

  changeTaskStatus(task: Task) {
    let params = new HttpParams();
    params = params.append('id', task.id);
    params = params.append('statusNumber', task.statusNumber);
    params = params.append('statusPosition', task.statusPosition);
    return this.http.put<any>(
      `${Url}/Request/ChangeStatus`,
      {},
      {
        params,
      }
    );
  }

  pushTask(task: Task) {
    console.log(task);
    let taskDTO = {
      workGroupId: task.workGroupId,
      name: task.name,
      price: task.price,
      userId: task.userId,
      priorityId: task.priorityId,
      statusNumber: task.statusNumber,
      statusPosition: task.statusPosition,
      comment: task.comment,
    };
    this.Tasks.push(task);
    return this.http.post<any>(`${Url}/Request`, taskDTO);
  }
}
