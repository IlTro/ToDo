const axios = require("axios").default;

export const getTasksAPI = async () => {
  try {
    const response = await axios.get(
      "https://todo-api-learning.herokuapp.com/v1/tasks/1"
    );
    return response.data.tasks;
  } catch (error) {
    console.error(error);
  }
};

export const addTaskAPI = async (name) => {
  try {
    const response = await axios.post(
      "https://todo-api-learning.herokuapp.com/v1/task/1",
      {
        name,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeTaskAPI = async (uuid) => {
  try {
    const response = await axios.delete(
      "https://todo-api-learning.herokuapp.com/v1/task/1/" + uuid
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskAPI = async (task) => {
    try {
      const response = await axios.patch(
        "https://todo-api-learning.herokuapp.com/v1/task/1/" + task.uuid,
        {
          name: task.name,
          done: task.done,
          createdAt: task.createdAt,
          updatedAt: new Date().toISOString(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
