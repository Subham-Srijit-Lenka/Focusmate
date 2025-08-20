import { Router } from "express";
import {
    createTask,
    deleteTask,
    updateTask,
    getAllTask,
    addCollaborator,
    updateCollaboratorRole,
    removeCollaborator
} from "../controllers/tasks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
    .post(verifyJWT, createTask)
    .get(verifyJWT, getAllTask);

router.route("/:id")
    .put(verifyJWT, updateTask)
    .delete(verifyJWT, deleteTask);


router.route("/:id/collaborators")
    .post(verifyJWT, addCollaborator);

router.route("/:id/collaborators/:collaboratorId")
    .put(verifyJWT, updateCollaboratorRole)
    .delete(verifyJWT, removeCollaborator);

export default router;
