<template>
  <div>
    <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
      <li v-for="item in dataSource" :key = "item.value" class="tabs-item"
          :class = "liClass(item)" @click="select(item)"
      >{{item.text}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = {text: string; value: string}    //括号不是逗号？存疑

@Component
export default class Tabs extends Vue{
  @Prop({required: true,type:Array}) dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  // @Prop({type:String,default:'64px'})  //用JS配置height
   // height!: string;
  record: RecordItem = {
    tags:[], notes:'',type:'-',amount:0
  };

  liClass(item: DataSourceItem){
    return {
      [this.classPrefix+'-tabs-item']:this.classPrefix,
      selected: item.value === this.value
    };
  }

  select(item: DataSourceItem){
    this.$emit('update:value', item.value);

  }

}

</script>

<style lang="scss" scoped>
.tabs {
  background: darken(rgba(234,250,245), 4*6%);
  display: flex;
  text-align: center;
  font-size: 24px;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>



