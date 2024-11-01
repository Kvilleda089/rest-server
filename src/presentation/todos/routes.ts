import { Router, Request, Response } from "express";
import { TodosController } from './controller';
import { todo } from "node:test";



export class TodoRoutes {
    
    static get routes(): Router{
        const router = Router();
        const todoController = new TodosController();
        router.get('/',todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', (req: Request, res: Response)=>{
            todoController.updateTodo(req, res)});
        router.delete('/:id', (req: Request, res: Response)=>{
            todoController.deleteTodo(req, res)
        })
        return router;
    }
}