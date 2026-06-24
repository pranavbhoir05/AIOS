import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";

import {
    sendMessage,
    getUserConversations,
    getConversationMessages,
    renameConversation,
    deleteConversation
} from "../controllers/chat.controller.js";

const router = Router();

router.post("/", verifyJWT, sendMessage);

router.get(
    "/conversations",
    verifyJWT,
    getUserConversations
);

router.get(
    "/:conversationId",
    verifyJWT,
    getConversationMessages
);

router.patch(
    "/:conversationId",
    verifyJWT,
    renameConversation
);

router.delete(
    "/:conversationId",
    verifyJWT,
    deleteConversation
);

export default router;