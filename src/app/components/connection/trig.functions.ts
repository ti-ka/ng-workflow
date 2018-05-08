import { WorkflowConnection, WorkflowNode, XYCoordinates } from '../../models/workflow-models';
import { Input } from '@angular/core';

export class TrigFunctions {

    @Input() connection: WorkflowConnection;
    titleCoordinates: XYCoordinates;
    @Input() gridSize = 1;
    @Input() offset = 20;

    snapToCorner(xTop, yTop, width, height, corner): XYCoordinates {

        // Start from the center of the rectangle
        let newXPosition = xTop + width/2;
        let newYPosition = yTop + height/2;

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

    distance(a: XYCoordinates, b: XYCoordinates) {
        return Math.sqrt(Math.pow(b.x-a.x, 2) + Math.pow(b.y-a.y, 2))
    }

    angle(a: XYCoordinates, b: XYCoordinates) {
        return Math.atan((b.y-a.y)/(b.x-a.x));
    }

    midPoint(a: XYCoordinates, b: XYCoordinates): XYCoordinates {
        return new XYCoordinates(Math.abs((b.x+a.x)/2), Math.abs((b.y+a.y)/2));
    }

    endpointCoordinatesForNode(node: WorkflowNode, corner: string): XYCoordinates {
        let width = 0;
        let height = 0;
        const element = Array.from(document.querySelectorAll('.node')).find(x => x.id == node.id) as HTMLElement;
        if (element) {
            width = element.offsetWidth;
            height = element.offsetHeight;
        }
        return this.snapToCorner(node.x, node.y, width, height, corner);
    }

    get points(): XYCoordinates[] {

        if (!this.connection.from || !this.connection.to) {
            return [{x:0, y: 0}];
        }

        const sourceEndpoint = this.endpointCoordinatesForNode(this.connection.from, this.connection.fromSide);
        const destinationEndpoint = this.endpointCoordinatesForNode(this.connection.to, this.connection.toSide);

        let xOffsetStart = sourceEndpoint.x;
        let yOffsetStart = sourceEndpoint.y;
        let xOffsetEnd = destinationEndpoint.x;
        let yOffsetEnd = destinationEndpoint.y;


        if (this.connection.fromSide == 'bottom') {
            yOffsetStart += this.offset;
        }
        if (this.connection.fromSide == 'top') {
            yOffsetStart -= this.offset;
        }
        if (this.connection.fromSide == 'left') {
            xOffsetStart -= this.offset;
        }
        if (this.connection.fromSide == 'right') {
            xOffsetStart += this.offset;
        }

        if (this.connection.toSide == 'bottom') {
            yOffsetEnd += this.offset;
        }
        if (this.connection.toSide == 'top') {
            yOffsetEnd -= this.offset;
        }
        if (this.connection.toSide == 'left') {
            xOffsetEnd -= this.offset;
        }
        if (this.connection.toSide == 'right') {
            xOffsetEnd += this.offset;
        }

        const _points: XYCoordinates[] = [];
        // Move offset to from the source
        this.addPoint(_points, new XYCoordinates(sourceEndpoint.x, sourceEndpoint.y));
        this.addPoint(_points, new XYCoordinates(xOffsetStart, yOffsetStart));

        // The center piece
        const center = this.createCenterPoint(
            sourceEndpoint.x, sourceEndpoint.y, destinationEndpoint.x, destinationEndpoint.y,
            xOffsetStart, yOffsetStart, xOffsetEnd, yOffsetEnd);

        this.addPoint(_points, center);
        this.titleCoordinates = this.midPoint(center, new XYCoordinates(xOffsetEnd, yOffsetEnd));

        // Move offset pixels to the destination
        this.addPoint(_points, new XYCoordinates(xOffsetEnd, yOffsetEnd));

        this.addPoint(_points, new XYCoordinates(destinationEndpoint.x, destinationEndpoint.y));

        // Set width and angle
        _points.forEach((v, i, a) => {
            if (i < a.length - 1) {
                const nextPoint = a[i+1];
                _points[i].width = this.distance(v, nextPoint);
                _points[i].angle = this.angle(v, nextPoint);
            }

        });

        return _points;
    }

    addPoint(points: XYCoordinates[], point: XYCoordinates) {

        points.push({x : point.x, y: point.y});

        // const x = Math.round(point.x/this.gridSize) * this.gridSize;
        // const y = Math.round(point.y/this.gridSize) * this.gridSize;
        // points.push({x : x, y: y});

    }

    createCenterPoint(xStart, yStart, xEnd, yEnd,
                      xOffsetStart, yOffsetStart, xOffsetEnd, yOffsetEnd): XYCoordinates {

        const slope = Math.atan((yOffsetEnd-yOffsetStart)/(xOffsetEnd-xOffsetStart)) * 180 / Math.PI;

        if (slope >= 0) {
            return new XYCoordinates(xOffsetStart, yOffsetEnd);
        } else  {
            return new XYCoordinates(xOffsetStart, yOffsetEnd);
        }

    }



}