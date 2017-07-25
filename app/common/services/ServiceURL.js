/**
 * Created by DILIP KOSURI on 24/7/17.
 */

function ServiceURL(BASE_URL) {
    switch (BASE_URL.name) {
        case 'apimock':
            return {
                getBarResponse: "http://pb-api.herokuapp.com/bars"
            };
        default:
            return {}
    }
}
