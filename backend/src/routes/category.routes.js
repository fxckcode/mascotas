import { Router } from "express";
import { getCategories, setCategory } from "../controllers/categories.controller.js";

const router = Router()

router.get('/categories', getCategories)
router.post('/categories', setCategory)

export default router