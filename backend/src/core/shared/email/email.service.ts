import * as nodemailer from "nodemailer";
import { envConfig } from "../../../utils/validateEnv";
export default class EmailService {
  private nodemailer: nodemailer.Transporter;
  constructor() {
    this.nodemailer = nodemailer.createTransport({
      host: envConfig.EMAIL_HOST,
      port: envConfig.EMAIL_PORT,
      auth: {
        user: envConfig.EMAIL_USER,
        pass: envConfig.EMAIL_PASSWORD,
      },
    });
  }
  async sendEmail(
    email: string,
    subject: string,
    { text, html }: { text?: string; html?: string }
  ) {
    await this.nodemailer.sendMail({
      from: envConfig.EMAIL_USER,
      to: email,
      subject: subject,
      html,
      text,
    });
  }

  getVerificationCodeMessage(name: string, verificationCode: string) {
    return `Olá ${name}, <br>Para validar seu email use seu código de validação <strong>${verificationCode}</strong>`;
  }
}
