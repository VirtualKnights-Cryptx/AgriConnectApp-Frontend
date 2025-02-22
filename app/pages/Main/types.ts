export interface CropItem {
    id: string;
    fieldName: string;
    farmer: string;
    location: string;
    price: number;
    image: string;
  }
  
  export interface AddHarvestFormData {
    fieldName: string;
    quantity: string;
    price: string;
    description: string;
    location: string;
  }