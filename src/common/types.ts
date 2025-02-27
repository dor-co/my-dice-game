export interface IPlayer {
  label: string;
  totalScore: number;
  currentScore: number;
  isActive: boolean;
}

export interface IDice {
  score: number | null;
}

export enum ITogglePlayer {
  first = 1,
  second = 2,
}

export interface IDiceState {
  dice1: number | null;
  dice2: number | null;
}

export interface IPlayerState {
  totalScore: number;
  currentScore: number;
}

export interface IButton {
  label: string;
  onClick?: () => void;
}

export interface IInput {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}
