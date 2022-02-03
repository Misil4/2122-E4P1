import { en } from "./en";
import { es } from "./es";
import { eus } from "./eus";

export const selectLanguage = (language) => {
    if (language === "euskera") return eus;
    else if (language === "castellano") return es;
    else if (language === "ingles") return en 
}