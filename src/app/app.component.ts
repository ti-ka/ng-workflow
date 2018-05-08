import { Component } from '@angular/core';
import { WorkflowNode, WorkflowConnection } from './models/workflow-models';

@Component({
    selector: 'app-root',
    template: `
        <ng-workflow
                [lineColor]="'navy'"
                [nodes]="nodes"
                [allowCircular]="false"
                [connections]="connections"></ng-workflow>
    `,
    styles: []
})
export class AppComponent {

    nodes: WorkflowNode[] = [];
    connections: WorkflowConnection[] = [];


    constructor() {

        this.nodes = [{
            "title": "Start",
            "id": "start",
            "x": 32,
            "y": 84
        }, {
            "title": "Verify",
            "id": "verify",
            "x": 538,
            "y": 376
        }, {
            "title": "Test",
            "id": "test",
            "x": 92,
            "y": 321
        }, {
            "title": "Review",
            "id": "review",
            "x": 288,
            "y": 155
        }, {
            "title": "Finish",
            "id": "finish",
            "x": 760,
            "y": 263
        }];

        this.connections.push({
            from: this.nodes[0],
            to: this.nodes[1],
            title: 'Start to verify',
            fromSide: 'right',
            toSide: 'left',
            color: 'navy'
        })

        this.connections.push({
            from: this.nodes[0],
            to: this.nodes[2],
            fromSide: 'bottom',
            toSide: 'left',
        })

        this.connections.push({
            from: this.nodes[3],
            to: this.nodes[1],
            fromSide: 'bottom',
            toSide: 'top',
            title: 'Review to verify',
        })

        this.connections.push({
            from: this.nodes[3],
            to: this.nodes[4],
            fromSide: 'right',
            toSide: 'top',
            title: 'Review to finish',
        })


        this.connections.push({
            from: this.nodes[1],
            to: this.nodes[4],
            fromSide: 'right',
            toSide: 'bottom',
            title: 'Verify to finish',
        })


        this.connections.push({
            from: this.nodes[2],
            to: this.nodes[3],
            fromSide: 'right',
            toSide: 'left',
            title: 'Test to review',
        })

    }
}
