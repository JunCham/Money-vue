const localStorageKeyName = 'tagsList';
type TagsListModel = {
    data: string[]
    fetch: () => string[]
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
        if (this.data.indexOf(name) >= 0){ return 'duplicated'};
        this.data.push(name);
        this.save();
        return 'success';
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
};
export default tagsListModel;