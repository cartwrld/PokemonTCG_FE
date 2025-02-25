import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Box, Flex, Heading, Input} from "@chakra-ui/react";

const API_KEY = "3a54aa8b-da4a-47ac-ae7f-edc78cf15db9"

interface TCGCard {
    abilities: { name: string; text: string }[];
    attacks: { name: string; cost: string[]; convertedEnergyCost: number; damage: string; text: string; }[];
    convertedRetreatCost: number;
    evolvesFrom?: string;
    hp: number;
    images: { small: string; large: string };
    name: string;
    nationalPokedexNumbers: number[];
    number: number; // Changed from string to number
    rarity: string;
    resistances?: { type: string; value: number }[]; // Value should be a number
    retreatCost: string[];
    set: { id: string; setName: string; series: string; };
    stage?: string[];
    supertype: string;
    types: string[];
    weaknesses: { type: string; value: number }[]; // Value should be a number
}



function App() {

    const [cardCollection, setCardCollection] = useState<TCGCard[]>([])

    useEffect(() => {
        const url = `http://localhost:3000/pokemon/`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                const deck : TCGCard[] = []
                for (let i = 0; i < data.length; i++) {

                    const card = data[i]
                    // console.log(card)

                    const cardobj: TCGCard = {
                        abilities: card.abilities || [], // Ensure it's an array
                        attacks: card.attacks || [], // Ensure it's an array
                        convertedRetreatCost: card.convertedRetreatCost ?? 0, // Default to 0 if missing
                        evolvesFrom: card.evolvesFrom || undefined, // Ensure optional value
                        hp: parseInt(card.hp, 10) || 0, // Default to 0 if parsing fails
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

                    // console.log(deck)
                    // console.log(cardobj)
                }
                setCardCollection(deck)
            })

    }, [])

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
            <Flex direction={'row'} justify={'space-around'} align={'center'} bg={'green.400'} p={5} wrap={'wrap'} w={'90%'}>
                <Flex justify={'center'} align={'center'} wrap={'wrap'}>
                    {
                        cardCollection.map((card: TCGCard, index: number) => (
                            <DisplayCard key={index} card={card} />
                        ))
                    }
            </Flex>
            </Flex>
        </Flex>
    )
}

function DisplayCard({ card }: { card: TCGCard }) {
    return (
        <Flex p={3} m={2} bg={'gray.400'}>
            {card.name}
        </Flex>
    )
}

export default App


