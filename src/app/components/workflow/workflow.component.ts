import { Component, OnInit, Input } from '@angular/core';
import { WorkflowNode, Connection, Workflow } from '../../models/workflow-models';

@Component({
    selector: 'ng-workflow',
    templateUrl: 'workflow.component.html',
    styleUrls: ['workflow.component.scss']
})

export class WorkflowComponent implements OnInit {

    @Input() public nodes: WorkflowNode[];
    @Input() public connections: Connection[];
    @Input() workflow: Workflow;
    @Input() gridSize: number = 10;
    @Input() lineColor = 'darkgray';

    // Do not allow connection from same node it itself
    // and also prevent circular dependency
    // Example: if A → B. them B → A is not allowed.
    // However, B → C → A will be allowed
    @Input() allowCircularDependency = false;

    constructor() { }

    ngOnInit() {
        this.workflow = new Workflow();
        this.workflow.nodes = this.nodes;
        this.workflow.connections = this.connections;
    }

    discardConnection () {
        this.workflow.discardCurrentConnection();
    }

}

