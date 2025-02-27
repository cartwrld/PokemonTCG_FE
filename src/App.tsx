import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
    PokemonCard, CardImages, Set, Type, Subtype, Ability, Attack, TypeOnCard, SubtypeOnCard, AbilityOnCard,
    AttackOnCard, WeaknessOnCard, ResistanceOnCard, ImagesOnCard, PokedexNumber
} from '/utils/models.ts'

import {Box, Center, Flex, Heading, Input} from "@chakra-ui/react";


interface TCGCard {
    cardID: string
    abilities: Ability[];
    attacks: { name: string; cost: string[]; convertedEnergyCost: number; damage: string; text: string; }[];
    convertedRetreatCost: number;
    evolvesFrom?: string;
    hp: number;
    images: { small: string; large: string };
    name: string;
    id: string;
    nationalPokedexNumbers: number[];
    number: number; // Changed from string to number
    rarity: string;
    resistances?: { type: string; value: number }[]; // Value should be a number
    retreatCost: string[];
    set: { id: string; setName: string; series: string; };
    stage?: string[];
    supertype: string;
    types: Type[];
    weaknesses: { type: string; value: number }[]; // Value should be a number
}


function App() {

    const DB_URL = 'http://localhost:3000/pokemon'

    const [cardCollection, setCardCollection] = useState<TCGCard[]>([])
    const [setList, setSetList] = useState([]);
    const [typeList, setTypeList] = useState<Type[]>([]);
    const [typeOnCardList, setTypeOnCardList] = useState<TypeOnCard[]>([]);
    const [abilityList, setAbilityList] = useState<Ability[]>([]);
    const [abilityOnCardList, setAbilityOnCardList] = useState<AbilityOnCard[]>([]);
    const [attackList, setAttackList] = useState<Attack[]>([]);
    const [attackOnCardList, setAttackOnCardList] = useState<AttackOnCard[]>([]);
    const [weaknessList, setWeaknessList] = useState<WeaknessOnCard[]>([]);
    const [resistanceList, setResistanceList] = useState<ResistanceOnCard[]>([]);
    const [pokedexNumberList, setPokedexNumberList] = useState<PokedexNumber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchAndSet = async (endpoint: string, setter: Function) => {
                    const res = await fetch(`${DB_URL}/${endpoint}`);
                    const data = await res.json();
                    setter(data);
                };

                await fetchAndSet("sets", setSetList);
                await fetchAndSet("types", setTypeList);
                await fetchAndSet("toc", setTypeOnCardList);
                await fetchAndSet("abilities", setAbilityList);
                await fetchAndSet("aboc", setAbilityOnCardList);
                await fetchAndSet("attacks", setAttackList);
                await fetchAndSet("atoc", setAttackOnCardList);
                await fetchAndSet("woc", setWeaknessList);
                await fetchAndSet("roc", setResistanceList);
                await fetchAndSet("pdn", setPokedexNumberList);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [DB_URL]);

    useEffect(() => {
        const url = `http://localhost:3000/pokemon/`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                const deck: TCGCard[] = []
                for (let i = 0; i < data.length; i++) {

                    const card = data[i]
                    // console.log(card)

                    const cardobj: TCGCard = {
                        cardID: card.cardID,
                        abilities: card.abilities || [], // Ensure it's an array
                        attacks: card.attacks || [], // Ensure it's an array
                        convertedRetreatCost: card.convertedRetreatCost ?? 0, // Default to 0 if missing
                        evolvesFrom: card.evolvesFrom || undefined, // Ensure optional value
                        hp: parseInt(card.hp, 10) || 0, // Default to 0 if parsing fails
                        id: card.id,
                        images: card.images,
                        name: card.name,
                        nationalPokedexNumbers: card.nationalPokedexNumbers || [], // Ensure it's an array
                        number: parseInt(card.number, 10) || 0, // Ensure it's a number
                        resistances: card.resistances
                            ? card.resistances.map((res: any) => ({
                                type: res.type,
                                value: parseInt(res.value, 10) || 0,
                            }))
                            : [], // Ensure array format
                        rarity: card.rarity || "Unknown",
                        retreatCost: card.retreatCost || [],
                        set: {
                            id: card.setID, // Set ID should remain a string
                            setName: card.setName,
                            series: ''
                        },
                        stage: card.subtypes || [],
                        supertype: card.supertype,
                        types: card.types || [],
                        weaknesses: card.weaknesses
                            ? card.weaknesses.map((weak: any) => ({
                                type: weak.type,
                                value: parseInt(weak.value, 10) || 0,
                            }))
                            : [], // Ensure array format
                    };

                    deck.push(cardobj);

                }
                setCardCollection(deck)
            })
        setLoading(false);
    }, [setPokedexNumberList])


    const setTypes = (card: TCGCard) => {

        const types: Type[] = []

        const pkType: TypeOnCard = typeOnCardList.filter((x: TypeOnCard) => x.tocID === card.cardID)

        const typeobj = pkType[0]

        if (typeobj === undefined || typeobj === null) return types;

        const type: Type = typeList.filter((x: Type) => x.typeID === pkType[0].typeID)

        if (type.length > 1) for (const t of type) types.push(t)
        else types.push(type[0])

        return types;
    }
    const setAbilities = (card: TCGCard) => {

        const abilities: Ability[] = []

        const pkAbility: AbilityOnCard = abilityOnCardList.filter((x: AbilityOnCard) => x.cardID === card.cardID)

        const abilityobj = pkAbility[0]

        if (abilityobj === undefined || abilityobj === null) return abilities;

        const ability: Ability = abilityList.filter((x: Ability) => x.abilityID === pkAbility[0].abilityID)

        if (pkAbility.length === 0) return abilities;

        if (ability.length > 1) for (const t of ability) abilities.push(t)
        else abilities.push(ability[0])

        return abilities;
    }

    const setAttacks = (card: TCGCard) => {

        let attacks: Attack[] = []

        const pkAttack: AttackOnCard = attackOnCardList.filter((x: AttackOnCard) => x.cardID === card.id)
        // console.log(pkAttack)
        const attackobj = pkAttack[0]

        if (attackobj === undefined || attackobj === null) return attacks;

        attacks = []

        const attack: Attack = attackList.filter((x: Attack) => x.attackID === pkAttack[0].attackID)

        if (pkAttack.length === 0) return attacks;

        if (attack.length > 1) for (const t of attack) attacks.push(t)
        else attacks.push(attack[0])

        return attacks;
    }




