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
  slug: string;
}
