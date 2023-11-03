import { Order } from "../entity/order";
import { CreateRepositoryInterface } from "./@shared/create-repository.interface";
import { FindAllRepositoryInterface } from "./@shared/find-all-repository.interface";
import { FindRepositoryInterface } from "./@shared/find-repository.interface";
import { UpdateRepositoryInterface } from "./@shared/update-repository.interface";

export interface OrderRepositoryInterface 
  extends CreateRepositoryInterface<Order>, 
          UpdateRepositoryInterface<Order>,
          FindRepositoryInterface<Order>,
          FindAllRepositoryInterface<Order> {}