useEffect(() => {

    for (let i = 0; i < cardCollection.length; i++) {
        cardCollection[i].types = setTypes(cardCollection[i])
        // console.log(cardCollection[i].types)
        cardCollection[i].abilities = setAbilities(cardCollection[i])
        // console.log(cardCollection[i].abilities)
        cardCollection[i].attacks = setAttacks(cardCollection[i])
        // console.log(cardCollection[i].attacks)

    }

}, [cardCollection]);

if (loading) return (<Center>Loading...</Center>)

return (
    <Flex bg={'red.100'} justify={'center'} align={'center'} fontWeight={'semibold'} direction={'column'}>
        {/*  Search Filters  */}
        <Flex bg={'blue.200'} justify={'space-around'} align={'center'} direction={'column'} w={'90%'}>
            <Flex bg={'blue.100'} justify={'space-around'} align={'center'} direction={'row'} w={'500px'}>
                <Box>Search by Name</Box>
                <Input bg={'white'} w={'60%'}/>
            </Flex>
        </Flex>

        {/*  Card Gallery  */}
        <Flex direction={'row'} justify={'space-around'} align={'center'} bg={'green.400'} p={5} wrap={'wrap'}
              w={'90%'}>
            <Flex justify={'center'} align={'center'} wrap={'wrap'}>
                {
                    cardCollection.map((card: TCGCard, index: number) => (
                        <DisplayCard key={index} card={card}/>
                    ))
                }
            </Flex>
        </Flex>
    </Flex>
)
}

function DisplayCard({card}: { card: TCGCard }) {
    return (
        <Flex p={3} m={2} bg={'gray.400'}>
            {card.name}
        </Flex>
    )
}

export default App


