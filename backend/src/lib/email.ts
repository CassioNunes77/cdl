import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'cdlpauloafonso@hotmail.com';

// Configuração do transporter (pode ser ajustada conforme necessário)
// Por padrão, usa SMTP genérico. Para produção, configure com credenciais reais
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true para 465, false para outras portas
  auth: process.env.SMTP_USER && process.env.SMTP_PASS
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}): Promise<void> {
  const { name, email, phone, subject, message } = data;

  const mailOptions = {
    from: process.env.SMTP_FROM || email,
    to: RECIPIENT_EMAIL,
    replyTo: email,
    subject: subject || `Nova mensagem de contato - ${name}`,
    html: `
      <h2>Nova mensagem de contato do site</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
      ${subject ? `<p><strong>Assunto:</strong> ${subject}</p>` : ''}
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    text: `
Nova mensagem de contato do site

Nome: ${name}
Email: ${email}
${phone ? `Telefone: ${phone}` : ''}
${subject ? `Assunto: ${subject}` : ''}

Mensagem:
${message}
    `,
  };

  // Se não houver configuração SMTP, apenas loga (para desenvolvimento)
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email não enviado (SMTP não configurado):', mailOptions);
    return;
  }

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    // Não lança erro para não quebrar o fluxo se o email falhar
    // A mensagem ainda será salva no banco de dados
  }
}
