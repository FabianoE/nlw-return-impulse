import { MailAdaptar } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  commet: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository, private mailAdapter: MailAdaptar,) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, commet, screenshot } = request;

    if(!type){
      throw new Error('Type is required');
    }
    
    if(!commet){
      throw new Error('Commet is required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      commet,
      screenshot,
    });

    await this.mailAdapter.sendEmail({
        subject: 'Novo feedback',
        body: [
            `<div>`,
            `<p>Tipo do  feedback: ${type}</p>`,
            `<p>Comentário: ${commet}</p>`,
            screenshot ? `<img src="${screenshot}"/>` : null,
            `</div>`
        ].join('\n')
    })
  }
}
