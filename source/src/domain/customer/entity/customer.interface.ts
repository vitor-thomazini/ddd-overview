import { Address } from "../value-object/address";

export interface CustomerInterface {
  get id(): string;

  get name(): string;

  get address(): Address;

  get rewardPoints(): number;
}