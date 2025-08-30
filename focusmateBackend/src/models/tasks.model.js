import mongoose, { Schema } from "mongoose";

const collaboratorSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["editor", "viewer"],
            default: "viewer",
        },
    },
    { _id: false }
);

const taskSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        dueDate: {
            type: Date,
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        collaborators: {
            type: [collaboratorSchema],
            default: [],
        },
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
