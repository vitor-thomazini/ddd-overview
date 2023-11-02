export class Address {
  private _street: string;
  private _number: string;
  private _zip: string;
  private _city: string;

  constructor(street: string, number: string, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number.length === 0) {
      throw new Error("Street is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Street is required");
    }
    if (this._city.length === 0) {
      throw new Error("Street is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}