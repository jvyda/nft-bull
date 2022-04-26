<template lang="">
  <el-dialog
    :append-to-body="true"
    title="Outer Dialog"
    :visible.sync="showDialog"
    width="80%"
    :close="dialogClosed"
  >
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, key) in nftDataGetter"
        :key="key"
        :label="item.trait"
        :name="item.trait"
        >
        
        <div class="dialog-preview-image">
            <div v-html=""
        </div>
        
        </el-tab-pane
      >
    </el-tabs>
  </el-dialog>
</template>
<script lang="ts">
import { Getter, Mutation } from "vuex-class";
import { Component, Vue, PropSync, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class LayersDialog extends Vue {
  @Getter("nftDataGetter") nftDataGetter: any;
  // @Prop('allNftLayersDialog', { type: Boolean }) syncedName!: Boolean
  // @PropSync('allNftLayersDialog', { type: Boolean }) syncedName!: boolean
  @Prop() allNftLayersDialog!: boolean;
  activeTab = "body";
  get showDialog() {
    return this.allNftLayersDialog;
  }
  set showDialog(value){
      this.$emit('dialogVisibility', false)
  }
  handleClick(tab, event) {
    console.log(tab, event);
  }
}
</script>
<style lang="scss">
.dialog-preview-image{
    width: 180px;
    height: 180px;
    border: 1px solid #dadada;
}</style>
