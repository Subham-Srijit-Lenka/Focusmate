import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Layout from "../layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TaskManager = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    isCompleted: false,
    collaboratorEmail: "",
    collaboratorRole: "viewer",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/tasks");
      setTasks(res.data.data || []);
      console.log(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            You need to log in to access Task Manager
          </h2>
          <motion.button
            onClick={() => navigate("/login")}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="px-15 py-2.5 bg-blue-900 text-white font-semibold 
             rounded-xl shadow-md transition-colors duration-300 
             hover:bg-blue-800 hover:shadow-lg"
          >
            Log in
          </motion.button>
        </div>
      </Layout>
    );
  }

  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      alert("Title is required");
      return;
    }

    let collaborators = [];
    if (newTask.collaboratorEmail.trim()) {
      collaborators = [
        {
          email: newTask.collaboratorEmail.trim(),
          role: newTask.collaboratorRole,
        },
      ];
    }

    try {
      await axios.post("/api/v1/tasks", {
        ...newTask,
        collaborators,
      });
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        isCompleted: false,
        collaboratorEmail: "",
        collaboratorRole: "viewer",
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error adding task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditTaskData({
      ...task,
      collaboratorEmail: task.collaborators?.[0]?.user?.email || "",
      collaboratorRole: task.collaborators?.[0]?.role || "viewer",
    });
  };

  const handleSaveEditTask = async () => {
    try {
      let collaborators = [];
      if (editTaskData.collaboratorEmail.trim()) {
        collaborators = [
          {
            email: editTaskData.collaboratorEmail.trim(),
            role: editTaskData.collaboratorRole,
          },
        ];
      }

      await axios.put(`/api/v1/tasks/${editingTaskId}`, {
        title: editTaskData.title,
        description: editTaskData.description,
        priority: editTaskData.priority,
        dueDate: editTaskData.dueDate,
        isCompleted: editTaskData.isCompleted,
        collaborators,
      });

      setEditingTaskId(null);
      setEditTaskData({});
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error saving task");
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskData({});
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`/api/v1/tasks/${task._id}`, {
        ...task,
        isCompleted: !task.isCompleted,
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error updating task");
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-6 max-w-4xl mx-auto space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white backdrop-blur-xl border-1 border-cyan-400
                        rounded-2xl shadow-[0_0_25px_5px_rgba(0,180,255,0.5)]
                        p-6 transition"
        >
          <h2 className="text-lg font-semibold border-b pb-2">Add New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <input
              type="date"
              className="border rounded-lg px-3 py-2"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
            <select
              className="border rounded-lg px-3 py-2"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, priority: e.target.value }))
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Collaborator email"
              value={newTask.collaboratorEmail}
              onChange={(e) =>
                setNewTask((prev) => ({
                  ...prev,
                  collaboratorEmail: e.target.value,
                }))
              }
            />
            <select
              className="border rounded-lg px-3 py-2"
              value={newTask.collaboratorRole}
              onChange={(e) =>
                setNewTask((prev) => ({
                  ...prev,
                  collaboratorRole: e.target.value,
                }))
              }
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-gradient-to-r from-[#081461] to-[#0A1A72] 
                       text-white px-6 py-2 rounded-lg shadow-lg hover:opacity-90"
            onClick={handleAddTask}
          >
            Add Task
          </motion.button>
        </motion.div>

        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found</p>
          ) : (
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`relative bg-white backdrop-blur-xl border border-cyan-400/20 
                            rounded-2xl shadow-[0_0_25px_5px_rgba(0,180,255,0.3)]
                            p-5 flex justify-between items-start`}
                >
                  {editingTaskId === task._id ? (
                    <div className="space-y-3 w-full">
                      <input
                        className="border rounded-lg px-3 py-2 w-full"
                        value={editTaskData.title}
                        onChange={(e) =>
                          setEditTaskData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <textarea
                        className="border rounded-lg px-3 py-2 w-full"
                        value={editTaskData.description}
                        onChange={(e) =>
                          setEditTaskData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                      <select
                        className="border rounded-lg px-3 py-2"
                        value={editTaskData.priority}
                        onChange={(e) =>
                          setEditTaskData((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }))
                        }
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                      <input
                        className="border rounded-lg px-3 py-2"
                        placeholder="Collaborator email"
                        value={editTaskData.collaboratorEmail}
                        onChange={(e) =>
                          setEditTaskData((prev) => ({
                            ...prev,
                            collaboratorEmail: e.target.value,
                          }))
                        }
                      />
                      <select
                        className="border rounded-lg px-3 py-2"
                        value={editTaskData.collaboratorRole}
                        onChange={(e) =>
                          setEditTaskData((prev) => ({
                            ...prev,
                            collaboratorRole: e.target.value,
                          }))
                        }
                      >
                        <option value="viewer">Viewer</option>
                        <option value="editor">Editor</option>
                      </select>

                      <div className="flex space-x-3">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
                          onClick={handleSaveEditTask}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                        <p className="text-xs mt-1">
                          {task.priority} |{" "}
                          {new Date(task.dueDate).toLocaleDateString()}
                        </p>

                        {task.collaborators?.length > 0 && (
                          <p className="text-xs mt-1 text-gray-500">
                            Collaborators:{" "}
                            {task.collaborators
                              .map((c) => `${c.user.email} (${c.role})`)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleToggleComplete(task)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <CheckIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <PencilSquareIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default TaskManager;
