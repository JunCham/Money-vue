type RootState = {
    recordList: RecordItem[],
    createRecordError: Error | null,
    createTagError: Error | null,
    tagList: Tag[],
    currentTag?: Tag
}

type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;  //数据类型
    createdAt?: string  // | undefined;  类/构造函数 或写成 createAt?: Date
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
    // store: {
    //     tagList: Tag[];
    //     createTag: (name:string) =>coid;
    //     findTag: (id:string) => Tag | undefined;
    //     removeTag: (id: string) => boolean;
    //     updateTag: TagsListModel['update'];  //跟上面 TagsListModel 一样所以可以简写成这样
    //     recordList: RecordItem[];
    //     createRecord:(record:RecordItem)=> void;
    // }
}