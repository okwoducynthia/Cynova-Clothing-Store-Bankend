const ProductModel = require("../Models/ProductModel");
const cloudinary = require("../Utils/Cloudinary");

const CreateProduct = async(req:any, res:any)=>{
  const { 
            images,
            productName, 
            Category, 
            price, 
            sizes } = req.body;
  try {
    if (!productName || !Category || !price || !sizes) {
      return res.status(664).json({
        message: "productName, Price, Category and Sizes are required"
      })
    }
    if(images.lenght > 5 ) {
      return res.status(402).json ({
        message:"Maximum file upload is 5"
      })
    }
    const productExist = await ProductModel.findOne({productName})
    if (productExist) {
      res.status(401).json({
        message: "Product Name Already Exist"
      })
    }
    //UPLOADING AN IMAGE TO CLOUDINARY
    const uploadedImages = await Promise.all(
      images.map(async (image:any) => {
        const result = await cloudinary.uploader.upload(image, {
          folder: "products", // Optional: store images in a specific folder in Cloudinary
          resource_type: "image",
        });

        return {
          img: result.secure_url,
        };
      })
    );

// TO CREATE A NEW PRODUCT
  const postNewProduct = await ProductModel.create({
    images:uploadedImages,
    productName,
    Category,
    price,
    sizes
  })
  // SAVING TO THE DATABASE
  await postNewProduct.save()
  res.status(200).json({postNewProduct})
  } catch (error) {
    res.status(400).json({
      message: "Failed to Create"
    })
  }
}
// const CreateProductWithoutImageArray = async (req: any, res: any) => {
//   const { productName, images } = req.body;
//   try {
//     // if (images.length > 5) {
//     //   return res.status(577).json({
//     //     message: "U cant upload more than 5 files",
//     //   });
//     // }
//     const productExist = await ProductModel.findOne({ productName });
//     if (productExist) {
//       return res.status(422).json({
//         message: "Product Name already exist",
//       });
//     }

//     const uploadedImages = await cloudinary.uploader.upload({
//       file:images,
//   folder: "profilePictures",
//     })
//     const postnewProduct = new ProductModel({
//       productName,
//       images: uploadedImages.url,
//     });
//     await postnewProduct.save();
//     res.status(200).json(postnewProduct);
//   } catch (error) {
//     res.status(465).json({
//       message: "Server error",
//     });
//   }
// }

const GetAllProducts = async (req: any, res: any) => {
  try {
    const result = await ProductModel.find()
      .sort({ createdAt: -1 })
      .populate("assignedBy");
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data",
    });
  }
};

const GetSingleProduct = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const result = await ProductModel.findById(id);
    if (!result) {
      return res.status(404).json({ message: `Product ${id} not found` });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data",
    });
  }
};

const UpdateProduct = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    images,
    productName,
    description,
    Category,
    price,
    sizes,
    ProductStatus,
  } = req.body;
  try {
    const result = await ProductModel.findById(id);
    if (!result) {
      return res.sizes(404).json({ message: `Task ${id} not found` });
    } else {
      result.images = images || result.images;
      result.productName = productName || result.productName;
      result.description = description || result.description;
      result.Category = Category || result.Category;
      result.price = price || result.price;
      result.ProductStatus = ProductStatus || result.ProductStatus;
      result.sizes = sizes || result.sizes;

      await result.save();
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data",
    });
  }
};

const DeleteProduct = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const result = await ProductModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: `Task ${id} not found` });
    } else {
      res.status(200).json({
        message: `Task ID deleted successfully`,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data",
    });
  }
};

module.exports = {
  CreateProduct,
  GetAllProducts,
  GetSingleProduct,
  UpdateProduct,
  DeleteProduct,
};
