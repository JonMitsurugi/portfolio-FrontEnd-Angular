import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';

const routes: Routes = [
  {path: '', redirectTo: 'portfolio', pathMatch:'full'},
  {path: 'portfolio', component:PortfolioComponent, children: [
     {path: 'habilidades', component:HabilidadesComponent}
  ]},
  {path: '', children: [
    {path: 'habilidades', component:HabilidadesComponent}
  ]},

  {path: 'iniciar-sesion', component:IniciarSesionComponent}
];

@NgModule({
   imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: true, onSameUrlNavigation: "reload", enableTracing: true, scrollPositionRestoration: "enabled"})],
  // imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
