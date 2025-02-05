import styles from './editorToolGuide.module.css'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

export default function EditorToolGuide() {
    const initialSentence = '編集ツールで 記事を装飾'
    const [sentence, setSentence] = useState<string>('')
    const [className, setClassName] = useState<string>(`${styles['p_0']}`)
    const WhereIam = useSelector<RootState, RootState['WhereIam']>((state) => state.WhereIam)
    // `${styles['button']} ${styles['active']}` : `${styles['button']}`


    const loop = (maxCount: number, i: number, onComplete: () => void) => {
        if (i < maxCount) {
            setSentence(prevSentence => prevSentence + initialSentence[i])
            setTimeout(function () {
                loop(maxCount, ++i, onComplete)
            }, 150)
        } else {
            onComplete()
        }
    }


    useEffect(() => {
        if(WhereIam.whereIam === 'createArticle'){
            setSentence('')
            loop(initialSentence.length, 0, () => {
                setClassName(`${styles['p_0']} ${styles['active']}`)
            })
        }
    }, [WhereIam.whereIam]);

    return (
        <p className={className}>
            {sentence + '_'}
        </p>
    )
}
