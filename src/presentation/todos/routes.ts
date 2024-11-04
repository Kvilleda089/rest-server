import { Router, Request, Response } from "express";
import { TodosController } from './controller';
import { todo } from "node:test";



export class TodoRoutes {
    
    static get routes(): Router{
        const router = Router();
        const todoController = new TodosController();
        router.get('/', (req: Request, res: Response) =>{todoController.getTodos(req, res)});
        router.get('/:id', (req: Request, res: Response)=>{ todoController.getTodoById(req, res)});
        router.post('/', (req: Request, res: Response)=>{todoController.createTodo(req, res)});
        router.put('/:id', (req: Request, res: Response)=>{
            todoController.updateTodo(req, res)});
        router.delete('/:id', (req: Request, res: Response)=>{
            todoController.deleteTodo(req, res)
        })
        return router;
    }
}