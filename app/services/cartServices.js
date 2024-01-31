const BaseService = require('./BaseService');
const { Prisma } = require('@prisma/client');

class Cart extends BaseService {
  model = Prisma.ModelName.cart;
  relations = ['products'];

  async find(id) {
    return await this.prisma[this.model].findFirst({
      where: {
        product_id: id,
      },
    });
  }

  async store(data) {
    const {
      cartId,
      productId,
      quantity,
      total,
      newQuantity,
      newTotal,
    } = data;
    return await this.prisma[this.model].upsert({
      where: {
        id: cartId || 0,
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

  async deleteItem(data) {
    const { productId } = data;
  }
  async emptyCart() {
    return await this.prisma[this.model].deleteMany();
  }
}

module.exports = new Cart();
