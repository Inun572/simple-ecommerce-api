const BaseService = require('./BaseService');
const { Prisma } = require('@prisma/client');

class Cart extends BaseService {
  model = Prisma.ModelName.cart;

  async find(id) {
    return await this.prisma[this.model].findFirst({
      where: {
        product_id: id,
      },
    });
  }

  async store(data) {
    const {
      productId,
      quantity,
      total,
      newQuantity,
      newTotal,
    } = data;
    return await this.prisma[this.model].upsert({
      where: {
        product_id: productId,
      },
      create: {
        product_id: productId,
        quantity,
        total,
      },
      update: {
        quantity: newQuantity,
        total: newTotal,
      },
    });
  }

  async update(data) {
    const { productId, newQuantity, total } = data;
    return await this.prisma[this.model].update({
      where: {
        product_id: productId,
      },
      data: {
        quantity: newQuantity,
        total,
      },
    });
  }
}

module.exports = new Cart();
