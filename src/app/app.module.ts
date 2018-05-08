import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { NodeComponent } from './components/node/node.component';
import { ConnectorComponent } from './components/connection/connection.component';
import { HtmlPipe } from './pipes/HtmlPipe';
import { SvgLineComponent } from './components/svg-line/svg-line.component';
import { AngularDraggableDirective } from './directive/angular-draggable.directive';
import { StopPropagationDirective } from './directive/stop-propagation.directive';


@NgModule({
    declarations: [
        AppComponent,
        WorkflowComponent,
        NodeComponent,
        ConnectorComponent,
        HtmlPipe,
        SvgLineComponent,
        AngularDraggableDirective,
        StopPropagationDirective
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    exports: [
        WorkflowComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
