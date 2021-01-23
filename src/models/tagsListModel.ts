const localStorageKeyName = 'tagsList';
type Tag = {
    id: string;
    name: string;
}
type TagsListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'  //联合类型
    save: () => void
}

const tagsListModel: TagsListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data;
    },
    create(name) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0){ return 'duplicated'};
        this.data.push({id: name,name: name});
        this.save();
        return 'success';
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
};
export default tagsListModel;