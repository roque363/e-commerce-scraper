import ProductData from '@root/interfaces/ProductData';
import OnlineStore from '@root/interfaces/OnlineStore';

export interface ResponseInstance extends ProductData {
  onlineStore: OnlineStore;
}

export default ResponseInstance;
