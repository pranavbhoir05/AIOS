import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    sendMessage,
    getConversations,
    getConversation,
} from "../services/chat.service";


const Chat = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Ref for auto-scrolling
    const messagesEndRef = useRef(null);

    const loadConversations = async () => {
        try {
            const res = await getConversations();
            setConversations(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadConversations();
    }, []);

    // Auto-scroll effect
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const loadMessages = async (id) => {
        try {
            const res = await getConversation(id);
            setConversationId(id);
            setMessages(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = {
            _id: Date.now(),
            role: "user",
            content: input,
        };

        // Show user's message immediately
        setMessages((prev) => [...prev, userMessage]);

        const currentMessage = input;

        setInput("");
        setLoading(true);

        try {
            const res = await sendMessage({
                conversationId,
                message: currentMessage,
            });

            const id = res.data.data.conversationId;

            setConversationId(id);

            await loadConversations();
            await loadMessages(id);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    
    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <div
                style={{
                    width: "300px",
                    borderRight: "1px solid #ccc",
                    padding: "15px",
                    overflowY: "auto",
                }}
            >
                <h2>Chats</h2>

                <button
                    onClick={() => {
                        setConversationId(null);
                        setMessages([]);
                    }}
                    style={{
                        width: "100%",
                        marginBottom: "20px",
                        padding: "10px",
                    }}
                >
                    + New Chat
                </button>

                {conversations.map((chat) => (
                    <div
                        key={chat._id}
                        onClick={() => loadMessages(chat._id)}
                        style={{
                            cursor: "pointer",
                            padding: "10px",
                            marginBottom: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                        }}
                    >
                        {chat.title}
                    </div>
                ))}
            </div>

            {/* Chat Area */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px",
                        borderBottom: "1px solid #ccc",
                    }}
                >
                    <h1>AI Operating System</h1>

                    <div>
                        Welcome <b>{user?.fullName}</b>

                        <button
                            onClick={handleLogout}
                            style={{ marginLeft: "15px" }}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "20px",
                    }}
                >
                    {messages.length === 0 && (
                        <p>Start a new conversation...</p>
                    )}

                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            style={{
                                display: "flex",
                                justifyContent:
                                    msg.role === "user"
                                        ? "flex-end"
                                        : "flex-start",
                                marginBottom: "15px",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "70%",
                                    padding: "12px",
                                    borderRadius: "10px",
                                    background:
                                        msg.role === "user"
                                            ? "#1976d2"
                                            : "#f0f0f0",
                                    color:
                                        msg.role === "user"
                                            ? "white"
                                            : "black",
                                }}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                marginBottom: "15px",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "70%",
                                    padding: "12px",
                                    borderRadius: "10px",
                                    background: "#f0f0f0",
                                    color: "black",
                                }}
                            >
                                Thinking...
                            </div>
                        </div>
                    )}

                    {/* Scroll anchor */}
                    <div ref={messagesEndRef}></div>
                </div>

                {/* Input */}
                <div
                    style={{
                        display: "flex",
                        padding: "20px",
                        borderTop: "1px solid #ccc",
                    }}
                >
                    <input
                        type="text"
                        value={input}
                        placeholder="Type a message..."
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend();
                            }
                        }}
                        style={{
                            flex: 1,
                            padding: "12px",
                            fontSize: "16px",
                        }}
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading}
                        style={{
                            marginLeft: "10px",
                            padding: "12px 25px",
                        }}
                    >
                        {loading ? "Thinking..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;