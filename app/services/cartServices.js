const BaseService = require('./BaseService');
const { Prisma } = require('@prisma/client');

class Cart extends BaseService {
  model = Prisma.ModelName.cart;
}

module.exports = new Cart();
