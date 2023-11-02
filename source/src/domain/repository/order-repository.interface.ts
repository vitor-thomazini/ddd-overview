import { Order } from "../entity/order";
import { CreateRepositoryInterface } from "./common/create-repository.interface";
import { FindAllRepositoryInterface } from "./common/find-all-repository.interface";
import { FindRepositoryInterface } from "./common/find-repository.interface";
import { UpdateRepositoryInterface } from "./common/update-repository.interface";

export interface OrderRepositoryInterface 
  extends CreateRepositoryInterface<Order>, 
          UpdateRepositoryInterface<Order>,
          FindRepositoryInterface<Order>,
          FindAllRepositoryInterface<Order> {}