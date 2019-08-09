export interface DataAdapter<T> {
  adapt(item: any): T;
}