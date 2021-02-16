export class Associate {
  id: number;
  salesforceId: string;
  email: string;
  firstName: string;
  lastName: string;
  manager: number;
  batch: number;
  status: string;

  constructor(
    id: number,
    salesforceId?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    manager?: number,
    batch?: number,
    status?: string
  ) {
    if (salesforceId) {
      this.id = id;
      this.salesforceId = salesforceId;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.manager = manager;
      this.batch = batch;
      this.status = status;
    } else {
      this.id = id;
    }
  }
}
