const { Prisma } = require('@prisma/client');
const BaseService = require('./BaseService');

class Product extends BaseService {
  model = Prisma.ModelName.products;

  async findMany(ids) {
    return await this.prisma.products.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

module.exports = new Product();
