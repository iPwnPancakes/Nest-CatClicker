import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CatController } from './cats.controller';
import { CatsService } from './cats.service';
import Cat from './interfaces/cat.interface';

describe('CatController', () => {
  let catController: CatController;
  let catService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatsService],
    }).compile();

    catService = moduleRef.get<CatsService>(CatsService);
    catController = moduleRef.get<CatController>(CatController);

    catService.cats = [
      { id: 1, name: 'Pepperoni', clicks: 0 },
      { id: 2, name: 'Rigatoni', clicks: 0 },
    ];
  });

  describe('getAllCats', () => {
    it('should return an array of cats', async () => {
      const result: Array<Cat> = [
        { id: 1, name: 'Pepperoni', clicks: 0 },
        { id: 2, name: 'Rigatoni', clicks: 0 },
      ];

      jest.spyOn(catService, 'getAll').mockImplementation(() => result);

      expect(await catController.getAllCats()).toBe(result);
    });
  });

  describe('addCat', () => {
    it('should create a new cat', async () => {
      const newCat: Cat = { id: 3, name: 'Testeroni', clicks: 0 };

      jest.spyOn(catService, 'addCat').mockImplementation((cat: Cat) => {
        catService.cats.push(cat);
      });

      await catController.addCat(newCat);

      expect(catService.cats).toContainEqual(newCat);
    });
  });

  describe('updateCat', () => {
    it('updates a cat that exists', async () => {
      const newCat: Cat = { id: 2, name: 'Testeroni', clicks: 0 };

      jest.spyOn(catService, 'updateCat').mockImplementation((cat: Cat) => {
        const index = catService.cats.findIndex(
          currentCat => currentCat.id === cat.id,
        );

        const updatedCat = { ...catService.cats[index], ...newCat };

        catService.cats.splice(index, 1, updatedCat);

        return updatedCat;
      });

      await catController.updateCat(newCat);

      expect(catService.cats).toContainEqual(newCat);
    });

    it('throws NotFoundException when no cat exists with id', async () => {
      const newCat: Cat = { id: 404, name: 'Testeroni', clicks: 0 };

      jest.spyOn(catService, 'updateCat').mockImplementation(() => {
        throw new NotFoundException('Cat not found');
      });

      expect(() => {
        catController.updateCat(newCat);
      }).toThrow(NotFoundException);
    });
  });

  describe('deleteCat', () => {
    it('deletes a cat that exists', async () => {
      const id = 2;

      jest.spyOn(catService, 'deleteCat').mockImplementation((id: number) => {
        const index = catService.cats.findIndex(
          (currentCat: Cat) => currentCat.id === id,
        );

        catService.cats.splice(index, 1);
      });

      catController.deleteCat(id);

      expect(
        catService.cats.find((currentCat: Cat) => currentCat.id === id),
      ).toBeUndefined();
    });

    it('throws NotFoundException when no cat exists with id', async () => {
      const id = 2;

      jest.spyOn(catService, 'deleteCat').mockImplementation(() => {
        throw new NotFoundException('Cat not found');
      });

      expect(() => {
        catController.deleteCat(id);
      }).toThrowError(NotFoundException);
    });
  });

  describe('incrementCat', () => {
    it('increments a cat that exists', () => {
      const cat: Cat = { id: 1, name: 'TEST CAT', clicks: 100 };

      jest
        .spyOn(catService, 'incrementCat')
        .mockImplementation((): Cat => ({ ...cat, clicks: cat.clicks + 1 }));

      const response = catController.incrementCat(1);

      expect(response.clicks).toEqual(101);
    });

    it('throws NotFoundException when no cat exists with id', () => {
      const id = 404;

      jest.spyOn(catService, 'incrementCat').mockImplementation(() => {
        throw new NotFoundException('Cat not found');
      });

      expect(() => {
        catController.incrementCat(id);
      }).toThrowError(NotFoundException);
    });
  });
});
