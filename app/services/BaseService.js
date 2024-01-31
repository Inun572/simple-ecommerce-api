const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class BaseService {
  constructor(table) {
    this.tableName = table;
  }
  async get() {
    return await prisma[`${this.tableName}`].findMany();
  }

  async find() {}
}

module.exports = BaseService;
