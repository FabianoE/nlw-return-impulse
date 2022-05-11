import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/Figmoji/bug.png';
import ideaImageUrl from '../../assets/Figmoji/idea.png';
import thoughtImageUrl from '../../assets/Figmoji/thought.png';
import { FeedBackTypeStap } from "./Steps/FeedBackTypeStap";
import { FeedBackContentStap } from "./Steps/FeedBackContentStep";
import { FeedBackSuccessStap } from "./Steps/FeedBackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }

    },
    IDEIA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Image de uma lampada'
        }
    },
    OUTRO: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de um balão de pensamento'
        }
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedBackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);
    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedBackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {feedbackSent ? (
                <FeedBackSuccessStap onFeedbackRestartRequested={ handleRestartFeedback }/>
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedBackTypeStap onFeedBackTypeChanged={setFeedBackType} />
                    ) : (
                        <FeedBackContentStap
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a href="" className="underline underline-offset-2">Rocketseat</a>
            </footer>
        </div>
    );
}