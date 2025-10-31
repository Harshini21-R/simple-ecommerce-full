const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.post('/', protect, adminOnly, addProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
