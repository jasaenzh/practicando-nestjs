import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = this.userRepository.create(createUserDto)
    return await this.userRepository.save(newUser)
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find()
    return users
  }

  async findOne(id: number): Promise<User> {
    const findById: User = await this.userRepository.findOneBy({ id });
    return findById;
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ user: User; message: string }> {
    const userToUpdate: User = await this.userRepository.findOneBy({ id });

    if (!userToUpdate) {
      throw new NotFoundException('Usuario no encontrado o ya ha sido borrado');
    }

    const updateResult: UpdateResult = await this.userRepository.update(id, updateUserDto)

    if (updateResult.affected === 1) {
      const updatedUser: User = await this.userRepository.findOneBy({ id });
      return { user: updatedUser, message: 'Usuario actualizado exitosamente' };
    } else {
      throw new NotFoundException('No se pudo actualizar el usuario');
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    const userToDelete: User = await this.userRepository.findOneBy({ id });

    if (!userToDelete) {
      throw new NotFoundException('Usuario no encontrado o ya ha sido borrado');
    }

    const deleteResult: UpdateResult = await this.userRepository.softDelete({ id });

    if (deleteResult.affected === 1) {
      return { message: 'Usuario eliminado exitosamente' };
    } else {
      throw new NotFoundException('No se pudo eliminar el usuario');
    }
  }


}