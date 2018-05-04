import { Component, Input, OnInit } from '@angular/core';
import { XYCoordinates } from '../../models/workflow-models';

@Component({
    selector: 'app-poly-line',
    templateUrl: './svg-line.component.html',
    styleUrls: ['./svg-line.component.scss']
})
export class RectangularPolyLine implements OnInit {

    @Input() from: XYCoordinates;
    @Input() to: XYCoordinates;
    @Input() fromSide: string = 'left';
    @Input() toSide: string = 'right';
    @Input() title: string;
    @Input() lineColor: string;
    @Input() lineWidth = 2;
    @Input() gridSize = 1;
    @Input() offset = 20;
    titleCoordinates: XYCoordinates;

    points = [];

    constructor() {
    }

    ngOnInit() {
        this.createPoints(
            this.offset,
            this.from.x,
            this.from.y,
            this.to.x,
            this.to.y
        );
    }


    get xy() {
        this.createPoints(this.offset,
            this.from.x,
            this.from.y,
            this.to.x,
            this.to.y);
        return this.from.x + this.from.y + this.to.x + this.to.y;
    }

    addPoint(point: XYCoordinates) {
        const x = Math.floor(point.x/this.gridSize) * this.gridSize;
        const y = Math.floor(point.y/this.gridSize) * this.gridSize;
        this.points.push(x, y);
    }

    get polyLine(): string {
        return `
                <polyline 
                    stroke-linejoin="round"
                    points="${this.points.join(',')}"
                    stroke="${this.lineColor}"
                    stroke-width="${this.lineWidth}"
                    fill="none" />
                    
                ${this.textLabel}
                ${this.pointingArrow}
            `
        ;
    }


    createPoints(offset, xStart, yStart, xEnd, yEnd) {

        let xOffsetStart = xStart;
        let yOffsetStart = yStart;
        let xOffsetEnd = xEnd;
        let yOffsetEnd = yEnd;


        if (this.fromSide == 'bottom') {
            yOffsetStart += offset;
        }
        if (this.fromSide == 'top') {
            yOffsetStart -= offset;
        }
        if (this.fromSide == 'left') {
            xOffsetStart -= offset;
        }
        if (this.fromSide == 'right') {
            xOffsetStart += offset;
        }

        if (this.toSide == 'bottom') {
            yOffsetEnd += offset;
        }
        if (this.toSide == 'top') {
            yOffsetEnd -= offset;
        }
        if (this.toSide == 'left') {
            xOffsetEnd -= offset;
        }
        if (this.toSide == 'right') {
            xOffsetEnd += offset;
        }

        // console.log(this.fromSide, this.toSide, xStart, yStart, xEnd, yEnd)
        // console.log(this.fromSide, this.toSide, xOffsetStart, yOffsetStart, xOffsetEnd, yOffsetEnd)

        this.points = [];
        // Move offset to from the source
        this.addPoint(new XYCoordinates(xStart, yStart));
        this.addPoint(new XYCoordinates(xOffsetStart, yOffsetStart));

        // The center piece
        const center = this.createCenterPoint(
            xStart, yStart, xEnd, yEnd,
            xOffsetStart, yOffsetStart, xOffsetEnd, yOffsetEnd);

        this.addPoint(center);
        this.titleCoordinates = this.midPoint(center, new XYCoordinates(xOffsetEnd, yOffsetEnd));

        // Move offset pixels to the destination
        this.addPoint(new XYCoordinates(xOffsetEnd, yOffsetEnd));
        this.addPoint(new XYCoordinates(xEnd, yEnd));
    }

    midPoint(a: XYCoordinates, b: XYCoordinates): XYCoordinates {
        return new XYCoordinates(
            Math.abs((b.x+a.x)/2),
            Math.abs((b.y+a.y)/2)
        )
    }

    createCenterPoint(xStart, yStart, xEnd, yEnd,
                       xOffsetStart, yOffsetStart, xOffsetEnd, yOffsetEnd): XYCoordinates {

        let slope = Math.atan((yOffsetEnd-yOffsetStart)/(xOffsetEnd-xOffsetStart)) * 180 / Math.PI;

        // console.log(slope);

        if (slope >= 0) {
            return new XYCoordinates(xOffsetStart, yOffsetEnd);
        } else  {
            return new XYCoordinates(xOffsetStart, yOffsetEnd);
        }

    }

    public get pointingArrow() {

        let points = [0,0,0,0,0,0];
        if (this.toSide == 'left') {
            points = [0,0,10,5,0,10];
        } else if (this.toSide == 'top') {
            points = [0,0,10,0,5,10];
        } else if (this.toSide == 'bottom') {
            points = [5,0,10,10,0,10];
        } else if (this.toSide == 'right') {
            points = [10,0,0,5,10,10];
        }

        return `
            <polygon 
                class="triangle triangle-${this.toSide}"
                fill="${this.lineColor}"
                points="
                    ${this.roundTo(this.to.x) + points[0]} ${this.roundTo(this.to.y) + points[1]},
                    ${this.roundTo(this.to.x) + points[2]} ${this.roundTo(this.to.y) + points[3]},
                    ${this.roundTo(this.to.x) + points[4]} ${this.roundTo(this.to.y) + points[5]}" />`
    }

    public get textLabel() {

        if (this.title == undefined)  return '';

        const fontSize = 12;
        // Move the text a little left so that it is centered:
        // https://www.lifewire.com/aspect-ratio-table-common-fonts-3467385
        this.titleCoordinates.x -= fontSize*.45*(this.title.length/2);

        return `
                    <text 
                        font-size="${fontSize}"
                        x="${this.titleCoordinates.x - 5}" 
                        y="${this.titleCoordinates.y - 5}"
                        fill="${this.lineColor}">${this.title}</text>`
    }

    roundTo(n) {
        return Math.round(n/this.gridSize) * this.gridSize;
    }

}
