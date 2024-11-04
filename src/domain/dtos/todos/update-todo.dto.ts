

export class UpdateTodoDto {
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values(){
        const returnObject: {[key: string]:any} = {};
        if(this.text) returnObject.text = this.text;
        if(this.completedAt) returnObject.completedAt;
        return returnObject;
    }

    static create(props: {[key: string]:any}): [string?, UpdateTodoDto?]{
        const {id, text, completedAt} = props;
        let  newCompleteAt = completedAt;

        if(!id || isNaN(Number(id))){
            return ['id must be a validad number']
        }

        if(completedAt){
             newCompleteAt = new Date(completedAt);
            if(newCompleteAt.toString() === 'Invalid Date'){
                return ['CompletetedAt must be a valid Date']
            }
        }

        return [undefined, new UpdateTodoDto(id,  text, newCompleteAt)];
    }
}