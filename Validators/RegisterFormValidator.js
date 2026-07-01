export const RegisterValidator = {
    checkIfEmpty: (name,value) => {
        return `${name} is empty`;
    },

    compareValues: (original,compare) => {

        if(original[0] !== compare[0]){
            return `${Object.keys(original)[0]} does not match ${Object.keys(original)[0]}.`;
        }
        return "";

        // if(original !== compare){
        //     return `${name} does not match`;
        // }
    }
}