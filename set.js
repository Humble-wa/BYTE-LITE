 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOElZdElnQTlTZFF0emRvc251YjhVanZocGlNNjJESHJuNzVyYnZuWnJsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlV1R2ZnQ2JVS0U4RWY5QkN2TmhqaFFUT0c3cFJsdXVhWFoxOU9jU2RIcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRnNTd2NLaWdxbk1WTVNDajVxMVFmdEtTTnFBbllCRnlMb0VQT3E5OUhFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNNEJHN1VaR3UxQVdyUVVuRVhSL1BGdVE0YVNYdHo3K0dwSUN3N1UrbHl3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNKTzcxUkFzc21HY1RNbVFqbVdRMVA1Y1YwcU13UFRMV3Nqem5tQUlXMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitMSTlHc2xlczVHNlVhRHc1YW5jcjVIR3lEMlpzelRCK3BDV1RIUExrUWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU00OEQ4MndOTGQxK3NRdVVNYzYrUnNzTVpiZ1NNaDNHZXJIZTRWKzdIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkdVUUJYM3VlUys3cWhQQ2VSd21MZUdjbEVpSGo0M3NUVDlwUDlsT3pIbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJEdUI2UStMRFNPTmF0K2VHbTlIMDYzcG1VYzBGc3NvQU52dzFSc3VxeGJ2TEhoWXZvcUd4WGdtWGo4bG1NZ0psSVFQU2x1Z3VDemw4OW5vSGFoZERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzcsImFkdlNlY3JldEtleSI6Ill1Skp1c2FQRnViQWd4Wk16MDFRZi9henB3UVBFOVZMUkxwVzM4My9YVG89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODAyNDAxMjUzMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTQyQURBRTBEODY2MUNBMEQzMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI2NjEyNjk2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MDI0MDEyNTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBNzcwNjk5NDQyODJBMDZFMDE0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjY2MTI3MDB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwMjQwMTI1MzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E1RkQ2OTM5NzMwQ0Q1NjRBRDQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjYxMjcwNn1dLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiWGN3VkRYWmhSYmVjeW0tNkhZQWlEdyIsInBob25lSWQiOiJlOGQyZGI1Yi1jZGU2LTQ5NDMtYTkwOS1kY2IyMTg0N2E2ZTYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFlVMDljMEYxcElMbFk1Y1BRdGlLbnhMYkpRPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR2Z3Y4UnZnaXU5dTFjOTZFcEwxUThLSVpZMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJOM00xWEtRWSIsIm1lIjp7ImlkIjoiMjM0ODAyNDAxMjUzMTo1NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJIdW1ibGUg8J+qkPCfk7jwn6SO8J+ltyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTldYdC8wRUVNU0pxTGNHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMS9WOGdZTTc1MnpTc3lsNmNQNHhBdmY1L1ZWbGtLZ0s1MTlBSUZGOW1sTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoicGw4dFM0NzRPSlhIclZDUHR2WE9rbFhZMkxOdXVpUkhyMGRtLzMvZU9WQUIveWlzTUp6ZEdXNkUyM0FoajlWMi9kLzBsVTE3TEFnREVDakdYc1hmanc9PSIsImRldmljZVNpZ25hdHVyZSI6IjhsT3Vrb2NGcm13VDZiSFVnOGswYmM4aUw4aEtBckZJRlgyczM2c1hwTk9oKy93SGJySjV5RVBWNXI2aFJWd1hMUDJSczBTUlJNVFBQQ0N0ZlAzQkR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODAyNDAxMjUzMTo1NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkZjFmSUdETytkczByTXBlbkQrTVFMMytmMVZaWkNvQ3VkZlFDQlJmWnBUIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY2MTI2ODksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRnNqIn0=',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'no',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348024012531",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
