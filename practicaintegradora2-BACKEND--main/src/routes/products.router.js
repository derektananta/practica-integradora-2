import { Router } from "express"
import { productsFiltersController, productsIdController, productsAddController, productsUpdateController, productsDeleteController } from "../controllers/products.controller.js"
export const router = Router()

router.get("/", async (req, res) => {
    const productsData = await productsFiltersController(req, res);
    res.json(productsData);
});

router.get("/:pid", productsIdController);

router.post("/add", productsAddController);

router.put("/:pid", productsUpdateController)

router.delete("/:pid", productsDeleteController)