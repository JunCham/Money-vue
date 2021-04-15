import Vue from 'vue';
import  Component from  'vue-class-component';

const map: {[key: string]: string} = {
    'tag name duplicated' : '标签名重复'
}

@Component
export class TagHelper extends Vue{
    createTag(){
      const name = window.prompt(' 请输入标签名 ');
      if (!name) {return window.alert('标签名不能为空');}
      this.$store.commit('createTag',name);
      if (this.$store.state.createTagError) {
          window.alert(map[this.$store.state.createdTagError.message] || '未知错误');
      }
    }
    createTag2(){
        const name2 = window.prompt(' 请输入标签名 ');
        if (!name2) {return window.alert('标签名不能为空');}
        this.$store.commit('createTag2',name2);
        if (this.$store.state.createTagError) {
            window.alert(map[this.$store.state.createdTagError.message] || '未知错误');
        }
    }
}

export default TagHelper;