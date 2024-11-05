import { CreateTodoDto } from "../dtos/todos/create-todos.dto";
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {

    abstract create(createdTodoDto: CreateTodoDto): Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(updateTodo: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>;
}