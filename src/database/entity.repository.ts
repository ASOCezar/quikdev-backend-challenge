import { AnyKeys, AnyObject, Document, FilterQuery, Model } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery);
  }

  async create(createEntityData: AnyKeys<T> & AnyObject): Promise<T> {
    const entity = new this.entityModel(createEntityData);

    return await entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: AnyKeys<T> & AnyObject,
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async delete(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteOne(entityFilterQuery);

    return deleteResult.deletedCount >= 1;
  }
}
