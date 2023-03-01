import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HeroComponent } from './componentes/hero/hero.component';
import { AcercadeComponent } from './componentes/acercade/acercade.component';
import { EstudiosComponent } from './componentes/estudios/estudios.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { interceptorProvider } from './services/interceptor-service';
import { NewExperienciaComponent } from './componentes/experiencia/new-experiencia.component';
import { EditExperienciaComponent } from './componentes/experiencia/edit-experiencia.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExperienciaService } from './services/experiencia.service';
import { NewProyectoComponent } from './componentes/proyectos/new-proyecto.component';
import { EditProyectoComponent } from './componentes/proyectos/edit-proyecto.component';
import { NewEstudioComponent } from './componentes/estudios/new-estudio.component';
import { EditEstudioComponent } from './componentes/estudios/edit-estudio.component';
import { NewHabilidadComponent } from './componentes/habilidades/new-habilidad.component';
import { EditHabilidadComponent } from './componentes/habilidades/edit-habilidad.component';
import { EditHeroComponent } from './componentes/hero/edit-hero.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    AcercadeComponent,
    EstudiosComponent,
    HabilidadesComponent,
    ProyectosComponent,
    FooterComponent,
    IniciarSesionComponent,
    PortfolioComponent,
    ExperienciaComponent,
    NewExperienciaComponent,
    EditExperienciaComponent,
    NewProyectoComponent,
    EditProyectoComponent,
    NewEstudioComponent,
    EditEstudioComponent,
    NewHabilidadComponent,
    EditHabilidadComponent,
    EditHeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
  ],
  entryComponents:[
    NewExperienciaComponent
  ],
  providers: [interceptorProvider, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
