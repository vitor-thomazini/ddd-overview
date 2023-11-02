import { Product } from "../entity/product";
import { CreateRepositoryInterface } from "./common/create-repository.interface";
import { FindAllRepositoryInterface } from "./common/find-all-repository.interface";
import { FindRepositoryInterface } from "./common/find-repository.interface";
import { UpdateRepositoryInterface } from "./common/update-repository.interface";

export interface ProductRepositoryInterface 
  extends CreateRepositoryInterface<Product>, 
          UpdateRepositoryInterface<Product>,
          FindRepositoryInterface<Product>,
          FindAllRepositoryInterface<Product> {}