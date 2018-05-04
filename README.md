# Angular workflow

A simple and powerful engine for creating workflow in angular

![alt text](https://raw.githubusercontent.com/PAHADIx/ng-workflow/master/preview.png)


* Note: This library is a work in progress. To contribute email: tika.pahadi@selu.edu

Usage:
```
<ng-workflow
        [lineColor]="'navy'"
        [nodes]="nodes"
        [connections]="connections"></ng-workflow>
```

Nodes is a collection of `WorkflowNode` object and connections is a collection of collection of `Conenction` object.


```
export class WorkflowNode {
    id?: number | string;
    title: string;
    x?: number;
    y?: number;
}

export class Connection {
    from: WorkflowNode;
    to: WorkflowNode;
    title?: string;
    fromSide?: 'top' | 'left' | 'bottom' | 'right' = 'right';
    toSide?: 'top' | 'left' | 'bottom' | 'right' = 'left';
    color?: string;
}
```

