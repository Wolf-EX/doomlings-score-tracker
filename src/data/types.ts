export type Trait = {
  name: string;
  color: string[];
  type: string[];
  faceValue: number | null;
  bonus: Bonus | null;
  effect: null | {
    popup?: "none" | "single" | "double";
    type: string;
  }; // string is temp till I implement bonus effects (like color change)
  code: string; // change to id
}

export type Catastrophe = {
  name: string;
  bonus: Bonus | null;
  id: string;
}


export type Bonus = {
  type: string;
  typeValue?: number | Color | 'c' | 'positive' | 'negative' | 'choice';
  location?: 'traitPile' | 'hand' | 'discardPile' | 'genePool';
  target?: 'all' | 'self' | 'opponent' | 'player';
  amount: number;
  value: number;
}

export type Player = {
  id: number;
  name: string;
  score: number;
  genePool: number;
  traitPile: string[];
  hand: string[];
  modifier: ModifierType[];
  catastropheBonus: number;
}

//add Color type 'change'? for "Free WILL" and "RAINBOW HORN". If has that type, check the characters after first 2 of code
export type Color = 'r' | 'b' | 'g' | 'p';

// update this, object should be specific
export type ModifierType = ColorChangeMod;

export type ColorChangeMod = {
  type: string;
  from: Color;
  to: Color;
}
