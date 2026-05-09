// server.js - Payal AI Agent (Full AI Replies, No Shortcuts)
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// ============= FIREBASE CONFIG =============
const serviceAccount = {
    type: "service_account",
    project_id: "notification-73987",
    private_key_id: "8a38996fa54a421634dffe035eba3e177e87a226",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2n04s4y/6Bl8q\nIGkjs8/NXYY40pkj8UC/2KjN1KIDnysUzoTRDMPZXL8hl8NehHsqJYqrIZLS467W\nBgfolJC5Po9laMvBJ0GFaiZK2Cuh+LcNhBmrAIGTDkIe4vPQGsFQVgIlB8/4F3wp\nP80rZPf/Q+opSatKXdN5KlvEGekjn4sPtIw2/4m0SMc1b7FE0F3kBelHJLnmPJhh\nCesn71pOcIPfHKjfarElUpXEkD8zt2V5P0WiCobOXSXVnuXQ5HqDIt0LK+Xqeerm\nSaT2hoCN8b30oH012fW/VCtC6D3U+KRbSXdunSNrM1H2CML/bqnbKB7VuXFBb4k7\nEPE83XmTAgMBAAECggEADJ85SZdXAYwSZIvI67n9BGl3LwY42QGCECbRXY7zHUnE\nmIBaZBIVymtdBBCRMdjGPat9yHleXhhBq6YCQrj1J77pk+ciVHJ6IzzeJXe7ZeTi\nzs3w8dJSVYk7i+PAjJzMyT8O9uNxvei7Ootsvf5EhbtHIlAzkcUNkLPn+i3J4Oq2\nbAhiCh0grtbZZf55ctyev0i2X5RhepPEJAjAf9/1gZj+o4u9jrMIRMJD/yByibfk\nWGJHyuYRPGpZy/SD72zMXKsA2KnZRJgYvQssqtwFQcROxxd31YWDHij/MTue1sJR\nCUYlCLBTCShHQlWpUTLGUbq+i/edQSmZZfY0babVQQKBgQDprMYgKSZGJV20OUQs\nTomszOo/5HjwUg8ZIl2C+rAsxhlr3R5g8EsAZfNcTiDbk4oBMB+e7Gq2NfHSI4Q7\nhpkM//fnUkdw5nhNlrg2qWn/5jcy6T8xXmcfR+iJ93j5o6patXSyHWZB4siu2czm\n4asdYttfnE2lJk3FeLdmyLUP5wKBgQDIEeKvXzCjus1PY1rYK459mObk3sM9HQ9G\nvS0ZpnvpiJsU8qrBDzEzhHNwAImzK3qiwWEcVYfMeexgodUK0ykIPcFkBG2GvKwh\nZ/F1YA/tM+Smy129aF9zPa0ResADlVf5mPJBW/GVfXfoDJVEWmPnXb6UWBboRoLr\ne0vXdfaDdQKBgQCj/W2Z2mcS6VxGg731PjTegXyP1F6PgXc5E2X+6sHC2k+y5B5S\nt7BbGjFdATOMBZHfXY+Db7VAJMGN0QEW6VH1zpmCzLp4YDXjdbfYHLLYNQ9d+lUv\n52mFiWiHkpZi09pVCG1aJsnByU8/bnifO5Zj7CG6iq3vDd+ciyhiyM5Q1wKBgFi5\n1dYAWQnDZhm27iq/5kk87ejCAcOwh33Pl5iwhHNk6aG4nJFRs3gtXSRmmKqktZZI\nPFDcfYTo7TNNkbVjP+cvu/wnGouOUKff+O0c1PNU+CogNkoxZ2MsDvyZe14bdRB0\nC7uAkvrA0dRPAEN38qZApKwVBNOtsZHM9C1xWwmhAoGAJwGaMXzwB8oW0WFvD24i\nk0cFk5ecxkO9PWMOML3r8Sed/Y1Adxw6dGNzTSfvor7tYtYwxB3T7cwyx4hzBXlp\nNLXsoGzxmrB7zOijcDLwM+hofsYJHLGYf1PqKxiQ6rp8/h5SQAvc0m1o3Smn9XU4\ngDcLnxm3A1j2JGuN+K14j2E=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@notification-73987.iam.gserviceaccount.com",
    client_id: "114578948004001371650",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40notification-73987.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notification-73987-default-rtdb.firebaseio.com"
});

