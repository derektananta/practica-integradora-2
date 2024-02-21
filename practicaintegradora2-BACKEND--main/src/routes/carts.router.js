import { Router } from "express"
import { cartsCreateController, cartsIdController, cartsAddProductController, cartsListController, cartsDeleteController, cartsProductsDeleteController, cartsUpdateController, cartsUpdateProductController, cartsAllProductsDeleteController } from "../controllers/carts.controller.js"
export const router = Router()

router.get("/list", cartsListController)
router.get("/:cid", async (req, res) => {
    const cartData = await cartsIdController(req, res);
    res.json(cartData)
})

router.put("/:cid", cartsUpdateController)
router.put("/:cid/products/:pid", cartsUpdateProductController)

router.post("/create", cartsCreateController)
router.post("/:cid/products/:pid", cartsAddProductController)

router.delete("/deleteCart/:cid", cartsDeleteController)
router.delete("/:cid/deleteProduct/:pid", cartsProductsDeleteController)
router.delete("/:cid", cartsAllProductsDeleteController)