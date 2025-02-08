const axios = require('axios');
const config = require('../config');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
  pattern: 'technews',
  alias: ['tech', 'news'],
  react: '📰',
  desc: 'Fetch the latest tech news from TechNewsWorld',
  category: 'news',
  filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Fetch news data from the API
    const url = 'https://bk9.fun/details/technewsworld_get?url=https://www.technewsworld.com/story/apple-vision-pro-and-why-the-goovis-g3-max-may-be-better-178495.html';
    const data = await fetchJson(url);

    // Extract relevant information from the response
    const { title, content, image, source } = data;

    // Format the message
    let message = `📰 *${title}*\n\n`;
    message += `_${source}_\n\n`;
    message += `${content}\n\n`;
    message += `> Powered by Subzero Bot`;

    // Send the news with an image
    await conn.sendMessage(from, {
      image: { url: image }, // News image
      caption: message,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363304325601080@newsletter',
          newsletterName: '『 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 』',
          serverMessageId: 143,
        },
      },
    }, { quoted: mek });
  } catch (error) {
    console.error('Error fetching tech news:', error);
    reply('Something went wrong. Unable to fetch tech news.');
  }
});
