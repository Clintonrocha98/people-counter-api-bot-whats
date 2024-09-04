import { Router } from "express";
import controller from "../api/controller.js";

const router = Router();

router.get("/", controller.getCurrentCount);
router.get("/increment", controller.incrementPeopleCount);
router.get("/decrement", controller.decrementPeopleCount);

export { router };