import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create_user_DTO";
import { UsersService } from "./users.service";
import { ThrottlerGuard } from "@nestjs/throttler";
import { RoleGuard } from "../guards/role.guard";
import { AuthGuard } from "../guards/auth.guard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";
import { UpdatePutUserDTO } from "./DTO/update-put-user-dto";
import { UpdatePatchUserDTO } from "./DTO/update-patch-user-dto";
import { ParamId } from "../decorators/param-id.decorator";

@Roles(Role.Admin)
@UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
@Controller('users')
export class UsersController{
    constructor(private readonly userService: UsersService){}

    @Post('/create')
    async create(@Body() data: CreateUserDTO) {
      return this.userService.create(data);
    }

    @Get('/get-all/')
    async getAll() {
      return this.userService.getAll();
    }
  
    @Get('/get-by-id/:id')
    async getById(@ParamId() id: string) {
      return this.userService.getById(id);
    }
  
    @Put('/update/:id')
    async update(@Body() data: UpdatePutUserDTO, @ParamId() id: string) {
      return this.userService.update(id, data);
    }
  
    @Patch('/update-partial/:id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: string) {
      return this.userService.updatePartial(id, data);
    }
  
    @Patch('/delete/:id')
    async delete(@ParamId() id: string) {
      return await this.userService.delete(id);
    }

}

