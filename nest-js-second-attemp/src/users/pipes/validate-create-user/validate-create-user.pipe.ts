import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe!');

    console.log(value);
    console.log(metadata);

    const ParseIntPipe = parseInt(value.age.toString());
    if (isNaN(ParseIntPipe)){
      console.log(`${value.age} is not a number`);
      throw new HttpException('invalid Data', HttpStatus.BAD_REQUEST);
    } else {
      console.log(`${ParseIntPipe} Is number`);
      return { ... value, age:ParseIntPipe};
    }
  }
}
