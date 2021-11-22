type DeleteManyType = {
  deletedCount: number;
};

export abstract class MockModel<T> {
  protected abstract entityStub: T;

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  async create(createEntityData: T): Promise<T> {
    return createEntityData;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async deleteMany(): Promise<DeleteManyType> {
    return {
      deletedCount: 1,
    };
  }
}
