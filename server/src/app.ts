import express from "express";
import cors from "cors";

const app=express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})

import healthRoutes from "./routes/health.routes"
app.use(healthRoutes);

import productRoutes from "./routes/product.routes";
app.use(productRoutes);

import orderRoutes from "./routes/order.routes";
app.use(orderRoutes);

import authRoutes from "./routes/auth.routes";
app.use("/auth", authRoutes);


export default app;