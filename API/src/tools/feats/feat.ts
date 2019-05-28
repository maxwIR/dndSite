export interface IFeat{
    name: string,
    type: string[],
    description: string,
    prerequisites: IPrerequisites,
    benefit: string,
    normal?: string,
    special?: string,
    source: string,
    raw: string,
    note?: string,
}

export interface IPrerequisites{
    feats?: string[],
    races?: string[],
    class?: {className: string, level: number},
    classFeatures?: string[],
    casterLevel?: number,
    bab?: number,
    abilities?: {ability: string, score: number}[],
    skills?: {skill: string, amount: number}[],
    other?: string,
}