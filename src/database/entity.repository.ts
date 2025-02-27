import { AnyKeys, AnyObject, Document, FilterQuery, Model } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(): Promise<T[]> {
    return await this.entityModel.find();
  }

  async create(createEntityData: AnyKeys<T> & AnyObject): Promise<T> {
    return this.entityModel.create(createEntityData);
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

  async delete(entityFilterQuery: FilterQuery<T>): Promise<void> {
    await this.entityModel.findOneAndDelete(entityFilterQuery);
  }
}
