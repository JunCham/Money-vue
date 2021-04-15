
import createId from '@/lib/createId';

const localStorageKeyName = 'tagsList';
const tagStore = {
    //tag store
    tagList: [] as Tag[],

    pictureList: ['衣','食','住','行'],
    pictureName: ['clothes','food','house','car'],
    pictureView: [] as string[],

    picture(){
        for (let i=0;i<this.tagList.length;i++){
            const names = this.tagList.map(item => item.name);
            const index2 = this.pictureList.indexOf(names[i]);
            if (index2>=0){
                this.pictureView.push(this.pictureName[index2]);
            }else {
                this.pictureView.push('default');
            }
        }
        return this.pictureView;
    },

    fetchTags(){
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.tagList;
    },

    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag(name :string){
        const names = this.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0){
            window.alert('标签名重复');
            return 'duplicated'
        }
        const id = createId().toString();
        this.tagList.push({id, name: name});
        this.saveTags();
        window.alert('添加成功');
        return 'success';
    },
    removeTag(id: string){
        let index = -1;
        for (let i = 0;i<this.tagList.length;i++){
            if (this.tagList[i].id === id){
                index = i;
                break;
            }
        }
        this.tagList.splice(index,1);
        this.saveTags();
        return true;
    },
    updateTag(id: string,name: string){
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) >=0){
            const names = this.tagList.map(item => item.name)
            if (names.indexOf(name) >=0){
                return 'duplicated'
            }else{
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                tag.id = name;
                this.saveTags()
            }
        }else {
            return 'not found'
        }
    },
    saveTags(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    },
};

tagStore.fetchTags();

export default tagStore;