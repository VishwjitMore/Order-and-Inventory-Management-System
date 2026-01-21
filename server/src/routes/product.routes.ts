import { Router } from "express";
import { createProduct, getAllProducts, updateProductDetails } from "../controllers/product.controllers";
import { authenticate } from "../middlewares/auth.middlewares";
import { authorize } from "../middlewares/role.middlewares";
import { upload } from "../middlewares/upload.middlewares";

const router = Router();

router.post("/products", authenticate,
    authorize(["ADMIN"]),upload.single("image"), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", authenticate,
    authorize(["ADMIN"]), updateProductDetails);

export default router;