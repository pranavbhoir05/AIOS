# AIOS

need accesstoken

curl http://localhost:8000/api/v1/chat/conversations \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"

***************************8
need acces token and conversation id

curl http://localhost:8000/api/v1/chat/YOUR_CONVERSATION_ID \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"