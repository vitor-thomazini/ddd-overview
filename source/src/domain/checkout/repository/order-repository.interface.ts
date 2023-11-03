import { Order } from "../entity/order";
import { CreateRepositoryInterface } from "../../@shared/repository/create-repository.interface";
import { FindAllRepositoryInterface } from "../../@shared/repository/find-all-repository.interface";
import { FindRepositoryInterface } from "../../@shared/repository/find-repository.interface";
import { UpdateRepositoryInterface } from "../../@shared/repository/update-repository.interface";

export interface OrderRepositoryInterface 
  extends CreateRepositoryInterface<Order>, 
          UpdateRepositoryInterface<Order>,
          FindRepositoryInterface<Order>,
          FindAllRepositoryInterface<Order> {}