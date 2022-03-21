import { useCallback, useEffect, useState, useRef } from 'react';
import { DEBOUNCE_TRANSLATE } from 'src/constants';
import { translate } from '../../service/apiDeepL';

export default function useTranslate(value:string, targetLang:string,sourceLang:string) {
    const [text, setText] = useState();
    const translateRef= useRef(null) ;
     

    const transText = useCallback(() => {
        if(value){
            if(translateRef.current){
                clearTimeout(translateRef.current)
            }
            translateRef.current = setTimeout(()=>{
                console.log('debouce');
                
                translate(value).then((res)=>setText(res?.translations[0]?.text))
            },DEBOUNCE_TRANSLATE)
        }
    },[value])
    useEffect(() => {
        transText()
    }, [transText]);

    return text;
}
