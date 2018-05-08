import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Workflow, WorkflowNode } from '../../models/workflow-models';

@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

    xOffset = 0;
    yOffset = 0;

    @Input() node: WorkflowNode;
    @Input() container;
    @Input() gridSize = 1;

    @Input() workflow: Workflow;

    @ViewChild('nodeView') nodeViewRef;

    constructor() { }

    ngOnInit() {
        this.xOffset = this.node.x || 0;
        this.yOffset = this.node.y || 0;
    }

    onMove(e) {
        if (this.workflow.draggable) {
            this.node.x = e.x;
            this.node.y = e.y;
        }
    }

    onRelease(e) {
        // Snap to grid on release
        if (this.workflow.draggable) {
            // this.node.x = Math.floor(this.node.x/this.gridSize) * this.gridSize;
            // this.node.y = Math.floor(this.node.y/this.gridSize) * this.gridSize;
        }
    }

    connectorSelected(event) {
        this.workflow.startCreatingConnection(this.sideOf(event.target), this.node);
    }

    connectorReleased(event) {
        this.workflow.finishCreatingConnection(this.sideOf(event.target), this.node);
    }

    sideOf(target: HTMLElement) : 'top' | 'left' | 'bottom' | 'right' {
        const sideClass = Array.from(target.classList).find(cl => cl.toString().indexOf('connector-') === 0);
        if (sideClass) {
            const side = sideClass.toString().replace('connector-','');
            if (['top', 'left', 'right', 'bottom'].indexOf(side) >= 0) {
               return side as 'top' | 'left' | 'right' | 'bottom';
            }
        }
    }

}
