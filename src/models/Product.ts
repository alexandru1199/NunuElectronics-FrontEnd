export class Product {
  productName?: string;
  price!: number;
  stockQuantity!: number;
  createdDate?: Date;
  image?:string;
  description?:string;
  detailedDescription?:string;
  tagId?:number;
}