<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">-</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="remove">删除</button>
      <button @click="clear">清空</button>
      <button @click="ok" class="ok">OK</button>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();
  
  inputContent(event: MouseEvent){
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    if (this.output.length === 16){return;}
    if(this.output === '0'){
      if('0123456789'.indexOf(input)>=0){
        this.output = input;
      }else{
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.')>=0 && input === '.'){
      return;
    }
    this.output += input;
  }
  remove(){
    if (this.output.length === 1){
      this.output = '0';
    }else {
      this.output = this.output.slice(0,-1);
    }
  }
  clear(){
    this.output = '0';
  }
  ok(){
    let sth = 0;
    if(this.output.indexOf('+') >0 || this.output.indexOf('-') > 0){
      const number1 = this.output.replace(/[^-()\d/*+.]/g, '');
      const XXX = eval(number1);
      sth += XXX;
    } else {
      const YYY = parseFloat(this.output);
      sth += YYY;
    }
    const number = sth;
    this.$emit('update:value',number);
    this.$emit('submit',number);
    this.output = '0';
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
    background: #f2f2f2;
  }

  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 64px;
        width: 25%;
        float: right;
      }

      &.zero {
        width: 25%;
      }

      $bg: #f2f2f2;
      $bg2: rgba(234,250,245);
      &:nth-child(1) {
        background: $bg2;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg2, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg2, 4*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) , &:nth-child(13){
        background: darken($bg2, 4*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(14) {
        background: darken($bg2, 4*4%);
      }

      &:nth-child(12), &:nth-child(15){
        background: darken($bg2, 4*5%);
      }

      &:nth-child(16) {
        background: darken($bg2, 4*6%);
      }

      &:nth-child(17) {
        background: darken($bg2, 4*7%);
      }
    }
  }
}
</style>