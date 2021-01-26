type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;  //数据类型
    createAt?: Date  // | undefined;  类/构造函数 或写成 createAt?: Date
}

type Tag = {
    id: string;
    name: string;
}
type TagsListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'  //联合类型
    update: (id:string,name:string) => 'success' | 'not found' |'duplicated'
    remove: (id:string) => boolean
    save: () => void
}

interface window {
    tagList: Tag[]
}