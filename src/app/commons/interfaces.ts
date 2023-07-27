export interface Task {
  workGroupId: number;
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

export interface WorkGroup {
  id: number;
  name?: string;
}

export interface PostRequestDTO {
  workGroupId: number;
  name: string;
  price: number;
  userId: number;
  priorityId: number;
  statusNumber: number;
  statusPosition: number;
  comment: string;
}
