import { Request, Response } from "express";
import { Product } from "../models/product.models";
import { uploadImageToCloudinary } from "../services/upload.service";

export const createProduct = async (req: Request, res: Response) => {
    try {
         const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadImageToCloudinary(req.file.buffer);

    const product = await Product.create({
      name,
      price,
      stock,
      imageUrl,
    });

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json("Product is not created");
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json("unable to products");
    }
}

export const updateProductDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { name, price },
            { new: true }
        );

        if (!product) {
            return res.status(404).json("Product not found" );
        }

        res.status(200).json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.status(500).json("Failed to update product" );
    }
};
