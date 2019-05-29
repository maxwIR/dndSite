import {featList} from "../../../public/feats.json";
import { IFeat } from "./feat.js";

export function getFeats(filter?: IFilter): IFeat[]{
    let ret = featList as IFeat[];
    if (filter && ret){
        ret = ret.filter(feat =>  isAvailable(feat, filter));
    }
    return ret;
}

function isAvailable(feat: IFeat, filter: IFilter){
    if(!feat.prerequisites){
        return true;
    }
    if(!isBetterThan(feat.prerequisites.bab, filter.bab))
    {
        return false;
    }
    if(!isBetterThan(feat.prerequisites.casterLevel, filter.casterLevel))
    {
        return false;
    }
    if(!hasRightFeats(feat.prerequisites.feats, filter.featsKnown)){
        return false;
    }
    if(!isOfRace(feat.prerequisites.races, filter.race)){
        return false
    }
    // if(feat.prerequisites.featName && filter.featsKnown){
    //     let ret = true;
    //     feat.prerequisites.featName.forEach(requiredFeat => {
    //         // console.log("feat", requiredFeat);
    //         if(filter.featsKnown && !filter.featsKnown.includes(requiredFeat)){
    //             // console.log("no");
    //             ret = false;
    //         }
    //     });
    //     if (!ret)
    //         return ret;
    // }   
    // if(feat.prerequisites.casterLevel && filter.casterLevel && filter.casterLevel < feat.prerequisites.casterLevel)
    //     return false;
    // if(feat.prerequisites.abilityScore && filter.abilityScore){
    //     let ret = true;
    //     feat.prerequisites.abilityScore.forEach(ability => {
    //         if (filter.abilityScore){
    //             filter.abilityScore.forEach(filterAbility => {
    //                 if(filterAbility.ability === ability.ability && filterAbility.score < ability.score){
    //                     ret = false
    //                     return;
    //                 }
    //             });
    //         }
    //     })
    //     if (!ret)
    //         return ret;
    // }
    return true;
}

function isBetterThan(prereqBAB : number|undefined, filterBAB: number|undefined){
    if (!prereqBAB || !filterBAB){
        console.log(prereqBAB, filterBAB);
        return true;
    } else if (filterBAB >= prereqBAB) {
        console.log(filterBAB, ">=", prereqBAB);
        return true;
    } else 
        return false;
}

function hasRightFeats(listOfReqFeats: string[]|undefined, featsKnown: string[]|undefined){
    if (!listOfReqFeats || !featsKnown){
        return true;
    } else {
        let ret = true;
        listOfReqFeats.forEach((ft) => {
            if (!featsKnown.includes(ft))
                ret = false;
        });
        return ret;
    }
}

function isOfRace(listOfAccepted: string[]|undefined, current:string|undefined){
    if(!listOfAccepted || !current)
        return true;
    let ret = false;
    listOfAccepted.forEach(race => {
        if(race === current)
            ret = true;
    });
    return ret;
}

export interface IFilter{
    featsKnown?: string[],
    race?: string,
    class?: {className: string, level: number}[],
    classFeatures?: string[],
    casterLevel?: number,
    bab?: number,
    abilities?: {ability: string, score: number}[],
    skills?: {[skill: string]: number},
    type?: string
}
