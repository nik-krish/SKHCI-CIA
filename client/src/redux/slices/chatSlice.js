import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  accessChat,
  createGroupChat,
  fetchChats as fetchChatsAPI,
  getAllMessages,
  sendMessage as sendMessageAPI,
  scheduleMeeting as scheduleMeetingAPI,
  getNotifications as getNotificationsAPI,
  markNotificationsAsRead as markNotificationsAsReadAPI,
} from "../../api/chatApi";

const initialState = {
  chats: [],
  selectedChat: null,
  messages: [],
  notifications: [],
  unreadCount: 0,
  status: "idle",
  error: null,
};

export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const response = await fetchChatsAPI();
  return response;
});

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (userId) => {
    const response = await accessChat(userId);
    return response;
  }
);

export const createGroup = createAsyncThunk(
  "chat/createGroup",
  async ({ name, users }) => {
    const response = await createGroupChat(name, users);
    return response;
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId) => {
    const response = await getAllMessages(chatId);
    return { chatId, messages: response };
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ content, chatId, taggedUsers }) => {
    const response = await sendMessageAPI({ content, chatId, taggedUsers });
    return response;
  }
);

export const scheduleMeeting = createAsyncThunk(
  "chat/scheduleMeeting",
  async ({ chatId, date, title, description, room }) => {
    const response = await scheduleMeetingAPI({
      chatId,
      date,
      title,
      description,
      room,
    });
    return response;
  }
);

export const getNotifications = createAsyncThunk(
  "chat/getNotifications",
  async () => {
    const response = await getNotificationsAPI();
    return response;
  }
);

export const markNotificationsAsRead = createAsyncThunk(
  "chat/markNotificationsAsRead",
  async (notificationIds) => {
    await markNotificationsAsReadAPI(notificationIds);
    return notificationIds;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        if (!state.chats.some((chat) => chat._id === action.payload._id)) {
          state.chats.unshift(action.payload);
        }
        state.selectedChat = action.payload;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.chats.unshift(action.payload);
        state.selectedChat = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        if (state.selectedChat?._id === action.payload.chatId) {
          state.messages = action.payload.messages;
        }
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.isRead).length;
      })
      .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((notification) =>
          action.payload.includes(notification._id)
            ? { ...notification, isRead: true }
            : notification
        );
        state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
      });
  },
});

export const { selectChat, addMessage, addNotification, incrementUnreadCount } =
  chatSlice.actions;

export default chatSlice.reducer;
