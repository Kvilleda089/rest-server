import { Request, Response } from "express"
import { prismas } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodosController {

    constructor(
       private readonly todoRepository: TodoRepository,
    ) {}


    public async getTodos(req: Request, res: Response):Promise<Response>  {
        const todos = await this.todoRepository.getAll();
        return res.json({data: todos})
    }

    public async getTodoById(req: Request, res: Response): Promise<Response> {
      const id = +req.params.id;

      try {
        const todo = await this.todoRepository.findById(id);
        return res.json(todo);
      } catch (error) {
        return res.status(400).json({message: `Error: ${error}`})
      }
      
    };

    public  async createTodo(req: Request, res: Response): Promise<Response> {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({message: `Error: ${error}`})
       
        const todo = await this.todoRepository.create(createTodoDto!);
        return res.json({data: todo});
    };

    public async updateTodo(req: Request, res: Response): Promise<Response> {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(400).json({message: `Error: ${error}`})
        const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
        return  res.json(updateTodo)
      
    };

    public async deleteTodo(req: Request, res: Response): Promise<Response>{
        const id = +req.params.id;
        const deleteTodo = await this.todoRepository.deleteById(id);
        return res.json(deleteTodo)
    }
}