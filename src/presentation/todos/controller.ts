import { Request,Response } from "express"

const todos = [
    {id: 1, text: 'Buy milk', createdAt: new Date()},
    {id: 2, text: 'Buy milk', createdAt: new Date()},
    {id: 3, text: 'Buy bread', createdAt: null},
    {id: 4, text: 'Buy butter', createdAt: new Date()},
];
export class TodosController {

    constructor(){}


    public getTodos = (req: Request, res: Response) => {
         res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) =>{
        const id = +req.params.id;

        if(isNaN(id))  res.status(400).json({error: `ID argument is not number`})
        const todo = todos.find(todo => todo.id === id);
        (todo)
        ? res.json(todo)
        : res.status(404).json({erro: `TODO with id ${id} not found`})

    }
}