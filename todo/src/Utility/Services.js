import * as axios from 'axios';

export const getTasksAPI = async (params) => {
  const response = await axios.get(
    process.env.REACT_APP_BACK_END_URL + "/tasks/1",
    { params }
  );
  return response;
};

export const addTaskAPI = async (name) => {
  const response = await axios.post(
    process.env.REACT_APP_BACK_END_URL + "/task/1",
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
    process.env.REACT_APP_BACK_END_URL + "/task/1/" + uuid
  );
  return response;
};

export const updateTaskAPI = async (task) => {
  const response = await axios.patch(
    process.env.REACT_APP_BACK_END_URL + "/task/1/" + task.uuid,
    {
      name: task.name,
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: new Date().toISOString(),
    }
  );
  return response;
};
