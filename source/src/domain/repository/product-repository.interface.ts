import { Product } from "../entity/product";
import { CreateRepositoryInterface } from "./@shared/create-repository.interface";
import { FindAllRepositoryInterface } from "./@shared/find-all-repository.interface";
import { FindRepositoryInterface } from "./@shared/find-repository.interface";
import { UpdateRepositoryInterface } from "./@shared/update-repository.interface";

export interface ProductRepositoryInterface 
  extends CreateRepositoryInterface<Product>, 
          UpdateRepositoryInterface<Product>,
          FindRepositoryInterface<Product>,
          FindAllRepositoryInterface<Product> {}