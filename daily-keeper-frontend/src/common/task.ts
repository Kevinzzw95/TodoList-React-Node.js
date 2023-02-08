export class Task {

    constructor(public id: string,
                public content: string,
                public date: Date,
                public tagId: number,
                public done: boolean = false,
                public urgent: boolean = false,
                public important: boolean = false) {}

}