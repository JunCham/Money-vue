<template>
    <Layout class-prefix="layout">
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
import {recordListModel} from '@/models/recordListModel';
import tagsListModel from '@/models/tagsListModel';

const version = window.localStorage.getItem('version','0.0.1') || '0';

const recordList = recordListModel.fetch();
const tagsList = tagsListModel.fetch();

if (version === '0.0.1'){
  //数据迁移/数据库升级
  recordList.forEach(record =>{
    record.createAt = new Date(2020,0,1);
  });
  window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
}
window.localStorage.setItem('version','0.0.2');



@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags = tagsList;
  record: RecordItem = recordList;
  recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
  onUpdateTags(value: string[]){
    this.record.tags = value;
  }
  onUpdateNotes(value: string[]){
    this.record.notes = value;
  }
  saveRecord(){
    const record2: RecordItem =recordListModel.clone(this.record);
    record2.createAt = new Date();
    this.recordList.push(record2);
  }
  @Watch('recordList')
  onRecordListChange(){
    recordListModel.save(this.recordList);
  }
}
</script>
<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>