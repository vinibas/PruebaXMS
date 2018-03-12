export class FormUtil {
    static converterBrancosEmNulos(obj: Object) {
        const array = Object.getOwnPropertyNames(obj);

        for (let i = 0; i < array.length; i++) {
            if (obj[array[i]] === '') {
                obj[array[i]] = null;
            }
        }
    }
}
