export class FormHelper {
    /**Validation */
    public static validateElement(
        element: any
    ): string[] {
        let invalid: string[] = [];
        const ignoreFields = ["id", "status", "active","updated"];
        Object.keys(element)
        .filter( field => !ignoreFields.includes(field))
        .forEach( key => {
            if(!element[key]) {
                invalid.push(key.charAt(0).toUpperCase() + key.slice(1));
            }
        });
        return invalid;
    };

    public static formatDate(date: any) {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}