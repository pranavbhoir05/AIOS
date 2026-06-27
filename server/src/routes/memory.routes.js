import { Router } from "express";
import {
    createMemoryController,
    getMemoriesController,
    getMemoryController,
    updateMemoryController,
    deleteMemoryController,
} from "../controllers/memory.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createMemoryController)
    .get(getMemoriesController);

router.route("/:id")
    .get(getMemoryController)
    .patch(updateMemoryController)
    .delete(deleteMemoryController);

export default router;