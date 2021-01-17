<template>
    <Layout class-prefix="layout">
      {{record}}
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
      <Types :value.sync="record.type"  />
      <Notes @update:value="onUpdateNotes"/>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component,Watch} from 'vue-property-decorator';

const version = window.localStorage.getItem('version','0.0.1') || '0';
const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
if (version === '0.0.1'){
  //数据迁移/数据库升级
  recordList.forEach(record =>{
    record.createAt = new Date(2020,0,1);
  });
  window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
}
window.localStorage.setItem('version','0.0.2');

type Record = {
  tags: string[];
  notes: string[];
  type: string;
  amount: number;  //数据类型
  createAt: Date | undefined;  //类/构造函数 或写成 createAt?: Date
}

@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags = ['衣','食','住','行'];
  record: Record = recordList;
  recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
  onUpdateTags(value: string[]){
    this.record.tags = value;
  }
  onUpdateNotes(value: string[]){
    this.record.notes = value;
  }
  saveRecord(){
    const record2: Record =JSON.parse(JSON.stringify((this.record)));
    record2.createAt = new Date();
    this.recordList.push(record2);
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
  }
}
</script>
<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>