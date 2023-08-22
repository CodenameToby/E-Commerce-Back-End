const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try { 
    const categoryData = await Category.findAll({
      include: [{model: Product}],
  });
  res.json(categoryData);
} catch(err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({message: 'No category found with that id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body); 
    res.status(201).json(newCategory); 
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'An error occurred while creating the category.' });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