const db = admin.database();
console.log('✅ Firebase Connected!');

// ============= CONFIGURATION =============
const WHATSAPP_API_KEY = "wapi_c53a93a64d0244269e275c09c65b57b892389de3f0de4d04872bfc1c62f8f1d9";
const DEVICE_ID = "e67fe72a-2b4a-4a84-8bfd-601b81583052";
const BASE_URL = "https://whatsapp-api-salution-production.up.railway.app";
const SERVER_URL = "https://my-own-wp-bot.onrender.com";
const COHERE_API_KEY = "cohere_bijNme7OCF3XTOgqY5ZEhDAINxe3RJLmnENuKwsu1wfDqT";

// ============= STORAGE =============
let processedMessages = new Set();

// ============= FIREBASE MEMORY FUNCTIONS =============

async function getUserFromFirebase(phoneNumber) {
    try {
        const snapshot = await db.ref(`users/${phoneNumber}`).get();
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return null;
    } catch (error) {
        console.log('Firebase read error:', error.message);
        return null;
    }
}

async function saveUserToFirebase(phoneNumber, data) {
    try {
        await db.ref(`users/${phoneNumber}`).set(data);
        return true;
    } catch (error) {
        console.log('Firebase write error:', error.message);
        return false;
    }
}

async function updateUserConversation(phoneNumber, userMessage, botReply) {
    const userData = await getUserFromFirebase(phoneNumber);
    const now = Date.now();
    
    if (!userData) {
        const newUser = {
            firstSeen: now,
            lastSeen: now,
            messageCount: 1,
            conversationHistory: [
                { role: "user", message: userMessage, timestamp: now },
                { role: "bot", message: botReply, timestamp: now }
            ]
        };
        await saveUserToFirebase(phoneNumber, newUser);
        return newUser;
    } else {
        const history = userData.conversationHistory || [];
        history.push({ role: "user", message: userMessage, timestamp: now });
        history.push({ role: "bot", message: botReply, timestamp: now });
        
        if (history.length > 30) {
            history.splice(0, history.length - 30);
        }
        
        userData.lastSeen = now;
        userData.messageCount = (userData.messageCount || 0) + 1;
        userData.conversationHistory = history;
        
        await saveUserToFirebase(phoneNumber, userData);
        return userData;
    }
}

// ============= AI SYSTEM PROMPT =============
const AI_SYSTEM_PROMPT = `You are Payal, a professional and friendly sales representative for a web development agency.

ABOUT YOU:
- You are a REAL human sales agent, NOT a robot
- You speak natural Hinglish (Hindi + English mix like a normal Indian person)
- You are helpful, warm, and professional
- You never act romantic or like a girlfriend
- You call customers "Sir" or "Ma'am"

YOUR SERVICES (Prices are fixed):
1. WhatsApp Bot - ₹499 only
   Features: Auto-reply on keywords, AI chatbot, order/lead collection, 24/7 automatic, free setup + 1 month support

2. Custom Website - Starting ₹1,499
   Types: Business website, E-commerce store, Portfolio/Landing page, Food ordering website
   Features: Mobile friendly, contact form, WhatsApp button, SEO ready, free hosting 1 year

3. Payment Verification System - ₹999
   Features: UTR number verification, auto payment confirm, works with any payment gateway

4. Bundle Offer - Bot + Basic Website = ₹1,499 (save ₹500)

ABOUT OWNER:
- Owner name is "Happy"
- Owner age is "17+ years"
- If customer asks to talk to Happy: Say "Happy bhai abhi project mein busy hain, lekin main unhe aapka message de doongi. Aap apna phone number share karo, woh wapas call kar denge"

CONVERSATION RULES:
- NEVER show numbered menus like "1️⃣ 2️⃣ 3️⃣" or "Type HELP for options"
- NEVER repeat words like "Chahiye" in every message
- Keep conversation natural like a real WhatsApp chat
- Reply in full, complete sentences
- Be patient and helpful
- If customer says "Nahi" or "Baad mein", say "Theek hai sir, kabhi zaroorat ho toh batana"
- If customer shares phone number, say "Done sir! Main Happy bhai ko aapka number forward kar doongi. Woh aapko call karenge"

EXAMPLE NATURAL REPLIES:
- Customer: "Hi" → "Namaste sir! Kaise ho? Main Payal, web agency se hun. Aapko kya chahiye - WhatsApp bot, website, ya kuch aur?"
- Customer: "Price kya hai?" → "Sir, WhatsApp bot ₹499 ka hai, website ₹1499 se start hai, payment system ₹999 ka hai. Aapko specifically kya chahiye?"
- Customer: "Bot chahiye" → "Accha, bot chahiye. Main bana doongi ₹499 mein. Setup free hai, 24/7 kaam karega. Aapka WhatsApp number do jispe bot chahiye"
- Customer: "Website chahiye" → "Website ki baat karte ho toh ₹1499 se start hai. Business website, e-commerce, ya food order website? Batao kya chahiye"
- Customer: "Happy se baat karni hai" → "Happy bhai abhi busy hain project mein. Aap apna number do, main unhe message kar doongi. Woh aapko call back karenge"

Always reply in a friendly, natural way. Keep it real like WhatsApp chat between two people.`;

