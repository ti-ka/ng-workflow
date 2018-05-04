import { Component } from '@angular/core';
import { WorkflowNode, Connection } from './models/workflow-models';

@Component({
    selector: 'app-root',
    template: `
        <button (click)="saveCurrent()">Save</button>
        <button (click)="reset()">Reset</button>
        <ng-workflow
                [lineColor]="'navy'"
                [nodes]="nodes"
                [connections]="connections"></ng-workflow>
    `,
    styles: []
})
export class AppComponent {

    nodes: WorkflowNode[] = [];
    connections: Connection[] = [];


    constructor() {
        this.someNodes();
        this.fetchNodes();
    }

    someNodes(){
        this.nodes.push(new WorkflowNode('Start', 'start', 100, 100))
        this.nodes.push(new WorkflowNode('Verify', 'verify', 220, 20))
        this.nodes.push(new WorkflowNode('Finish', 'finish'))
        this.nodes.push(new WorkflowNode('Test3', 'test3'))
        this.nodes.push(new WorkflowNode('Test4', 'test4'))

        this.connections.push({
            from: this.nodes[0],
            to: this.nodes[1],
            title: 'Start',
            fromSide: 'right',
            toSide: 'left',
            color: 'navy'
        })
        //
        // this.connections.push({
        //     from: this.nodes[0],
        //     to: this.nodes[2],
        //     fromSide: 'bottom',
        //     toSide: 'left'
        // })
        //
        // this.connections.push({
        //     from: this.nodes[2],
        //     to: this.nodes[3],
        //     fromSide: 'right',
        //     toSide: 'left',
        // })
        //
        // this.connections.push({
        //     from: this.nodes[3],
        //     to: this.nodes[4],
        //     fromSide: 'right',
        //     toSide: 'bottom',
        // })
        //
        // this.connections.push({
        //     from: this.nodes[4],
        //     to: this.nodes[1],
        //     fromSide: 'right',
        //     toSide: 'bottom',
        // })


    }

    saveCurrent() {
        localStorage.setItem('nodes', JSON.stringify(this.nodes));
        localStorage.setItem('connections', JSON.stringify(this.connections));
    }

    fetchNodes() {
        this.nodes = JSON.parse(localStorage.getItem('nodes')) || this.nodes;
        this.connections = JSON.parse(localStorage.getItem('connections')) || this.connections;
    }

    reset() {
        localStorage.removeItem('nodes')
        localStorage.removeItem('connections')
    }


}
