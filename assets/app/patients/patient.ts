export interface Patient {
  id?: string;
  url?: string;
  name: string;
  height: number;
  weight: number;
  profession?: string;
  mongoId : string;
}
