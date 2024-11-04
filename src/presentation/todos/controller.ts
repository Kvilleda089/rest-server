import { Request, Response } from "express"
import { prismas } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";


export class TodosController {

    constructor(
       
    ) {  this.updateTodo = this.updateTodo.bind(this);}


    public async getTodos(req: Request, res: Response):Promise<Response>  {
        const todos = await prismas.todo.findMany();
         return res.json(todos);
    }

    public async getTodoById(req: Request, res: Response): Promise<Response> {
        const id = +req.params.id;

        if (isNaN(id))  return res.status(400).json({ error: `ID argument is not number` })
       const todo = await prismas.todo.findUnique({
            where:{
                id: id
            }
        });
       return  (todo)
            ? res.json(todo)
            : res.status(404).json({ message: `TODO with id ${id} not found` })

    };

    public  async createTodo(req: Request, res: Response): Promise<Response> {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({message: `Error: ${error}`})
       
        const todo = await prismas.todo.create({
            data: createTodoDto!
        });
       
       return  res.json({ message: `Create Todo success`, data: todo })
    };

    public async updateTodo(req: Request, res: Response): Promise<Response> {
        const id = +req.params.id;
        const [error, updateTodo] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(400).json({message: `Error: ${error}`})
       
        const todo = await prismas.todo.findFirst({
            where: {id}
        })
        if (!todo) return  res.status(404).json({ message: `Todo with id ${id} not found` });

        const Updatetodo = await prismas.todo.update({
            where : {
                id: id
            }, 
            data: updateTodo!.values
        });
        
      

         return res.json({ message: 'Update Success', data: Updatetodo });
    };

    public async deleteTodo(req: Request, res: Response): Promise<Response>{
        const id = +req.params.id;
        const todo = await prismas.todo.delete({
            where:{
                id: id
            }
        })

        if(!todo) return res.json({message: `Todo with id ${id} not found`});
        
        
        return res.json({data: todo});
    }
}