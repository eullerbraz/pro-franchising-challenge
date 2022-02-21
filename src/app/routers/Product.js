const express = require('express');
const rescue = require('express-rescue');

const ProductController = require('../controllers/Product');
const upload = require('../middlewares/upload');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(ProductController.getAll));
router.post('/', rescue(ProductController.create));
router.get('/:id', rescue(ProductController.findById));
router.put('/:id', rescue(ProductController.update));
router.delete('/:id', rescue(ProductController.remove));
router.patch('/:id/image', upload, rescue(ProductController.addImage));
router.get('/:id/verify', rescue(ProductController.verifyCanBeSell));

module.exports = router;
