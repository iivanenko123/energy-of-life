export const runtime = "edge";

function withCorsHeaders(headers?: HeadersInit) {
  return {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    ...headers
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: withCorsHeaders() });
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json(
      { error: "Telegram secrets not set on server" },
      { status: 500, headers: withCorsHeaders() }
    );
  }

  const body = (await request.json()) as {
    name?: string;
    contact?: string;
    tariff?: string;
    comment?: string;
  };

  const name = body.name ?? "";
  const contact = body.contact ?? "";
  const tariff = body.tariff ?? "";
  const comment = body.comment ?? "";

  const message = `🌟 **Новая заявка на курс!**\n\n👤 **Имя:** ${name}\n📞 **Связь:** ${contact}\n💎 **Тариф:** ${tariff}\n📝 **Комментарий:** ${comment || "Нет комментария"}\n`;

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown"
      })
    });

    const data = (await telegramResponse.json()) as { ok: boolean; description?: string };

    if (!data.ok) {
      return Response.json(
        { error: "Failed to send to Telegram", details: data.description },
        { status: 500, headers: withCorsHeaders() }
      );
    }

    return Response.json({ success: true }, { status: 200, headers: withCorsHeaders() });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500, headers: withCorsHeaders() });
  }
}

