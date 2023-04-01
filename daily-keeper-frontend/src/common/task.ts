export class Task {

    constructor(public id: string,
                public content: string,
                public date: Date,
                public tag_id: number,
                public is_done: boolean = false,
                public is_urgent: boolean = false,
                public is_important: boolean = false) {}

}