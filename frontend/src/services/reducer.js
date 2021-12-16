import { combineReducers } from 'redux';
import { AuthenticationReducer } from './Authentication';
import { BenefitsReducer } from './Benefits';
import { NavigationReducer } from './Navigation';
import { SignUpProcessReducer } from './SignUpProcess';
import { UserReducer } from './User';
import { CompanyReducer } from './Company';
import { DealershipsReducer } from './Dealerships';
import { MaintenancesReducer } from './Maintenances';
import { SignInReducer } from './SignIn';
import { ArticlesReducer } from './Articles';
import { TopicsReducer } from './Topics';
import { NewsReducer } from './Articles';
import { FeaturedContentReducer } from './FeaturedContent';
import { BannersReducer } from './Banners';

export const Reducer = combineReducers({
  Authentication: AuthenticationReducer,
  Benefits: BenefitsReducer,
  Navigation: NavigationReducer,
  SignUpProcess: SignUpProcessReducer,
  User: UserReducer,
  Company: CompanyReducer,
  Articles: ArticlesReducer,
  News: NewsReducer,
  Topics: TopicsReducer,
  Maintenances: MaintenancesReducer,
  Dealerships: DealershipsReducer,
  SignIn: SignInReducer,
  FeaturedContents: FeaturedContentReducer,
  Banners: BannersReducer,
});
