import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CatController } from './cats.http.controller';
import { CatsService } from '../../services/cats.service';
import { CreateCatDto } from '../../dto/create-cat.dto';
import { UpdateCatDto } from '../../dto/update-cat.dto';
import { ICat } from '../../interfaces/cat.interface';
import { CatRepository } from '../../repositories/cats.repository';

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

    const repo = new CatRepository([
      { id: '1', name: 'Pepperoni', clicks: 0, parents: [] },
      { id: '2', name: 'Rigatoni', clicks: 0, parents: [] }
    ]);

    catService.cats = repo;
  });

  describe('getAllCats', () => {
    it('should return an array of cats', () => {
      jest.spyOn(catService, 'getAll').mockImplementation(() => catService.cats.getAll());

      expect(catController.getAllCats()).toStrictEqual(catService.cats.getAll());
    });
  });

  describe('addCat', () => {
    it('should create a new cat', () => {
      const { name, clicks }: CreateCatDto = { name: 'Testeroni', clicks: 0 };

      jest.spyOn(catService, 'addCat').mockImplementation((): ICat => {
        const newCat: ICat = { id: '3', parents: [], name, clicks };
        catService.cats.respository.push(newCat);
        return newCat;
      });

      catController.addCat({ name, clicks });

      expect(catService.cats.respository).toContainEqual({ id: '3', parents: [], name, clicks });
    });
  });

  describe('updateCat', () => {
    it('updates a cat that exists', () => {
      const newCat: ICat = { id: '2', name: 'Testeroni', clicks: 0, parents: [] };

      jest.spyOn(catService, 'updateCat').mockImplementation((cat: UpdateCatDto) => {
        const foundCat = catService.cats.find(cat.id);

        const updatedCat = { ...foundCat, ...newCat };

        catService.cats.save(updatedCat);

        return updatedCat;
      });

      catController.updateCat({ id: newCat.id, name: newCat.name, clicks: newCat.clicks });

      expect(catService.cats.respository).toContainEqual(newCat);
    });

    it('throws NotFoundException when no cat exists with id', () => {
      const newCat: UpdateCatDto = { id: '404', name: 'Testeroni', clicks: 0 };

      jest.spyOn(catService, 'updateCat').mockImplementation(() => {
        throw new NotFoundException('Cat not found');
      });

      expect(() => {
        catController.updateCat(newCat);
      }).toThrow(NotFoundException);
    });
  });

  describe('deleteCat', () => {
    it('deletes a cat that exists', () => {
      const id = '2';

      jest.spyOn(catService, 'deleteCat').mockImplementation((id: string) => {
        catService.cats.delete(id);
      });

      catController.deleteCat(id);

      expect(catService.cats.getAll().find((currentCat: ICat) => currentCat.id === id)).toBeUndefined();
    });

    it('throws NotFoundException when no cat exists with id', () => {
      const id = '2';

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
      const cat: ICat = { id: '1', name: 'TEST CAT', clicks: 100, parents: [] };

      jest
        .spyOn(catService, 'incrementCat')
        .mockImplementation((): ICat => ({ ...cat, clicks: cat.clicks + 1 }));

      const response = catController.incrementCat(cat.id);

      expect(response.clicks).toEqual(101);
    });

    it('throws NotFoundException when no cat exists with id', () => {
      const id = '404';

      jest.spyOn(catService, 'incrementCat').mockImplementation(() => {
        throw new NotFoundException('Cat not found');
      });

      expect(() => {
        catController.incrementCat(id);
      }).toThrowError(NotFoundException);
    });
  });
});
