<template>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
      <Tabs :data-source="recordTypeList"
            :value.sync = "record.type"/>
      <div class="notes">
        <FormItem field-name="备注"
                  placeholder="请在这里输入备注"
                  :value.sync = "record.notes"/>
      </div>
      <Tags @update:value = "record.tags = $event"
            v-show="record.type === '-'"
      />
      <Tags @update:value = "record.tags = $event"
            v-show="record.type === '+'"
      />
      <div class="head">小陈的记账本</div>

    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constant/recordTypeList';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tags, FormItem, NumberPad,Tabs},
  // computed: { },  //computed 可以在外部更新值的时候跟着更新数据。
})
export default class Money extends Vue {
  get recordList(){
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = {
    tags:[], notes:'',type:'-',amount:0,
  };

  created(){
    this.$store.commit('fetchRecords'); //create => created 改
  }
  onUpdateNotes(value: string){
    this.record.notes = value;
  }
  saveRecord(){
    if (!this.record.tags || this.record.tags.length === 0){
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord',this.record);
    if (this.$store.state.createRecordError === null){
      window.alert('已保存');
      this.record.notes = '';
    }
  }


}
</script>
<style lang="scss" scoped>
  ::v-deep .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
  .head {
    text-align: center;
    background: darken(rgba(234,250,245),25%);
    height: 36px;
    line-height: 36px;
  }
</style>