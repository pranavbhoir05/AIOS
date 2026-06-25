import api from "../api/axios";

export const sendMessage = (data) => {
    return api.post("/chat", data);
};

export const getConversations = () => {
    return api.get("/chat/conversations");
};

export const getConversation = (id) => {
    return api.get(`/chat/${id}`);
};

export const renameConversation = (id, title) => {
    return api.patch(`/chat/${id}`, { title });
};

export const deleteConversation = (id) => {
    return api.delete(`/chat/${id}`);
};