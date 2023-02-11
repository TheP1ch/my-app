import { Task } from './interfaces';
import { User } from './interfaces';

export const Users: User[] = [
  {
    id: 0,
    name: 'Иван Васильевич',
    imgUrl: '../../assets/img/todo/IvanVasilevich.svg',
  },
  {
    id: 0,
    name: 'Иван Васильевич',
    imgUrl: '../../assets/img/todo/IvanVasilevich.svg',
  },
];

export const Statuses = [
  {
    id: 0,
    name: 'Входящие',
  },
  {
    id: 1,
    name: 'В работе',
  },
  {
    id: 2,
    name: 'На согласовании',
  },
  {
    id: 3,
    name: 'Готово',
  },
  {
    id: 4,
    name: 'К отгрузке',
  },
];

export const Priorities = [
  {
    id: 0,
    name: 'Низкий',
  },
  {
    id: 1,
    name: 'Средний',
  },
  {
    id: 2,
    name: 'Высокий',
  },
  {
    id: 3,
    name: 'Критический',
  },
];

export const Tasks: Task[] = [
  {
    id: 0,
    name: 'Обновление ПО',
    price: 2500,
    lastUpdateDate: new Date(Date.now() - 691200000),
    createDate: new Date(),
    userId: 0,
    priorityId: 0,
    statusNumber: 0,
    statusPosition: 0,
  },
  {
    id: 1,
    name: 'Ошибка датчика',
    price: 500,
    lastUpdateDate: new Date(Date.now() - 345600000),
    createDate: new Date(),
    userId: 1,
    priorityId: 3,
    statusNumber: 0,
    statusPosition: 1,
  },
  {
    id: 2,
    name: 'Подключение системы',
    price: 500,
    lastUpdateDate: new Date(Date.now() - 172800000),
    createDate: new Date(),
    userId: 1,
    priorityId: 1,
    statusNumber: 1,
    statusPosition: 0,
  },
  {
    id: 3,
    name: 'Тех обслуживание',
    price: 500,
    lastUpdateDate: new Date(Date.now() - 86400000),
    createDate: new Date(),
    userId: 0,
    priorityId: 0,
    statusNumber: 2,
    statusPosition: 0,
  },
  {
    id: 4,
    name: 'Корректировка значений по ВКУ-321',
    price: 500,
    lastUpdateDate: new Date(Date.now() - 43200000),
    createDate: new Date(),
    userId: 2,
    priorityId: 2,
    statusNumber: 3,
    statusPosition: 0,
  },
  {
    id: 5,
    name: 'Ошибка датчика КП-312',
    price: 2500,
    lastUpdateDate: new Date(Date.now() - 43200000),
    createDate: new Date(),
    userId: 2,
    priorityId: 2,
    statusNumber: 4,
    statusPosition: 0,
  },
];
