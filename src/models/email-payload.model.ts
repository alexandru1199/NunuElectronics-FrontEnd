// src/app/models/email-payload.model.ts
export class EmailPayload {
    constructor(
      public to: string,
      public subject: string,
      public textContent: string,
      public htmlContent: string
    ) {}
  }
  