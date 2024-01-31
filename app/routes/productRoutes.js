const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    if (req.query.id) {
      let productIds;
      if (!Array.isArray(req.query.id)) {
        productIds = [Number(req.query.id)];
      } else {
        productIds = req.query.id
          .map(Number)
          .filter((id) => !isNaN(id));
      }
      const products = await prisma.products.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      return res.json({
        message: 'success',
        data:
          products.length === 1 ? products[0] : products,
      });
    }
    const products = await prisma.products.findMany();
    res.json({
      message: 'success',
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({
        message: 'Invalid Product ID',
      });
    }

    const product = await prisma.products.findUniqueOrThrow(
      {
        where: {
          id: productId,
        },
      }
    );

    res.json({
      message: 'success',
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = req.body;

    const data = await prisma.products.create({
      data: product,
      select: {
        id: true,
        name: true,
      },
    });

    res.json({
      message: 'success',
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const product = req.body;

    if (isNaN(productId)) {
      return res.status(400).json({
        message: 'Invalid Product ID',
      });
    }

    const data = await prisma.products.update({
      data: product,
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.json({
      message: 'success update product',
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
});

module.exports = router;
