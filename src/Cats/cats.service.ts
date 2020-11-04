import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import Cat from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  cats: Array<Cat> = [
    { id: 1, name: 'TEST' },
    { id: 3, name: 'aaaa' }
  ];

  getAll(): Array<Cat> {
    return this.cats;
  }

  addCat(cat: CreateCatDto) {
    const last_id = this.cats.length > 0 ? this.cats[this.cats.length - 1].id : 0;

    this.cats.push({ id: last_id + 1, ...cat });
  }

  updateCat(cat: UpdateCatDto): Cat {
    const cat_index = this.cats.findIndex(_cat => _cat.id === cat.id);

    if(cat_index === -1) throw new NotFoundException('Cat not found');

    const updated_cat: Cat = { ...this.cats[cat_index], ...cat };

    this.cats.splice(cat_index, 1, updated_cat);

    return updated_cat;
  }

  deleteCat(id: number) {
    const cat_index = this.cats.findIndex(_cat => _cat.id === id);

    if(cat_index === -1) throw new NotFoundException('Cat not found');

    this.cats.splice(cat_index, 1);
  }
}
