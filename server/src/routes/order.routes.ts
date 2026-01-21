import { Router } from "express";
import { placeOrder, updateOrderStatus } from "../controllers/order.controllers";
import { authenticate } from "../middlewares/auth.middlewares";
import { authorize } from "../middlewares/role.middlewares";
import { getMyOrders } from "../controllers/order.controllers";
import { cancelMyOrder } from "../controllers/order.controllers";
import { getAllOrders } from "../controllers/order.controllers";

const router = Router();

router.post("/orders", authenticate,
  authorize(["USER"]), placeOrder);
router.get(
  "/orders/my",
  authenticate,
  authorize(["USER"]),
  getMyOrders
);
router.get(
  "/orders",
  authenticate,
  authorize(["ADMIN"]),
  getAllOrders
);

router.patch(
  "/orders/:id/cancel",
  authenticate,
  authorize(["USER"]),
  cancelMyOrder
);

router.patch("/orders/:id/status", authenticate,
  authorize(["ADMIN"]), updateOrderStatus);


export default router;
