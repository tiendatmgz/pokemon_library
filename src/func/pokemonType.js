import bug from '../img/bug.png'
import dark from '../img/dark.png'
import dragon from '../img/dragon.png'
import electric from '../img/electric.png'
import fairy from '../img/fairy.png'
import fighting from '../img/fighting.png'
import fire from '../img/fire.png'
import flying from '../img/flying.png'
import ghost from '../img/ghost.png'
import ground from '../img/ground.png'
import ice from '../img/ice.png'
import normal from '../img/normal.png'
import poison from '../img/poison.png'
import psychic from '../img/psychic.png'
import rock from '../img/rock.png'
import steel from '../img/steel.png'
import water from '../img/water.png'
import grass from '../img/grass.png'
export const pokemonType = (type) => {
    // 
    if (type === "normal") {
        // return ("#64748b");
        return normal;
    }
    if (type === "fire") {
        // return ("#dc2626");
        return fire;
    }
    if (type === "water") {
        // return ("#3b82f6");
        return water;
    }
    if (type === "electric") {
        // return ("#fcd34d");
        return electric;
    }
    if (type === "grass") {
        // return ("#84cc16");
        return grass;
    }
    if (type === "ice") {
        // return ("#06b6d4");
        return ice;
    }
    if (type === "fighting") {
        // return ("#f59e0b");
        return fighting;
    }
    if (type === "poison") {
        // return ("#a21caf");
        return poison;
    }
    if (type === "ground") {
        // return ("#AA875C");
        return ground;
    }
    if (type === "flying") {
        // return ("#14b8a6");
        return flying;
    }
    if (type === "psychic") {
        // return ("#7e22ce");
        return psychic;
    }
    if (type === "bug") {
        // return ("#1c4746");
        return bug;
    }
    if (type === "rock") {
        // return ("#44403c");
        return rock;
    }
    if (type === "ghost") {
        // return ("#71717a");
        return ghost;
    }
    if (type === "dragon") {
        // return ("#B72003");
        return dragon;
    }
    if (type === "dark") {
        // return ("#2A292B");
        return dark;
    }
    if (type === "steel") {
        // return ("#B5C0C9");
        return steel;
    }
    if (type === "fairy") {
        // return ("#F2C1D1");
        return fairy;
    }

}