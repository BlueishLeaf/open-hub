import { IRepo } from './IRepo';

export interface IQueryResult {
    total_count: number;
    incomplete_results: string;
    items: IRepo[];
}
