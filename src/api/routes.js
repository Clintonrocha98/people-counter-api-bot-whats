import { Router } from "express";
import controller from "../api/controller.js";

const router = Router();

router.get("/", controller.getCurrentCount);
router.patch("/increment", controller.incrementPeopleCount);
router.patch("/decrement", controller.decrementPeopleCount);

export { router };