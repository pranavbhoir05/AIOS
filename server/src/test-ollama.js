import dotenv from 'dotenv';
dotenv.config();

import askAI from './src/services/ai.service.js';

const testOllama = async () => {
    try {
        console.log('🧪 Testing Ollama connection...');
        console.log('OLLAMA_BASE_URL:', process.env.OLLAMA_BASE_URL);

        const messages = [
            { role: 'user', content: 'Hello, are you working?' }
        ];

        const response = await askAI(messages);
        console.log('✅ AI Response:', response);
    } catch (error) {
        console.error('❌ Test Failed:', error.message);
    }
};

testOllama();