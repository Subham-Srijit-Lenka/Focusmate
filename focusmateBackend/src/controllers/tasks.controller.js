import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Task } from "../models/tasks.model.js";
import { User } from "../models/user.model.js";

export const getAllTask = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) throw new ApiError(403, "You have not logged in.");

    const tasks = await Task.find({
        $or: [
            { user: userId },
            { "collaborators.user": userId }
        ]
    })
        .populate("user", "username email")
        .populate("collaborators.user", "username email");

    return res.status(200).json(new ApiResponse(200, tasks, "All tasks"));
});

export const createTask = asyncHandler(async (req, res) => {
    const { title, description, isCompleted, dueDate, priority, collaborators } = req.body;
    const user = req.user._id;

    if (typeof title !== "string" || title.trim() === "") {
        throw new ApiError(400, "Title is required");
    }

    let validCollaborators = [];
    if (Array.isArray(collaborators) && collaborators.length > 0) {
        validCollaborators = await Promise.all(
            collaborators.map(async (c) => {
                let collaboratorUser = null;

                if (c.email) {
                    collaboratorUser = await User.findOne({ email: c.email.trim() });
                    if (!collaboratorUser) {
                        throw new ApiError(404, `Collaborator with email ${c.email} not found`);
                    }
                } else if (c.user) {
                    collaboratorUser = await User.findById(c.user);
                }

                return {
                    user: collaboratorUser?._id,
                    role: c.role || "viewer"
                };
            })
        );
    }

    const task = await Task.create({
        user,
        title,
        description,
        isCompleted,
        dueDate,
        priority,
        collaborators: validCollaborators
    });

    req.io?.emit("task:created", task);

    return res.status(200).json(
        new ApiResponse(200, task, "Task created successfully")
    );
});

export const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id;

    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");

    const isOwner = task.user.toString() === userId.toString();
    const isEditor = task.collaborators.some(
        c => c.user.toString() === userId.toString() && c.role === "editor"
    );

    if (!isOwner && !isEditor) {
        throw new ApiError(403, "You do not have permission to edit this task");
    }

    if (updates.collaborators && isOwner) {
        const validCollaborators = await Promise.all(
            updates.collaborators.map(async (c) => {
                if (!c.user && !c.email) {
                    throw new ApiError(400, "Collaborator must have user ID or email");
                }

                let collaboratorUser = null;

                if (c.email) {
                    collaboratorUser = await User.findOne({ email: c.email.trim() });
                    if (!collaboratorUser) {
                        throw new ApiError(404, `Collaborator with email ${c.email} not found`);
                    }
                } else {
                    collaboratorUser = await User.findById(c.user);
                    if (!collaboratorUser) {
                        throw new ApiError(404, `Collaborator with ID ${c.user} not found`);
                    }
                }

                return {
                    user: collaboratorUser._id,
                    role: c.role || "viewer"
                };
            })
        );

        updates.collaborators = validCollaborators;
    } else {
        delete updates.collaborators;
    }

    Object.assign(task, updates);
    const updatedTask = await task.save();

    req.io?.emit("task:updated", updatedTask);

    return res.status(200).json(
        new ApiResponse(200, updatedTask, "Task updated successfully")
    );
});



export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");

    if (task.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Only the owner can delete this task");
    }

    await task.deleteOne();

    req.io?.emit("task:deleted", { id });

    return res.status(200).json(
        new ApiResponse(200, null, "Task deleted successfully")
    );
});

export const addCollaborator = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { user, role } = req.body;
    const ownerId = req.user._id;

    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");

    if (task.user.toString() !== ownerId.toString()) {
        throw new ApiError(403, "Only the owner can add collaborators");
    }

    const alreadyExists = task.collaborators.some(
        c => c.user.toString() === user
    );
    if (alreadyExists) throw new ApiError(400, "Collaborator already added");

    task.collaborators.push({ user, role: role || "viewer" });
    await task.save();

    req.io?.emit("task:collaboratorAdded", { taskId: id, user, role });

    return res.status(200).json(
        new ApiResponse(200, task, "Collaborator added successfully")
    );
});


export const updateCollaboratorRole = asyncHandler(async (req, res) => {
    const { id, collaboratorId } = req.params;
    const { role } = req.body;
    const userId = req.user._id;

    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");

    if (task.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Only owner can update collaborator roles");
    }

    const collaborator = task.collaborators.find(c => c.user.toString() === collaboratorId);
    if (!collaborator) throw new ApiError(404, "Collaborator not found");

    collaborator.role = role || "viewer";
    await task.save();

    req.io?.emit("task:collaboratorRoleUpdated", { taskId: id, collaboratorId, role });

    res.status(200).json(new ApiResponse(200, task, "Collaborator role updated successfully"));
});


export const removeCollaborator = asyncHandler(async (req, res) => {
    const { id, collaboratorId } = req.params;
    const userId = req.user._id;

    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");

    if (task.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Only owner can remove collaborators");
    }

    task.collaborators = task.collaborators.filter(c => c.user.toString() !== collaboratorId);
    await task.save();

    req.io?.emit("task:collaboratorRemoved", { taskId: id, collaboratorId });

    res.status(200).json(new ApiResponse(200, task, "Collaborator removed successfully"));
});
