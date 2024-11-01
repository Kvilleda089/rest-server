import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy milk', createdAt: new Date() },
    { id: 3, text: 'Buy bread', createdAt: null },
    { id: 4, text: 'Buy butter', createdAt: new Date() },
];
export class TodosController {

    constructor(
       
    ) {  this.updateTodo = this.updateTodo.bind(this);}


    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id))   res.status(400).json({ error: `ID argument is not number` })
        const todo = todos.find(todo => todo.id === id);
        (todo)
            ? res.json(todo)
            : res.status(404).json({ message: `TODO with id ${id} not found` })

    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) res.status(400).json({ message: `Text property is required` });

        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: null
        };
        todos.push(newTodo);
        res.json({ message: `Create Todo success`, data: newTodo })
    };

    public updateTodo(req: Request, res: Response): Response {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number` });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return  res.status(404).json({ message: `Todo with id ${id} not found` });

        const { text, createdAt } = req.body;
        

        todo.text = text || todo.text;
        
        (createdAt === 'null')
            ? todo.createdAt = null
            : todo.createdAt = new Date(createdAt || todo.createdAt);

         return res.json({ message: 'Update Success', data: todo });
    };

    public deleteTodo = (req: Request, res: Response): Response =>{
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);

        if(!todo) return res.json({message: `Todo with id ${id} not found`});
        
        todos.splice(todos.indexOf(todo), 1);
        return res.json({data: todo});
    }
}