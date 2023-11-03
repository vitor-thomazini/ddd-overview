import { Product } from "../entity/product";
import { CreateRepositoryInterface } from "../../@shared/repository/create-repository.interface";
import { FindAllRepositoryInterface } from "../../@shared/repository/find-all-repository.interface";
import { FindRepositoryInterface } from "../../@shared/repository/find-repository.interface";
import { UpdateRepositoryInterface } from "../../@shared/repository/update-repository.interface";

export interface ProductRepositoryInterface 
  extends CreateRepositoryInterface<Product>, 
          UpdateRepositoryInterface<Product>,
          FindRepositoryInterface<Product>,
          FindAllRepositoryInterface<Product> {}