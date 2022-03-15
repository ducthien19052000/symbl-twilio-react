import { useCallback, useEffect, useState } from 'react';
import { translate } from '../../service/apiDeepL';

export default function useTranslate(value:string, targetLang:string,sourceLang:string) {
    const [text, setText] = useState();

    const transText = useCallback(() => {
        if(value){
            translate(value).then((res)=>setText(res?.translations[0]?.text))
        }
    },[value])
    useEffect(() => {
        transText()
    }, [transText]);

    return text;
}
