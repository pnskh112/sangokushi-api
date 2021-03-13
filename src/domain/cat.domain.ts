export class Cat {
    public readonly id: number;
    public readonly name?: string

    constructor(params: {
        id: number;
        name?: string;
    });
    constructor(params: {
        id: number;
        name: string;
    })
    {
        this.id = params.id;
        this.name = params.name;
    }
}