export interface Task {
  id: number;
  name: string;
  price: number;
  lastUpdateDate: Date;
  createDate: Date;
  userId?: number;
  priorityId: number;
  statusId: number;
  statusPosition: number;
}

export interface User {
  id: number;
  name: string;
  imgUrl: string;
}
