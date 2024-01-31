const { PrismaClient } = require('@prisma/client');

class BaseService {
  prisma;
  model;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async get() {
    return await this.prisma[this.model].findMany();
  }

  async find(id) {
    return await this.prisma[this.model].findUnique({
      where: {
        id,
      },
    });
  }

  async store() {}
}

module.exports = BaseService;
