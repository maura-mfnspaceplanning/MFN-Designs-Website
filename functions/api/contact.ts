interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM: string;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>\"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '\"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request data." }, { status: 400 });
  }

  const name = isString(payload.name) ? payload.name.trim() : "";
  const email = isString(payload.email) ? payload.email.trim() : "";
  const subject = isString(payload.subject) ? payload.subject.trim() : "";
  const message = isString(payload.message) ? payload.message.trim() : "";

  if (!name || !email || !subject || message.length < 5 || !email.includes("@")) {
    return Response.json(
      { error: "Invalid request data. Please check all fields." },
      { status: 400 },
    );
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    return Response.json({ error: "Contact service is not configured." }, { status: 503 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: ["maura@mfnspaceplanning.com"],
      reply_to: email,
      subject: `MFN Designs - New inquiry: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<h2>New MFN Designs inquiry</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Subject:</strong> ${safeSubject}</p><p>${safeMessage.replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!resendResponse.ok) {
    return Response.json({ error: "Unable to send your message right now." }, { status: 502 });
  }

  return Response.json({
    success: true,
    message: "Thank you for reaching out! We'll be in touch soon.",
  });
};
