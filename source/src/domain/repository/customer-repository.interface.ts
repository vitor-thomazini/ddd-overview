import { Customer } from "../entity/customer";
import { CreateRepositoryInterface } from "./common/create-repository.interface";
import { FindAllRepositoryInterface } from "./common/find-all-repository.interface";
import { FindRepositoryInterface } from "./common/find-repository.interface";
import { UpdateRepositoryInterface } from "./common/update-repository.interface";

export interface CustomerRepositoryInterface 
  extends CreateRepositoryInterface<Customer>, 
          UpdateRepositoryInterface<Customer>,
          FindRepositoryInterface<Customer>,
          FindAllRepositoryInterface<Customer> {}