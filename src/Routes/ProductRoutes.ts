const express = require("express")
const router = express.Router()
const { CreateProduct, GetAllProducts, GetSingleProduct, DeleteProduct, UpdateProduct } = require("../Controllers/ProductController")
const upload = require("../../Middleware/Multer")


router.post("/", 
  upload.fields([
    {name:"image",maxcount:1},
  ]),
  CreateProduct);

router.get("/", GetAllProducts);
router.get("/:id", GetSingleProduct);

router.delete("/:id", DeleteProduct);

router.put("/:id", UpdateProduct);

module.exports = router