// ============= GET AI REPLY (FULL, NO SHORTENING) =============
async function getAIReply(userMessage, phoneNumber, userData) {
    try {
        let history = userData?.conversationHistory || [];
        
        let formattedHistory = [];
        for (let i = 0; i < history.length; i++) {
            if (history[i].role === "user") {
                formattedHistory.push({ role: "USER", message: history[i].message });
            } else if (history[i].role === "bot") {
                formattedHistory.push({ role: "CHATBOT", message: history[i].message });
            }
        }
        
        if (formattedHistory.length > 20) {
            formattedHistory = formattedHistory.slice(-20);
        }
        
        const response = await axios.post(`https://api.cohere.ai/v1/chat?key=${COHERE_API_KEY}`, {
            model: "command-a-03-2025",
            message: userMessage,
            preamble: AI_SYSTEM_PROMPT,
            chat_history: formattedHistory,
            temperature: 0.85,
            max_tokens: 500
        }, {
            headers: { 'Authorization': `Bearer ${COHERE_API_KEY}`, 'Content-Type': 'application/json' },
            timeout: 20000
        });
        
        let aiReply = response.data.text;
        
        // Only remove extreme cases, keep full message
        aiReply = aiReply.replace(/Type HELP for options/gi, '');
        
        return aiReply;
        
    } catch (error) {
        console.log('AI Error:', error.message);
        
        // Fallback - natural replies
        const msg = userMessage.toLowerCase();
        if (msg.includes('price') || msg.includes('kitna')) {
            return "Sir, WhatsApp bot ₹499 ka hai, website ₹1499 se start hai, payment system ₹999 ka hai. Aapko kya chahiye?"
        }
        if (msg.includes('bot')) {
            return "Bot ₹499 mein banake de doongi. Auto-reply, AI chat, order sab hoga. Setup free hai. Aapka WhatsApp number do jispe bot chahiye?"
        }
        if (msg.includes('website')) {
            return "Website ₹1499 se start hai. Business, e-commerce, food ordering - jo bhi chahiye bana denge. Aapko kis type ki website chahiye?"
        }
        if (msg.includes('happy') || msg.includes('owner')) {
            return "Happy bhai mere owner hain. Woh abhi project mein busy hain. Aap apna number do, main unhe message kar doongi. Woh aapko call back karenge."
        }
        if (msg.includes('game')) {
            return "Game development normally ₹5000+ mein hota hai. Hum mostly website aur WhatsApp bot banate hain. Aapko kya chahiye?"
        }
        if (msg.includes('food') || msg.includes('order')) {
            return "Food ordering website ₹1999-2499 mein ban jayegi. Menu, cart, payment gateway, order tracking sab hoga. Batao kya chahiye?"
        }
        if (msg.includes('hello') || msg.includes('hi')) {
            return "Namaste sir! Main Payal, web agency se hun. Aapko WhatsApp bot ₹499 mein, website ₹1499+ mein, ya payment system ₹999 mein chahiye? Jo batao, main help kar doongi."
        }
        return "Main Payal, web agency sales representative hun. Aapko WhatsApp bot ₹499 mein, website ₹1499+ mein, ya payment system ₹999 mein chahiye? Apni requirement batao, main bana doongi."
    }
}

// ============= SEND MESSAGE =============
async function sendMessage(number, text) {
    try {
        let chatId = number.includes('@') ? number : `${number}@c.us`;
        const response = await axios.post(`${BASE_URL}/api/send`, {
            deviceId: DEVICE_ID,
            number: chatId,
            message: text
        }, { 
            headers: { 'x-api-key': WHATSAPP_API_KEY },
            timeout: 15000
        });
        return response.data?.success || false;
    } catch (error) {
        console.log('Send error:', error.message);
        return false;
    }
}

