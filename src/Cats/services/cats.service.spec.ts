import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { CatRepository } from '../repositories/cats.repository';

describe('CatService', () => {
  let catService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    catService = moduleRef.get<CatsService>(CatsService);

    const repo = new CatRepository([
      { id: '1', name: 'Pepperoni', clicks: 0, parents: [] },
      { id: '2', name: 'Rigatoni', clicks: 1, parents: [] },
    ]);

    catService.cats = repo;
  });

  describe('getAll', () => {
    it('return an array of cats', () => {
      expect(catService.getAll()).toEqual(catService.cats.getAll());
    });
  });

  describe('updateCat', () => {
    it('updates a cat that exists', () => {
      const newCat = catService.updateCat({
        id: '2',
        name: 'Testeroni',
        clicks: 0,
      });

      expect(catService.cats.respository).toContainEqual(newCat);
    });

    it('throws NotFoundException when no cat exists with id', () => {
      const newCat: UpdateCatDto = {
        id: '404',
        name: 'THIS CAT DOESNT EXIST',
        clicks: 0,
      };

      expect(() => {
        catService.updateCat(newCat);
      }).toThrowError(NotFoundException);
    });
  });

  describe('deleteCat', () => {
    it('deletes a cat that exists', () => {
      const id = '2';

      catService.deleteCat(id);

      expect(catService.cats.find(id)).toBeUndefined();
    });

    it('returns undefined when no cat exists with id', () => {
      const id = '404';

      expect(catService.deleteCat(id)).toBeUndefined();
    });
  });

  describe('incrementCat', () => {
    it('increments the clicks on a cat', () => {
      const id = '2';

      catService.incrementCat(id);
      catService.incrementCat(id);
      catService.incrementCat(id);

      const cat = catService.cats.find(id);

      expect(cat.clicks).toEqual(4);
    });

    it('throws NotFoundException when no cat exists with id', () => {
      const id = '404';

      expect(() => {
        catService.incrementCat(id);
      }).toThrowError(NotFoundException);
    });
  });
});
