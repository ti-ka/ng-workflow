export class WorkflowNode {
    id?: number | string;
    title: string;
    x?: number;
    y?: number;

    constructor(title: string, id: number | string = null, x? : number, y?: number) {
        this.title = title;
        this.id = id
        this.x = x;
        this.y = y;
    }

}

export class Connection {
    from: WorkflowNode;
    to: WorkflowNode;
    title?: string;
    fromSide?: 'top' | 'left' | 'bottom' | 'right' = 'right';
    toSide?: 'top' | 'left' | 'bottom' | 'right' = 'left';
    color?: string;
}

export class XYCoordinates {
    x : number;
    y : number;
    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

export class Workflow {

    nodes: WorkflowNode[];
    connections: Connection[];

    draggable = true;

    creatingConnection: Connection;

    startCreatingConnection(fromSide: 'top' | 'left' | 'bottom' | 'right' = 'right', fromNode: WorkflowNode) {
        this.creatingConnection = new Connection();
        this.creatingConnection.fromSide = fromSide;
        this.creatingConnection.from = fromNode;
        this.draggable = false;
    }

    finishCreatingConnection(toSide: 'top' | 'left' | 'bottom' | 'right' = 'right', toNode: WorkflowNode) {
        this.creatingConnection.toSide = toSide;
        this.creatingConnection.to = toNode;

        if (this.creatingConnection.from.title || this.creatingConnection.to.title) {
            this.creatingConnection.title = `${this.creatingConnection.from.title} to ${this.creatingConnection.to.title}`
        }

        if (this.creatingConnection.from === this.creatingConnection.to) {
            console.warn('Cannot move from same node to same node.');
            return;
        }

        this.connections.push(this.creatingConnection);
        this.draggable = true;
    }

    discardCurrentConnection() {
        this.creatingConnection = null;
        this.draggable = true;
    }

}