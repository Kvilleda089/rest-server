import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository{

    constructor(
        private readonly dataSource: TodoDataSource
    ){

    }
    create(createdTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.dataSource.create(createdTodoDto);
    }


    getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }


    findById(id: number): Promise<TodoEntity> {
        return this.dataSource.findById(id);
    }


    updateById(updateTodo: UpdateTodoDto): Promise<TodoEntity> {
        return this.updateById(updateTodo);
    }


    deleteById(id: number): Promise<TodoEntity> {
        return this.dataSource.deleteById(id);
    }

}