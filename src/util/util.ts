import type { Trait, Catastrophe } from "../data/types";
import traits from '../data/traits.json' with {type: 'json'};
import catastrophe from '../data/catastrophe.json' with {type: 'json'};

export function mod(n: number, d: number): number {
  return ((n % d) + d) % d;
}

export function findTrait(code: string): Trait | undefined {
  return traits.find(trait => trait.code === code.slice(0, 2)) as Trait;
}

export function findCatastrophe(id: string): Catastrophe {
  return catastrophe.find(catastraphy => catastraphy.id === id) as Catastrophe || catastrophe[0];
}