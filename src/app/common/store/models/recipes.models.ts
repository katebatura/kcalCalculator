import {Pending} from "../models";

export interface Recipe{
  RECIPE_ID: number,
  RECIPE_NAME: string,
  RECIPE_CCAL?: string | number,
  RECIPE_PROTEINS?: string | number,
  RECIPE_FATS?: string | number,
  RECIPE_CARBOS?: string | number,
  PRODUCTS?: Product[],

  PENDING?: RecipePending,
}

export interface RecipePending{
  DELETE: Pending,
}

export const DEFAULT_RECIPE_PENDING = {
  DELETE: Pending.None,
};

export interface Product{
  PRODUCT_NAME: string,
  PRODUCT_PROTEINS: number,
  PRODUCT_FATS: number,
  PRODUCT_CARBOS: number,
  PRODUCT_WEIGHT: number,
  PRODUCT_DEFAULT_KCAL: number,
  PRODUCT_KCAL: number,
}
