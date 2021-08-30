import { BadRequestException, Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

// would handle anything that has /users in it
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {} // dependency injection

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name: string): User[] {

    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User, description: 'the user' })
  //@ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {

    console.log('--->', typeof id);

    const user = this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException();
      // throw new BadRequestException();
    }

    return user;

    //return this.usersService.findById(Number(id));
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
