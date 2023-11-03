import { Customer } from "../entity/customer";
import { CreateRepositoryInterface } from "./@shared/create-repository.interface";
import { FindAllRepositoryInterface } from "./@shared/find-all-repository.interface";
import { FindRepositoryInterface } from "./@shared/find-repository.interface";
import { UpdateRepositoryInterface } from "./@shared/update-repository.interface";

export interface CustomerRepositoryInterface 
  extends CreateRepositoryInterface<Customer>, 
          UpdateRepositoryInterface<Customer>,
          FindRepositoryInterface<Customer>,
          FindAllRepositoryInterface<Customer> {}