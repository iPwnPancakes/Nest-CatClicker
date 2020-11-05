import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CatsService } from './cats.service';
import Cat from './interfaces/cat.interface';

describe('CatService', () => {
  let catService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    catService = moduleRef.get<CatsService>(CatsService);

    catService.cats = [
      { id: 1, name: 'Pepperoni', clicks: 0 },
      { id: 2, name: 'Rigatoni', clicks: 1 },
    ];
  });

  describe('getAll', () => {
    it('return an array of cats', () => {
      expect(catService.getAll()).toEqual([
        { id: 1, name: 'Pepperoni', clicks: 0 },
        { id: 2, name: 'Rigatoni', clicks: 1 },
      ]);
    });
  });

  describe('updateCat', () => {
    it('updates a cat that exists', async () => {
      const newCat: Cat = { id: 2, name: 'Testeroni', clicks: 0 };

      catService.updateCat(newCat);

      expect(catService.cats).toContainEqual(newCat);
    });

    it('throws NotFoundException when no cat exists with id', () => {
      const newCat: Cat = { id: 404, name: 'THIS CAT DOESNT EXIST', clicks: 0 };

      expect(() => {
        catService.updateCat(newCat);
      }).toThrowError(NotFoundException);
    });

    describe('deleteCat', () => {
      it('deletes a cat that exists', async () => {
        const id = 2;

        catService.deleteCat(id);

        expect(
          catService.cats.find((currentCat: Cat) => currentCat.id === id),
        ).toBeUndefined();
      });

      it('throws NotFoundException when no cat exists with id', () => {
        const id = 404;

        expect(() => {
          catService.deleteCat(id);
        }).toThrowError(NotFoundException);
      });
    });
  });

  describe('incrementCat', () => {
    it('increments the clicks on a cat', () => {
      const id = 2;

      catService.incrementCat(id);
      catService.incrementCat(id);
      catService.incrementCat(id);

      const cat = catService.cats.find(
        (currentCat: Cat) => currentCat.id === id,
      );

      expect(cat.clicks).toEqual(4);
    });

    it('throws NotFoundException when no cat exists with id', () => {
      const id = 404;

      expect(() => {
        catService.incrementCat(id);
      }).toThrowError(NotFoundException);
    });
  });
});
