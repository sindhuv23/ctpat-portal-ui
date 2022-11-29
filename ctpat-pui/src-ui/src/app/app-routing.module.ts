import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidationFormComponent } from './core/modals/plan-validation-modal/validation-form/validation-form.component';

const routes: Routes = [];
for (let i = 0; i <= 11; i++){
  routes.push({path: 'validation' + i, component: ValidationFormComponent});
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
