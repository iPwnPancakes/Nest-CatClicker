import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { BreedCatDto } from './dto/breed-cat.dto';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ICat } from './interfaces/cat.interface';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getAllCats(): Array<ICat> {
    return this.catService.getAll();
  }

  @Post()
  addCat(@Body(new ValidationPipe()) createCatRequest: CreateCatDto) {
    return this.catService.addCat(createCatRequest);
  }

  @Put()
  updateCat(@Body(new ValidationPipe()) updateCatRequest: UpdateCatDto): ICat {
    return this.catService.updateCat(updateCatRequest);
  }

  @Delete(':id')
  deleteCat(@Param('id') id: string) {
    return this.catService.deleteCat(id);
  }

  @Get(':id/increment')
  incrementCat(@Param('id') id: string) {
    return this.catService.incrementCat(id);
  }

  @Post('breed')
  breedCat(@Body(new ValidationPipe()) breedCatDto: BreedCatDto) {
    return this.catService.breedCat(breedCatDto);
  }
}
