import {Pending} from "../models";

export interface Recipe{
  RECIPE_ID: number,
  RECIPE_NAME: string,
  CCAL?: string | number,

  PENDING?: RecipePending,
}

export interface RecipePending{
  DELETE: Pending,
}

export const DEFAULT_RECIPE_PENDING = {
  DELETE: Pending.None,
};
