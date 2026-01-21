import mongoose, { Schema } from "mongoose";

export interface productDocument {
    name: string,
    price: number,
    stock: number,
    imageUrl:string,
}

const productSchema = new Schema<productDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        }, 
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model<productDocument>("Product", productSchema);