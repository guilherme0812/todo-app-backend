import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const todoEntityList: TodoEntity[] = [
  { id: '1', task: 'batata', isDone: 1, createdAt: '22/11/2022', updatedAt: '22/11/2022', deletedAt: undefined, user: undefined },
  { id: '2', task: 'feijão', isDone: 1, createdAt: '22/11/2022', updatedAt: '22/11/2022', deletedAt: undefined, user: undefined }
]

const newTodoEntity = new TodoEntity({ task: 'new-task', isDone: 0, user: undefined });
const updatedTodoEntity = new TodoEntity({ task: 'task-1', isDone: 1 });

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            create: jest.fn().mockReturnValue(newTodoEntity),
            findAll: jest.fn().mockReturnValue(todoEntityList),
            findOneOrFail: jest.fn().mockReturnValue(todoEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedTodoEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService)
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('index', () => {
    it('Should return todo list entity successfully', async () => {
      const result = await todoController.findAll()
      expect(result).toEqual(todoEntityList);
      expect(todoService.findAll).toBeCalledTimes(1)
    })

    it('Should throw an exception', async () => {
      // Arrange
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error())

      expect(todoController.findAll()).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a new todo item successfully', async () => {
      // Arrange
      const body: CreateTodoDto = {
        task: 'new-task',
        isDone: 0,
        userId: '2'
      };

      // Act
      const result = await todoController.create(body);
      // Assert
      expect(result).toEqual(newTodoEntity);
      expect(todoService.create).toHaveBeenCalledTimes(1);
      expect(todoService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateTodoDto = {
        task: 'new-task',
        isDone: 0,
        userId: '2'
      };

      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get todo item successfuly', async () => {
      //Act
      const result = await todoController.findOne('1')

      //Assert
      expect(result).toEqual(todoEntityList[0])
    })

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(todoService, 'findOneOrFail').mockRejectedValueOnce(new Error())

      //Assert
      expect(todoController.findOne('1')).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('should update a todo item successfuly', async () => {
      //Arrange
      const body: UpdateTodoDto = {
        task: 'task-1',
        isDone: 1,
      }

      //Act
      const result = await todoController.update('1', body)

      //Assert
      expect(result).toEqual(updatedTodoEntity)
      expect(todoService.update).toBeCalledTimes(1)
      expect(todoService.update).toBeCalledWith('1', body)
    })

    it('should throw a exception', () => {
      //Arrange
      const body: UpdateTodoDto = {
        task: 'task-1',
        isDone: 1,
      }

      jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());
    })
  })

  describe('destroy', () => {
    it('should remove a todo item successfully', async () => {
      // Act
      const result = await todoController.remove('1')

      // Assert
      expect(result).toBeUndefined()
    })

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoService, 'remove').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoController.remove('1')).rejects.toThrowError();
    })
  })

});
