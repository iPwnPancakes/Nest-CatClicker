import { Injectable, NotFoundException } from '@nestjs/common';
import { BreedCatDto } from '../dto/breed-cat.dto';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { ICat } from '../interfaces/cat.interface';
import { Cat } from '../models/Cat';
import { CatRepository } from '../repositories/cats.repository';

@Injectable()
export class CatsService {
  cats = new CatRepository();

  constructor() {
    this.cats.create({ name: 'Mia', clicks: 0 });
    this.cats.create({ name: 'Flapjack', clicks: 0 });
  }

  getAll(): ICat[] {
    return this.cats.getAll();
  }

  addCat(cat: CreateCatDto): ICat {
    return this.cats.create(cat);
  }

  updateCat(cat: UpdateCatDto): ICat {
    const foundCat = this.cats.find(cat.id);

    if(!foundCat) {
      throw new NotFoundException('Cat not found');
    }

    const updated_cat: ICat = new Cat({ ...foundCat, ...cat });

    this.cats.save(updated_cat);

    return updated_cat;
  }

  deleteCat(id: string): void {
    this.cats.delete(id);
  }

  incrementCat(id: string) {
    const foundCat = this.cats.find(id);
    
    if(!foundCat) {
      throw new NotFoundException('Cat not found');
    }

    const updatedCat: ICat = Object.assign({}, foundCat, {
      clicks: foundCat.clicks + 1,
    });

    this.cats.save(updatedCat);

    return updatedCat;
  }

  breedCat({ momCatId, dadCatId, name }: BreedCatDto): ICat {
    return this.cats.create({ name, momCatId, dadCatId });
  }
}
