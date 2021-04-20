<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
          <Icon class="tagIcon" v-bind:name = getIcon(tag.name) />
          <div class="tagName">
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

  get tagList() {
    return this.$store.state.tagList;
  }

  iconName = ['衣','食','住','行'];
  iconMach = ["clothes","food","house","car"];
  iconSet ='';

  getIcon(iconIn: string){
    const iconNumber = this.iconName.indexOf(iconIn);
    let iconSet = '';
    if (iconNumber >= 0){
      iconSet = this.iconMach[iconNumber];
    } else{
      iconSet = "default";
    }
    return iconSet;
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
      position: relative;
      $bg: #D9D9D9;
      $bg2: rgba(254,240,235);
      background: $bg2;//$bg;
      border: 1px solid darken($bg2,20%);
      $h: 48px;
      height: $h;
      width: $h*1.2;
      line-height: $h;
      border-radius: 8px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      > .tagIcon {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.6em;
        margin-left: -1em;
      }
      > .tagName {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -12px;
        margin-left: -18px;
        width: 36px;
        text-align: center;
      }
      &.selected {
        background: darken($bg, 20%);
        color: black;
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