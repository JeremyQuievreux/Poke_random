export const setBGColor = (type:string) => {
    switch (type) {
        case "Plante":
            return "#9BCC50"
            break;
        case "Feu":
            return "#F5A957"
            break;
        case "Eau":
            return "#4592C4"
            break;
        case "Insecte":
            return "#729F3F"
            break;
        case "Normal":
            return "#A4ACAF"
            break;
        case "Fée":
            return "#FDB9E9"
            break;
        case "Vol":
            return "#3DC7EF"
            break;
        case "Poison":
            return "#BA80CA"
            break;
        case "Ténébre":
            return "#7B62A3"
            break;
        case "Electrik":
            return "#EED535"
            break;
        case "Combat":
            return "#D56723"
            break;
        case "Roche":
            return "#A38C21"
            break;
        case "Acier":
            return "#9EB7B8"
            break;
        case "Glace":
            return "#51C4E7"
            break;
        case "Sol":
            return "#E0C068"
            break;
        case "Psy":
            return "#F366B9"
            break;
        case "Dragon":
            return "#53A4CF"
            break;
    }
}