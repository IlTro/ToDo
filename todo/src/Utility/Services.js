import * as axios from "axios";

export const getTasksAPI = async (params, username, token) => {
  const response = await axios.get(
    process.env.REACT_APP_BACK_END_URL + "/tasks/" + username,
    { params, headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const addTaskAPI = async (name, username, token) => {
  const response = await axios.post(
    process.env.REACT_APP_BACK_END_URL + "/task/" + username,
    {
      name,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

export const removeTaskAPI = async (uuid, username, token) => {
  const response = await axios.delete(
    process.env.REACT_APP_BACK_END_URL + "/task/" + username + "/" + uuid,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const updateTaskAPI = async (task, username, token) => {
  const response = await axios.patch(
    process.env.REACT_APP_BACK_END_URL + "/task/" + username + "/" + task.uuid,
    {
      name: task.name,
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: new Date().toISOString(),
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const loginAPI = async (username, password) => {
  const response = await axios.post(
    process.env.REACT_APP_BACK_END_URL + "/login",
    { username, password }
  );
  return response;
};

export const registerAPI = async (username, password) => {
  const response = await axios.post(
    process.env.REACT_APP_BACK_END_URL + "/register",
    { username, password }
  );
  return response;
};
