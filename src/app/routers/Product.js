const express = require('express');
const rescue = require('express-rescue');

const ProductController = require('../controllers/Product');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(ProductController.getAll));
router.post('/', rescue(auth), rescue(ProductController.create));
router.get('/:id', rescue(ProductController.findById));
router.put('/:id', rescue(auth), rescue(ProductController.update));
router.delete('/:id', rescue(auth), rescue(ProductController.remove));
router.patch('/:id/image', rescue(auth), upload, rescue(ProductController.addImage));
router.get('/:id/verify', rescue(ProductController.verifyCanBeSell));

module.exports = router;
