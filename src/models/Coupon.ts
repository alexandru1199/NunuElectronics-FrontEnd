export class Coupon {
    id?: number;
    userId!: number;
    code!: string;
    discountValue!: number;
    expirationDate?: Date;
    isUsed?: boolean;
  }
  