import { NotFoundException } from '@nestjs/common';
import { Repository } from '../../Infrastructure/Repository/Repository';
import { ICat } from '../interfaces/cat.interface';
import { Cat } from '../models/Cat';
import { v4 as uuid } from 'uuid';
import { CreateCatDto } from '../dto/create-cat.dto';

export class CatRepository extends Repository<ICat, string> {
  find(id: string): ICat {
    return this.respository.find(currentCat => currentCat.id === id);
  }

  delete(id: string): void {
    this.respository = this.respository.filter(
      currentCat => currentCat.id !== id,
    );
  }

  save<S extends ICat>(entity: S): S {
    const index = this.respository.findIndex(
      currentCat => currentCat.id === entity.id,
    );

    if (index === -1) {
      throw new NotFoundException('Cat not found');
    }

    this.respository.splice(index, 1, entity);

    return entity;
  }

  create(item: CreateCatDto): ICat {
    const newCat = new Cat({
      id: uuid(),
      name: item.name,
      clicks: 0,
      parents: [],
    });

    this.respository = [...this.respository, newCat];

    return newCat;
  }
}
