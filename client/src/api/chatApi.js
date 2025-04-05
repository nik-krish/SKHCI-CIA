import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const config = {
  withCredentials: true,
};

export const fetchChats = async () => {
  const response = await axios.get(`${API_URL}/api/chat`, config);
  return response.data;
};

export const accessChat = async (userId) => {
  const response = await axios.post(`${API_URL}/api/chat`, { userId }, config);
  return response.data;
};

export const createGroupChat = async (name, users) => {
  const response = await axios.post(
    `${API_URL}/api/chat/group`,
    { name, users },
    config
  );
  return response.data;
};

export const getAllMessages = async (chatId) => {
  const response = await axios.get(
    `${API_URL}/api/chat/message/${chatId}`,
    config
  );
  return response.data;
};

export const sendMessage = async ({ content, chatId, taggedUsers }) => {
  const response = await axios.post(
    `${API_URL}/api/chat/message`,
    { content, chatId, taggedUsers },
    config
  );
  return response.data;
};

export const scheduleMeeting = async ({
  chatId,
  date,
  title,
  description,
  room,
}) => {
  const response = await axios.post(
    `${API_URL}/api/chat/schedule-meeting`,
    { chatId, date, title, description, room },
    config
  );
  return response.data;
};

export const getNotifications = async () => {
  const response = await axios.get(`${API_URL}/api/chat/notifications`, config);
  return response.data;
};

export const markNotificationsAsRead = async (notificationIds) => {
  const response = await axios.put(
    `${API_URL}/api/chat/notifications/read`,
    { notificationIds },
    config
  );
  return response.data;
};
