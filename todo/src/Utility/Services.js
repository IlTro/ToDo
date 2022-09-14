const axios = require("axios").default;

export const getTasksAPI = async (params) => {
  const response = await axios.get(
    "https://todo-api-learning.herokuapp.com/v1/tasks/1",
    { params }
  );
  return response;
};

export const addTaskAPI = async (name) => {
  const response = await axios.post(
    "https://todo-api-learning.herokuapp.com/v1/task/1",
    {
      name,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );
  return response;
};

export const removeTaskAPI = async (uuid) => {
  const response = await axios.delete(
    "https://todo-api-learning.herokuapp.com/v1/task/1/" + uuid
  );
  return response;
};

export const updateTaskAPI = async (task) => {
  const response = await axios.patch(
    "https://todo-api-learning.herokuapp.com/v1/task/1/" + task.uuid,
    {
      name: task.name,
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: new Date().toISOString(),
    }
  );
  return response;
};
