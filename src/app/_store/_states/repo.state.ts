import { State, Selector, Action, StateContext } from '@ngxs/store';
import { GithubService } from 'src/app/_services/github.service';
// tslint:disable-next-line:max-line-length
import { SearchRepos, SearchReposSuccess, SearchReposFailure, GetPopularRepos, GetLatestOrgs, GetPopularReposSuccess, GetPopularReposFailure, GetLatestOrgsSuccess, GetLatestOrgsFailure } from '../_actions/repo.actions';
import { IOrg } from 'src/app/_models/_domain/IOrg';
import { isNullOrUndefined } from 'util';
import { IRepo } from 'src/app/_models/_domain/IRepo';

export interface RepoStateModel {
    searched?: IRepo[];
    popular?: IRepo[];
    organizations?: IOrg[];
}

@State<RepoStateModel>({
    name: 'repo'
})

export class RepoState {
    @Selector()
    static searched(state: RepoStateModel) { return state.searched; }

    @Selector()
    static popular(state: RepoStateModel) { return state.popular; }

    @Selector()
    static organizations(state: RepoStateModel) { return state.organizations; }

    constructor(private _repos: GithubService) {}

    @Action(SearchRepos)
    searchRepos(ctx: StateContext<RepoStateModel>, { payload }: SearchRepos) {
      return this._repos.searchRepos(payload).subscribe(
          res => { ctx.dispatch(new SearchReposSuccess(res.items)); },
          error => { ctx.dispatch(new SearchReposFailure(error)); });
    }

    @Action(SearchReposSuccess)
    searchReposSuccess = ({ patchState }: StateContext<RepoStateModel>, { payload }: SearchReposSuccess) => patchState({ searched: payload })

    @Action(SearchReposFailure)
    searchReposFailure({ getState, setState }: StateContext<RepoStateModel>, { payload }: SearchReposFailure) {
        const state = getState();
        console.error(payload);
        setState(state);
    }

    @Action(GetPopularRepos)
    getPopularRepos(ctx: StateContext<RepoStateModel>, { payload }: GetPopularRepos) {
        return this._repos.getPopularRepos(payload).subscribe(
            res => { ctx.dispatch(new GetPopularReposSuccess(res.items)); },
            error => { ctx.dispatch(new GetPopularReposFailure(error)); });
    }

    @Action(GetPopularReposSuccess)
    getPopularReposSuccess = ({ patchState }: StateContext<RepoStateModel>, { payload }: GetPopularReposSuccess) => patchState({ popular: payload })

    @Action(GetPopularReposFailure)
    getPopularReposFailure({ getState, setState }: StateContext<RepoStateModel>, { payload }: GetPopularReposFailure) {
        const state = getState();
        console.error(payload);
        setState(state);
    }

    @Action(GetLatestOrgs)
    getLatestOrgs(ctx: StateContext<RepoStateModel>, { payload }: GetLatestOrgs) {
        const orgs = ctx.getState().organizations;
        return orgs === payload && !isNullOrUndefined(orgs) ? ctx.dispatch(new GetLatestOrgsSuccess(orgs)) :
        this._repos.getLatestOrgs().subscribe(
            res => { ctx.dispatch(new GetLatestOrgsSuccess(res)); },
            error => { ctx.dispatch(new GetLatestOrgsFailure(error)); });
    }

    @Action(GetLatestOrgsSuccess)
    getLatestOrgsSuccess = ({ patchState }: StateContext<RepoStateModel>, { payload }: GetLatestOrgsSuccess) => patchState({ organizations: payload })

    @Action(GetLatestOrgsFailure)
    getLatestOrgsFailure({ getState, setState }: StateContext<RepoStateModel>, { payload }: GetLatestOrgsFailure) {
        const state = getState();
        console.error(payload);
        setState(state);
    }
}
