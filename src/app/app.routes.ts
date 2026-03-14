import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ShopAll } from './shop-all/shop-all';
import { Cart } from './cart/cart';
import { Profile } from './profile/profile';
import { AuthGuard,} from './auth-guard';

export const routes: Routes = [
    {path:"", component:Home},
    {path:"shopAll", component:ShopAll},
    {path:"cart", component:Cart, canActivate:[AuthGuard]},
    {path:"profile", component:Profile, canActivate: [AuthGuard]},
    {path:"**", redirectTo:""},
];
