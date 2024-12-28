import styles from './pinInput.module.css'
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";


interface props {
    setToken: Dispatch<SetStateAction<string>>
}

export default function PinInput(props: props) {
    const [formData, setFormData] = useState([
        { id: 0, value: ''},
        { id: 1, value: ''},
        { id: 2, value: ''},
        { id: 3, value: ''},
        { id: 4, value: ''},
        { id: 5, value: ''},
    ]);


    const inputRefs= Array.from({ length: 6 }, () => useRef<HTMLInputElement | null>(null));

    // フォームデータを更新する関数
    const updateFormData = (id: number, newValue: string) => {
        const sanitizedValue = newValue.replace(/[^\d]/g, "");
        setFormData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, value: sanitizedValue } : item
            )
        );
        if(sanitizedValue.length > 0 && id < 5){
            inputRefs[id + 1].current?.focus()
        }
    };

    const handleOnBackspaceDown = (event: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if(event.key === 'Backspace' && id > 0 && id <= 5 && formData[id].value.length === 0) {
            inputRefs[id - 1].current?.focus()
        }
    }

    useEffect(() => {
        props.setToken(formData.map(item => item.value).join(''))
    }, [formData])


    return (
        <div className={styles.div_0}>
            {formData.map((item) => <input type='text' value={item.value} className={styles.input_0} onChange={(e) => updateFormData(item.id, e.target.value)} maxLength={1} ref={inputRefs[item.id]} onKeyDown={(e) => {handleOnBackspaceDown(e, item.id)}}/>)}
        </div>
    )
}
