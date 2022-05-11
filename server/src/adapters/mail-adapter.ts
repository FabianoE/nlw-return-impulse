export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailAdaptar {
  sendEmail: (data: SendMailData) => Promise<void>;
}
