export interface IService {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  findOne(id: string): Promise<any | null>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): void;
}
