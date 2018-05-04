import { Component, Input, OnInit } from '@angular/core';
import { Connection, XYCoordinates, Workflow } from '../../models/workflow-models';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.css']
})
export class ConnectorComponent implements OnInit {

    @Input() workflow: Workflow;
    @Input() connection: Connection;
    @Input() color;
    @Input() width = 2;
    @Input() container: any;
    @Input() gridSize = 1;

    @Input() startCoordinates: XYCoordinates;
    @Input() endCoordinates: XYCoordinates;

    constructor() {
    }

    ngOnInit() {
        this.preparePoints();
    }


    get xy() {
        this.preparePoints();
        let res = 0;
        if (this.connection.from) {
             res += this.connection.from.x + this.connection.from.y;
        }
        if(this.connection.to) {
            res += this.connection.to.x + this.connection.to.y;
        }
        return res;
    }

    preparePoints() {
        if (this.connection.from) {
            const sourceNode = Array.from(document.querySelectorAll('.node')).find(x => x.id == this.connection.from.id) as HTMLElement;
            this.startCoordinates = this.getStartPointForLine(sourceNode, this.connection.fromSide);
        }

        if (this.connection.to) {
            const destinationNode = Array.from(document.querySelectorAll('.node')).find(x => x.id == this.connection.to.id) as HTMLElement;
            this.endCoordinates = this.getStartPointForLine(destinationNode, this.connection.toSide);
        } else {
            if (!this.endCoordinates) {
                this.endCoordinates = {x: this.connection.from.x, y: this.connection.from.y};
                document.addEventListener('mousemove', (ev => {
                    this.setEndPointToCursor(ev)
                }));
            }
        }

    }

    setEndPointToCursor(e,) {
        e = e || window.event;
        var pageX = e.clientX - this.container.offsetLeft;
        var pageY = e.clientY - this.container.offsetTop;
        this.endCoordinates = {x: pageX, y: pageY};
    }

    getStartPointForLine(element: HTMLElement, corner: string): XYCoordinates {
        const topLeftXPosition = element.getBoundingClientRect().left - this.container.offsetLeft;
        const topLeftYPosition = element.getBoundingClientRect().top - this.container.offsetTop;
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        return this.getCoordinateOfCorner(topLeftXPosition, topLeftYPosition, width, height, corner)
    }

    getCoordinateOfCorner(x: number, y: number, width: number, height: number,  corner: string): XYCoordinates {

        // Start from the center of the rectangle
        let newXPosition = x + width/2;
        let newYPosition = y + height/2;

        switch (corner) {
            case 'top':
                newYPosition -= height/2;
                break;

            case 'bottom':
                newYPosition += height/2;
                break;

            case 'left':
                newXPosition -= width/2;
                break;

            case 'right':
                newXPosition += width/2;
                break;

            case 'topLeft':
                newXPosition -= width/2; newYPosition -= height/2;
                break;

            case 'topRight':
                newXPosition += width/2; newYPosition -= height/2;
                break;

            case 'bottomRight':
                newXPosition += width/2; newYPosition += height/2;
                break;

            case 'bottomLeft':
                newXPosition -= width/2; newYPosition += height/2;
                break;

            default:
                break;
        }

        return new XYCoordinates(newXPosition, newYPosition);
    }


}
