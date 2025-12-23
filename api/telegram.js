// Этот код будет работать на сервере Vercel
// Он берет данные с сайта и безопасно отправляет в Телеграм

export default async function handler(req, res) {
    // Разрешаем сайту отправлять нам данные (CORS)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    // Если это просто проверка связи браузером
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    // Проверяем, что данные пришли методом POST и у нас есть секреты
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Берем секретные ключи из "сейфа" Vercel
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return res.status(500).json({ error: 'Telegram secrets not set on server' });
    }

    // Получаем данные, которые прислал сайт
    const { name, contact, tariff, comment } = req.body;

    // Формируем красивое сообщение для Телеграма
    const message = `
🌟 **Новая заявка на курс!**

👤 **Имя:** ${name}
📞 **Связь:** ${contact}
💎 **Тариф:** ${tariff}
📝 **Комментарий:** ${comment || "Нет комментария"}
`;

    try {
        // Стучимся в Телеграм
        const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown', // Чтобы работали жирный шрифт и звездочки
            }),
        });

        const data = await telegramResponse.json();

        if (!data.ok) {
             // Если Телеграм ругается
            console.error('Telegram Error:', data);
            return res.status(500).json({ error: 'Failed to send to Telegram', details: data.description });
        }

        // Успех!
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
