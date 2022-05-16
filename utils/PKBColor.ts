export const setPKBColor = (rarity:string) => {
    switch (rarity) {
        case "Commune":
            return "#D35337"
            break;
        case "Peu Commune":
            return "#3B82C4"
            break;
        case "Rare":
            return "#FDD23C"
            break;
        case "Légendaire":
            return "#7E308E"
            break;
    }
}