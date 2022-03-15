const config = {
    symbl: {
        // If set to true, a dialog for entering Symbl App ID and App Secret will pop up.
        // Set this to false if you'd like to use token generation for Symbl in the backend server. appId and appSecret settings will be disabled.
        enableInAppCredentials: true,
        // appId and appSecret will be populated automatically from localstorage after user enters them in Settings Dialog.
        // WARNING: You can hard code them here but it's not recommended because it'll expose your credentials in the source in browser.
        //          If you wish to use common appId and appSecret pair then consider setting up a Token Server. Refer to server.js in root of this project.
        appId: process.env.SYMBL_APP_ID,
        appSecret: process.env.SYMBL_APP_SECRET
    },
    appBasePath: "/" // Set this to something else if you want to deploy multiple versions on same server. Always end with /
};
export default config;