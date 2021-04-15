<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        <div>
          {{ tag.name }}
        </div>
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import tagStore from '@/store/tagStore';

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  // pictureList: string[] = ['衣','食','住','行'];
  // pictureName: string[] =  ['clothes','food','house','car'];
  // pictureView: string[] = [];
  // picture(){
  //   for (let i=0;i<this.$store.state.tagList.length;i++){
  //     const index2 = this.pictureList.indexOf(this.$store.state.tagList[i].name);
  //     if (index2>=0){
  //       this.pictureView.push(this.pictureName[index2]);
  //     }else {
  //       this.pictureView.push('default');
  //     }
  //   }
  // }


  beforePicture(){
    this.$store.commit('picture');
  }


  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #D9D9D9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>