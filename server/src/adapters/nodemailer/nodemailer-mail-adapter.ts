import nodemailer from "nodemailer";
import { MailAdaptar, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "28a26ab18f3db9",
    pass: "1b89909c1a7098",
  },
});

export class NodemailerMailAdapter implements MailAdaptar {
  async sendEmail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Fabiano <fabianoevaristo007@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
