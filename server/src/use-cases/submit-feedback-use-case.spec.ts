import { create } from "domain";
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendEmail: sendMailSpy },
);

describe('Submit feedback',  () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commet: 'example commet',
            screenshot: 'data:image/png;base64,12314192',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            commet: 'example commet',
            screenshot: 'data:image/png;base64,12314192',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback commet type', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commet: '',
            screenshot: 'data:image/png;base64,12314192',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commet: 'example commet',
            screenshot: '1',
        })).rejects.toThrow();
    });
});