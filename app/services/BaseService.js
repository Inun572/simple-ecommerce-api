const { PrismaClient } = require('@prisma/client');

class BaseService {
  prisma;
  model;
  relations;
  constructor() {
    this.prisma = new PrismaClient();
    this.relations = [];
  }
  async get() {
    if (this.relations.length === 0) {
      return await this.prisma[this.model].findMany();
    }
    return await this.prisma[this.model].findMany({
      include: this.relations.reduce((acc, curr) => {
        return {
          ...acc,
          [curr]: true,
        };
      }),
    });
  }

  async find(id) {
    return await this.prisma[this.model].findUnique({
      where: {
        id,
      },
    });
  }
}

module.exports = BaseService;
