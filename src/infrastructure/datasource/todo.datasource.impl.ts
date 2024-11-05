import { prismas } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource{
    async create(createdTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prismas.todo.create({
            data: createdTodoDto!
        });

        return TodoEntity.fromObject(todo);
    };

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prismas.todo.findMany();

        return todos.map(todo => TodoEntity.fromObject(todo));
    };

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prismas.todo.findUnique({
            where:{
                id: id
            }
        });

        if(!todo) throw `Todo with id ${id} not found`;
        return TodoEntity.fromObject(todo);
    };


    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById(updateTodoDto.id);
        const Updatetodo = await prismas.todo.update({
            where : {
                id: updateTodoDto.id
            }, 
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(Updatetodo);
    };


   async  deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const todoDelete = await prismas.todo.delete({
            where:{
                id: id
            }
        });
        return TodoEntity.fromObject(todoDelete);
    };

}