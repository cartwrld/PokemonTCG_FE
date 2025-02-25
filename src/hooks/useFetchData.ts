import { useState, useEffect } from "react";

const useFetchData = (DB_URL: string, options: RequestInit) => {

    return {
        setList,
        typeList,
        typeOnCardList,
        abilityList,
        abilityOnCardList,
        attackList,
        attackOnCardList,
        weaknessList,
        resistanceList,
        pokedexNumberList,
        loading,
        error,
    };
};

export default useFetchData;
