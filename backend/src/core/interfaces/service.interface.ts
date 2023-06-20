export interface IService {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  findOne(id: string): Promise<any | null>;
  update(): Promise<void>;
  delete(): void;
}
