export enum ATTACK_DICE_TYPE {
  STAB = 'STAB',
  SLASH = 'SLASH',
  HIT = 'HIT'
}

export enum DEFENSE_DICE_TYPE {
  DEFENSE = 'DEFENSE',
  EVADE = 'EVADE'
}

export enum BUFF {
  STRONG = 'STRONG',
  RESOLUTE = 'RESOLUTE',
  RAPID = 'RAPID'
}
export enum DE_BUFF {
  BLEEDING = 'BLEEDING',
  BURNING = 'BURNING',
  WEAK = 'WEAK',
  PENETRATED = 'PENETRATED',
  NUMB = 'NUMB',
  STUN = 'STUN'
}

export enum EFFECT_TARGET {
  RANDOM_ALLY = 'RANDOM_ALLY',
  RANDOM_ENEMY = 'RANDOM_ENEMY',
  SPECIFIED_ALLY = 'SPECIFIED_ALLY',
  SPECIFIED_ENEMY = 'SPECIFIED_ENEMY',
  SELF = 'SELF',
  ALL = 'ALL'
}

export type Attack_Stab = ATTACK_DICE_TYPE.STAB
export type Attack_Slash = ATTACK_DICE_TYPE.SLASH
export type Attack_Hit = ATTACK_DICE_TYPE.HIT

export type Defense = DEFENSE_DICE_TYPE.DEFENSE
export type Evade = DEFENSE_DICE_TYPE.EVADE

export type Dice_Type = ATTACK_DICE_TYPE | DEFENSE_DICE_TYPE


export type MaxNumber = number
export type MinNumber = number

export type Cost = 0 | 1 | 2 | 3 | 4 | 5

export interface Card_Dice {
  type: Dice_Type
  maxNumber: MaxNumber
  minNumber: MinNumber
  effect: Buff_Effect | Debuff_Effect
}

export interface Buff_Effect {
  name: BUFF
  level: number
  target: EFFECT_TARGET
}

export interface Debuff_Effect {
  name: DE_BUFF
  level: number
  target: EFFECT_TARGET
}

export interface Card_Type {
  cost: Cost
  dices: Card_Dice[]
  effect: Buff_Effect | Debuff_Effect
}