// ============= WEBHOOK HANDLER =============
app.post('/webhook', async (req, res) => {
    const message = req.body.body?.trim() || '';
    let senderId = req.body.from || '';
    let phoneNumber = senderId.replace('@c.us', '').replace('@lid', '').split('@')[0];
    
    console.log(`\n📩 [${new Date().toLocaleTimeString()}] ${phoneNumber}: ${message}`);
    
    const msgId = req.body.messageId || `${senderId}_${Date.now()}`;
    if (processedMessages.has(msgId)) {
        console.log(`⏭️ Duplicate ignored`);
        return res.json({ status: 'ok' });
    }
    processedMessages.add(msgId);
    
    if (processedMessages.size > 500) {
        const toDelete = [...processedMessages].slice(0, 250);
        toDelete.forEach(id => processedMessages.delete(id));
    }
    
    if (!message) return res.json({ status: 'ok' });
    
    const userData = await getUserFromFirebase(phoneNumber);
    const reply = await getAIReply(message, phoneNumber, userData);
    await updateUserConversation(phoneNumber, message, reply);
    const success = await sendMessage(phoneNumber, reply);
    
    console.log(`🤖 Reply sent (${reply.length} chars)`);
    
    res.json({ status: 'ok', replied: success });
});

// ============= WEBHOOK REGISTRATION =============
async function registerWebhook() {
    const webhookUrl = `${SERVER_URL}/webhook`;
    console.log(`\n🔗 Registering webhook: ${webhookUrl}`);
    
    try {
        const statusRes = await axios.get(`${BASE_URL}/api/webhook/status`, {
            headers: { 'x-api-key': WHATSAPP_API_KEY }
        });
        
        if (statusRes.data?.registered && statusRes.data?.url === webhookUrl) {
            console.log('✅ Webhook already registered');
            return;
        }
        
        await axios.post(`${BASE_URL}/api/webhook/register`, {
            webhookUrl: webhookUrl,
            events: ['message']
        }, {
            headers: { 'x-api-key': WHATSAPP_API_KEY }
        });
        
        console.log('✅ Webhook registered!');
    } catch (error) {
        console.log('⚠️ Webhook registration failed');
    }
}

// ============= ADMIN ENDPOINTS =============
app.get('/api/users', async (req, res) => {
    try {
        const snapshot = await db.ref('users').get();
        if (snapshot.exists()) {
            const users = snapshot.val();
            const userList = Object.keys(users).map(phone => ({
                phone: phone,
                firstSeen: users[phone].firstSeen,
                lastSeen: users[phone].lastSeen,
                messageCount: users[phone].messageCount
            }));
            res.json({ users: userList, total: userList.length });
        } else {
            res.json({ users: [], total: 0 });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/user/:phone', async (req, res) => {
    try {
        const { phone } = req.params;
        const userData = await getUserFromFirebase(phone);
        if (userData) {
            res.json({ 
                phone: phone, 
                firstSeen: userData.firstSeen,
                lastSeen: userData.lastSeen,
                messageCount: userData.messageCount,
                conversationHistory: userData.conversationHistory 
            });
        } else {
            res.json({ phone: phone, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============= HEALTH =============
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        bot: 'Payal - AI Sales Agent',
        version: '8.0',
        features: 'Full AI replies, No shortcuts, Firebase memory'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: Date.now() });
});

// ============= START =============
const PORT = process.env.PORT || 8080;

setTimeout(() => registerWebhook(), 5000);

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║   💁‍♀️ PAYAL v8.0 - FULL AI REPLIES                      ║');
console.log('╠══════════════════════════════════════════════════════════╣');
console.log('║  ✅ AI replies for EVERY message (full, no shorten)     ║');
console.log('║  ✅ Firebase permanent memory                           ║');
console.log('║  ✅ Remembers conversation                              ║');
console.log('║  ✅ Natural human-like replies                          ║');
console.log(`║  📱 Device: ${DEVICE_ID.substring(0, 20)}...`);
console.log('╚══════════════════════════════════════════════════════════╝\n');

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🟢 Payal is LIVE! Send a message on WhatsApp\n`);
});
