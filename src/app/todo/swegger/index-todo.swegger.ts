import { OmitType } from "@nestjs/swagger"
import { TodoEntity } from "../entities/todo.entity";

export class IndexTodoSwegger extends OmitType(TodoEntity, ['createdAt', 'updatedAt', 'deletedAt']) { }