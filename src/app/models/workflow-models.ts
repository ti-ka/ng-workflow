import { Input } from '@angular/core';

export class WorkflowNode {
    id?: number | string;
    title: string;
    x?: number;
    y?: number;
    click?: (WorkflowNode) => void;

    constructor(title: string, id: number | string = null, x? : number, y?: number) {
        this.title = title;
        this.id = id
        this.x = x;
        this.y = y;
    }

}

export class WorkflowConnection {
    from: WorkflowNode;
    to: WorkflowNode;
    title?: string;
    fromSide?: 'top' | 'left' | 'bottom' | 'right' = 'right';
    toSide?: 'top' | 'left' | 'bottom' | 'right' = 'left';
    color?: string;
    click?: (Connection) => void;
}

export class XYCoordinates {
    x : number;
    y : number;
    width?: number;
    angle?: number;
    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

export class Workflow {

    nodes: WorkflowNode[];
    connections: WorkflowConnection[];

    @Input() allowCircular = false;
    draggable = true;

    creatingConnection: WorkflowConnection;

    startCreatingConnection(fromSide: 'top' | 'left' | 'bottom' | 'right' = 'right', fromNode: WorkflowNode) {
        this.creatingConnection = new WorkflowConnection();
        this.creatingConnection.fromSide = fromSide;
        this.creatingConnection.from = fromNode;
        this.draggable = false;
    }

    finishCreatingConnection(toSide: 'top' | 'left' | 'bottom' | 'right' = 'right', toNode: WorkflowNode) {

        const newConnection = Object.assign(new WorkflowConnection(), this.creatingConnection);

        newConnection.toSide = toSide;
        newConnection.to = toNode;

        if (newConnection.from.title || newConnection.to.title) {
            newConnection.title = `${newConnection.from.title} to ${newConnection.to.title}`
        }

        if (newConnection.from === newConnection.to) {
            console.warn('Cannot move from same node to same node.');
            return;
        }

        if (!this.allowCircular) {
            // See if a connection exists from newConnection.to & newConnection.from
            const circular = this.connections.find(c => c.from == newConnection.to && c.to == newConnection.from);
            if (circular) {
                console.warn('Circular dependency detected. If this was intended, set [allowCircular]="true".');
                this.discardCurrentConnection();
                return;
            }
        }

        this.connections.push(newConnection);
        this.discardCurrentConnection();
    }

    discardCurrentConnection() {
        this.creatingConnection = null;
        this.draggable = true;
    }

    deleteNode(node: WorkflowNode) {
        const index = this.nodes.indexOf(node);
        if (index >= 0) {
            // First delete connections to and from node:
            this.connections.filter(c => c.from == node || c.to == node).forEach(c => this.deleteConnection(c));
            this.nodes.splice(index, 1);
        }
    }

    deleteConnection(connection: WorkflowConnection) {
        console.log(connection);
        const index = this.connections.indexOf(connection);
        if (index >= 0) {
            this.connections.splice(index, 1);
        }
    }

}