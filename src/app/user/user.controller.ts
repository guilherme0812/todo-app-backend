import { Controller, Get, Post, Patch, Param, Delete, Put, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return this.userService.findAll()
  }

  @Post()
  async store(@Body() createUserDto:CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOneOrFail({where: {id}})
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body)
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id:string) {
    return this.userService.delete(id)
  }
}
