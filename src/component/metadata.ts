import type { CSSProperties } from 'react';

export const MuscleType = {
  TRAPEZIUS: 'trapezius',
  UPPER_BACK: 'upper-back',
  LOWER_BACK: 'lower-back',
  CHEST: 'chest',
  BICEPS: 'biceps',
  TRICEPS: 'triceps',
  FOREARM: 'forearm',
  BACK_DELTOIDS: 'back-deltoids',
  FRONT_DELTOIDS: 'front-deltoids',
  ABS: 'abs',
  OBLIQUES: 'obliques',
  ABDUCTOR: 'adductor',
  ABDUCTORS: 'abductors',
  HAMSTRING: 'hamstring',
  QUADRICEPS: 'quadriceps',
  CALVES: 'calves',
  GLUTEAL: 'gluteal',
  HEAD: 'head',
  NECK: 'neck',
  KNEES: 'knees',
  LEFT_SOLEUS: 'left-soleus',
  RIGHT_SOLEUS: 'right-soleus',
  LEFT_HAND: 'left-hand',
  RIGHT_HAND: 'right-hand',
  LEFT_FOOT: 'left-foot',
  RIGHT_FOOT: 'right-foot',
  LEFT_EAR: 'left-ear',
  RIGHT_EAR: 'right-ear',
} as const;

export type Muscle = (typeof MuscleType)[keyof typeof MuscleType];

export const ModelType = {
  POSTERIOR: 'posterior',
  ANTERIOR: 'anterior',
} as const;

type ModelType = (typeof ModelType)[keyof typeof ModelType];

export interface IExerciseData {
  name: string;
  muscles: Muscle[];
  frequency?: number;
}

export interface IMuscleData {
  exercises: string[];
  frequency: number;
}

export interface IMuscleStats {
  muscle: Muscle;
  data: IMuscleData;
}

export interface IModelProps {
  bodyColor?: string;
  data?: IExerciseData[];
  highlightedColors?: string[];
  onClick?: ((exercise: IMuscleStats) => void) | (() => void);
  style?: CSSProperties;
  svgStyle?: CSSProperties;
  type?: ModelType;
  // Propriedades para controlar visibilidade das partes extras
  showHands?: boolean;
  showFeet?: boolean;
  showEars?: boolean;
}
