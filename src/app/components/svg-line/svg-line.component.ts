import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-svg-line',
    templateUrl: './svg-line.component.html',
    styleUrls: ['./svg-line.component.scss']
})
export class SvgLineComponent implements OnInit {

    @Input() toSide: string = 'right';
    @Input() lineColor: string;
    @Input() lineWidth = 2;
    @Input() gridSize = 1;
    @Input() offset = 20;
    @Input() points = [];

    constructor() {
    }

    ngOnInit() {
    }


    get polyLine(): string {
        return `
                <polyline 
                    stroke-linejoin="round"
                    points="${this.pointsCsv}"
                    stroke="${this.lineColor}"
                    stroke-width="${this.lineWidth}"
                    fill="none" />
                    ${this.pointingArrow}
            `
        ;
    }

    get pointsCsv() {
        const pts = [];
        this.points.forEach(v => {
            pts.push(v.x);
            pts.push(v.y);
        })
        return pts.join(',');
    }

    snap(x: number) {
        // Note: Previously used to snap to grid.
        // return Math.round(x/this.gridSize) * this.gridSize;
        return x;
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

        const endpoint = this.points[this.points.length - 1];

        return `
            <polygon 
                class="triangle triangle-${this.toSide}"
                fill="${this.lineColor}"
                points="
                    ${this.snap(endpoint.x) + points[0]} ${this.snap(endpoint.y) + points[1]},
                    ${this.snap(endpoint.x) + points[2]} ${this.snap(endpoint.y) + points[3]},
                    ${this.snap(endpoint.x) + points[4]} ${this.snap(endpoint.y) + points[5]}" />`
    }


}
