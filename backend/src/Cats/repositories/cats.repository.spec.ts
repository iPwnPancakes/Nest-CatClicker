import { HttpException, NotFoundException } from '@nestjs/common';
import { CatRepository } from './cats.repository';

describe('CatRepository', () => {
  let repo: CatRepository;

  beforeEach(() => {
    repo = new CatRepository();
    repo.respository = [
      { id: '1', name: 'Pepperoni', clicks: 0, parents: [] },
      { id: '2', name: 'Rigatoni', clicks: 0, parents: [] },
    ];
  });

  describe('repository', () => {
    it('should be an array', () => {
      expect(Array.isArray(repo.respository)).toEqual(true);
    });
  });

  describe('find', () => {
    it('finds cat that exists', () => {
      expect(repo.find('1')).toEqual(repo.respository[0]);
    });

    it('returns undefined when cat id not in repository array', () => {
      expect(repo.find('404')).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('deletes a cat that exists', () => {
      repo.delete('1');

      expect(
        repo.respository.find(currentCat => currentCat.id === '1'),
      ).toBeUndefined();
    });

    it('should not error if cat id was not found', () => {
      expect(() => {
        repo.delete('404');
      }).not.toThrowError();
    });
  });

  describe('save', () => {
    it('saves a cat that exists', () => {
      let updatedCat = repo.respository[0];

      updatedCat = { ...updatedCat, name: 'fluffykins' };

      repo.save(updatedCat);

      expect(repo.respository[0].name).toBe('fluffykins');
    });

    it('throws NotFoundException if cat does not exist', () => {
      let updatedCat = repo.respository[0];

      updatedCat = { ...updatedCat, id: 'DOES NOT EXIST' };

      expect(() => {
        repo.save(updatedCat);
      }).toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates a new cat if parent ids are omitted', () => {
      const newCat = repo.create({ name: 'NewCat' });

      expect(repo.respository.find(cat => cat.id === newCat.id).name).toBe(
        newCat.name,
      );
    });

    it('creates a new cat if valid parent ids provided', () => {
      const newCat = repo.create({
        name: 'NewCat',
        momCatId: '1',
        dadCatId: '2',
      });

      expect(newCat.parents.map(parent => parent.id).includes('1')).toBe(true);
      expect(newCat.parents.map(parent => parent.id).includes('2')).toBe(true);
    });

    it('throws an error if invalid parent id specified', () => {
      expect(() => {
        repo.create({
          name: 'NewCat',
          momCatId: 'aaaa',
          dadCatId: '1',
        });
      }).toThrowError(NotFoundException);
    });

    it('throws an error if only one parent id specified', () => {
      expect(() => {
        repo.create({
          name: 'NewCat',
          momCatId: '1',
        });
      }).toThrowError(NotFoundException);
    });

    it('throws an error if both parent ids are the same', () => {
      expect(() => {
        repo.create({
          name: 'NewCat',
          momCatId: '1',
          dadCatId: '1',
        });
      }).toThrowError(HttpException);
    });
  });
});
