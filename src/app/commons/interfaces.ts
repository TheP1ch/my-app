export interface Task {
  id: number;
  name: string;
  price: number;
  lastUpdateDate: Date;
  createDate: Date;
  userId?: number;
  priorityId: number;
  statusNumber: number;
  statusPosition: number;
  comment?: string;
}

export interface User {
  id: number;
  name: string;
  imgUrl: string;
}
