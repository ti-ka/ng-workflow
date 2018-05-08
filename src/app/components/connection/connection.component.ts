import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Workflow, WorkflowNode } from '../../models/workflow-models';
import { TrigFunctions } from './trig.functions';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss']
})
export class ConnectorComponent extends TrigFunctions implements OnInit {

    @Input() container: HTMLElement;
    @Input() workflow: Workflow;

    @Input() color: string;
    @Input() width = 2;

    @ViewChild('div') div;

    ngOnInit() {
        if (this.connection.to == null) {
            // Create a destination node with mouse pointer
            this.connection.to = new WorkflowNode(null, null, this.connection.from.x, this.connection.from.y );

            this.div.nativeElement.addEventListener('mousemove', (ev => {
                ev = ev || window.event;
                this.connection.to.x = ev.clientX - this.container.offsetLeft;
                this.connection.to.y = ev.clientY - this.container.offsetTop;
            }), false);
        }
    }

}
