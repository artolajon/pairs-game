import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { HowToPlayComponent } from './pages/how-to-play/how-to-play.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [{
  path: '', component: MenuComponent
},
{
  path: 'game', component: GameComponent
},
{
  path: 'how-to-play', component: HowToPlayComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
