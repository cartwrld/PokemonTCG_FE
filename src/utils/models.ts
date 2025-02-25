export interface PokemonCard {
    cardID: number;
    id: string;
    cardNumber: number;
    nationalPDN: PokedexNumber[];
    name: string;
    types: TypeOnCard[];
    hp: number;
    abocID: AbilityOnCard[];
    atocID: AttackOnCard[];
    rocID: ResistanceOnCard[];
    wocID: WeaknessOnCard[];
    evolvesFrom?: string;
    convRTCost: number;
    retreatCost: string[];
    rarity: string;
    stage: string;
    set: Set;
    images: ImagesOnCard[];
}

export interface CardImages {
    ciID: number;
    cardID: string;
    small: string;
    large: string;
    ioc: ImagesOnCard[];
}

export interface Set {
    setID: number;
    id: string;
    setName: string;
    series: string;
    cards: PokemonCard[];
}

export interface Type {
    typeID: number;
    typeName: string;
    toc: TypeOnCard[];
}

export interface Subtype {
    subtypeID: number;
    subtypeName: string;
    soc: SubtypeOnCard[];
}

export interface Ability {
    abilityID: number;
    abilityName: string;
    effect?: string;
    aboc: AbilityOnCard[];
}

export interface Attack {
    attackID: number;
    attackName: string;
    cost: string[];
    convNRGCost: number;
    damage: number;
    text: string;
    atoc: AttackOnCard[];
}

export interface TypeOnCard {
    tocID: number;
    cardID: string;
    typeID: number;
    card: PokemonCard;
    type: Type;
}

export interface SubtypeOnCard {
    stocID: number;
    cardID: number;
    subtypeID: number;
    card: PokemonCard;
    subtype: Subtype;
}

export interface AbilityOnCard {
    abocID: number;
    cardID: number;
    abilityID: number;
    ability: Ability;
    card: PokemonCard;
}

export interface AttackOnCard {
    atocID: number;
    cardID: string;
    attackID: number;
    attack: Attack;
    card: PokemonCard;
}

export interface WeaknessOnCard {
    wocID: number;
    cardID: string;
    type: string;
    value: number;
    card: PokemonCard;
}

export interface ResistanceOnCard {
    rocID: number;
    cardID: string;
    type: string;
    value: number;
    card: PokemonCard;
}

export interface ImagesOnCard {
    iocID: number;
    cardID: number;
    ciID: number;
    card: PokemonCard;
    cardImages: CardImages;
}

export interface PokedexNumber {
    pdnID: number;
    cardID: string;
    number: number;
    card: PokemonCard;
}
