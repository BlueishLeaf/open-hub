import { IRepoResponse } from './IRepoResponse';

export interface ISearchResponse {
    total_count: number;
    incomplete_results: string;
    items: IRepoResponse[];
}
