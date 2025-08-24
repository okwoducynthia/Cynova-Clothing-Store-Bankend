const express = require("express")
const router = express.Router()
const { CreateProduct, GetAllProducts, GetSingleProduct, DeleteProduct, UpdateProduct } = require("../Controllers/ProductController")
const upload = require("../../Middleware/Multer")


router.post("/", CreateProduct);

router.get("/", GetAllProducts);
router.get("/:id", GetSingleProduct);

router.delete("/:id", DeleteProduct);

router.put("/:id", UpdateProduct);

module.exports = router