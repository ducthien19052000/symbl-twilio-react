export const translate = (text:string,targerLang:string='ja',sourceLang:string='en') => {
    const endPoint = `${process.env.REACT_APP_DEEPL_API}/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_AUTH_KEY}&text=${text}&target_lang=${targerLang}&source_lang=${sourceLang}`;
    const config = {
        method: 'GET'
    }
    return fetch(endPoint, config)
        .then((response) => {
            return Promise.resolve(response.json());
        })
        .catch((error) => Promise.reject(error.message));
}