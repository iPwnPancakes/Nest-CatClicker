import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import Cat from './interfaces/cat.interface';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getAllCats(): Array<Cat> {
    return this.catService.getAll();
  }

  @Post()
  addCat(@Body(new ValidationPipe()) createCatRequest: CreateCatDto) {
    return this.catService.addCat(createCatRequest);
  }

  @Put()
  updateCat(@Body(new ValidationPipe()) updateCatRequest: UpdateCatDto): Cat {
    return this.catService.updateCat(updateCatRequest);
  }

  @Delete(':id')
  deleteCat(@Param('id', ParseIntPipe) id: number) {
    return this.catService.deleteCat(id);
  }
}
