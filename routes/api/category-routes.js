const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product }]
  })
    .then(categories => res.status(200).json(categories))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }]
  })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json(category);
    })
    .catch(err => res.status(500).json(err));
});

// POST a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then(newCategory => res.status(200).json(newCategory))
    .catch(err => res.status(400).json(err));
});

// PUT (update) a category by its `id`
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id }
  })
    .then(updatedCategory => {
      if (!updatedCategory[0]) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Category updated successfully!' });
    })
    .catch(err => res.status(400).json(err));
});

// DELETE a category by its `id`
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  })
    .then(deletedCategory => {
      if (!deletedCategory) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Category deleted successfully!' });
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
