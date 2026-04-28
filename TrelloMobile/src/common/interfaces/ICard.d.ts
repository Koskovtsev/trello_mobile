export interface ICard {
  id?: number;
  title?: string;
  position?: number;
  list_id?: number;
  color?: string;
  desription?: string;
  custom?: {
    isChecked?: boolean;
    background?: string;
    // [key: string]: string | number | boolean | undefined;
  };
  // users?: number[];
  // created_at?: number; це для авторизації
}
