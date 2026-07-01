const Colors = require('../color.js');

/**
 * Helper to get Theme colors
 */
export default {
    /**
     * 
     * @param {string} name 
     * @returns RGB color numbers
     */
    getColorNumbers(name) {
        const regex = /\((.*)\)/; 
        
        return Colors[name].match(regex)[1];
    },

    /**
     * 
     * @param {string} name 
     * @param {boolean} appTheme 
     * @returns String with rgb numbers to add to packages that dont use nativewind classNames
     */
    getRGB(name,appTheme) {     
        return `rgb(${this.getColorNumbers(this.getThemeString(name,appTheme))})`;
    },

    getHexColor(name,appTheme){
        return Colors[this.getThemeString(name,appTheme)];
    },


    /**
     * 
     * @param {string} name 
     * @param {boolean} appTheme 
     * @returns correct class names based on current set theme
     */
    getThemeString(name,appTheme){
        
        const theme = appTheme ? "light" : "dark";
        
        return name.replace("dark",theme);
    }

}

