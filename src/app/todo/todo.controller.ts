import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger'
import { IndexTodoSwegger } from './swegger/index-todo.swegger';
import { CreateTodoSwegger } from './swegger/create-todo.swegger';
import { UpdateTodoSwegger } from './swegger/update-todo.swegger';
import { ShowTodoSwegger } from './swegger/show-todo.swegger';
import { BadRequestSweger } from 'src/utils/swegger/bad-request.swegger';

@Controller('todo')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({summary:'Criar tarefa'})
  @ApiResponse({status: 201, description: 'Nova tarefa criada com sucesso', type: CreateTodoSwegger})
  @ApiResponse({status: 400, description: 'Parâmetros inválidos', type: BadRequestSweger})
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }
  
  @Get()
  @ApiOperation({summary:'Exibir todas tarefas'})
  @ApiResponse({status: 200, description: 'Dados da tarefa retornados com sucesso', type: IndexTodoSwegger, isArray:true })
  findAll() {
    return this.todoService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({summary:'Exibir apenas uma tarefa'})
  @ApiResponse({status: 200, description: 'Dado de tarefa retornados com sucesso', type: ShowTodoSwegger })
  @ApiResponse({status: 400, description: 'Id inválido', type: BadRequestSweger})
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.todoService.findOneOrFail({where: {id}});
  }
  
  @Patch(':id')
  @ApiOperation({summary:'Atualixar tarefa pelo id'})
  @ApiResponse({status: 200, description: 'Tarefa atualizada com sucesso', type: UpdateTodoSwegger})
  @ApiResponse({status: 400, description: 'Parâmetros inválidos', type: BadRequestSweger})
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }
  
  @Delete(':id')
  @ApiOperation({summary:'Deletar tarefa por id'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({status: 200, description: 'Tarefa deletada com sucesso'})
  @ApiResponse({status: 400, description: 'Parâmetros inválidos', type: BadRequestSweger})
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.todoService.remove(id);
  }
}
