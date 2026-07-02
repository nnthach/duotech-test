import { UserGenderEnum } from ".";

export interface StaffFormState {
  fullname: string;
  email: string;
  dob: string;
  gender: UserGenderEnum;
  store_id: string;
}

export interface IngredientFormState {
  name_vi: string;
  name_en: string;
  slug_vi: string;
  slug_en: string;
}

export interface CategoryFormState {
  name_vi: string;
  name_en: string;
  description_vi: string;
  description_en: string;
  slug_vi: string;
  slug_en: string;
}

export interface StoreFormState {
  name: string;
  address_vi: string;
  address_en: string;
  city: string;
  district: string;
  phone: string;
}

export interface StoreInventoryFormState {
  product_id: string;
  quantity: number;
}
