<template lang="">
  <el-drawer
    :withHeader="false"
    :visible.sync="showDialog"
    :modal="true"
    :append-to-body="true"
    direction="btt"
    class="svg-drawer"
  >
    <el-tabs v-model="activeTab" @tab-click="handleClick">
     
      <el-tab-pane
        v-for="(item, key) in nftDataGetter"
        :key="key"
        :label="item.trait"
        :name="item.trait"
        class="svg-tab-pane"
      >
        <div
          class="dialog-preview-image"
          v-for="(itemObj, key) in traitLayers.filesdata"
          :key="key"
          @click="insertLayerToCanvas(itemObj, item.trait)"
        >
          <i-frame class="image-frame">
            <div v-html="itemObj.svg" class="svg-image"></div>
          </i-frame>
          <div class="layername">{{ itemObj.name }}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>

  <!-- 
  <el-dialog
    :append-to-body="true"
    title="Outer Dialog"
    :visible.sync="showDialog"
    width="80%"
  >
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, key) in nftDataGetter"
        :key="key"
        :label="item.trait"
        :name="item.trait"
        class="svg-tab-pane"
      >
        <div
          class="dialog-preview-image"
          v-for="(itemObj, key) in traitLayers.filesdata"
          :key="key" @click="insertLayerToCanvas(itemObj, item.trait)"
        >
       
          <i-frame class="image-frame">
            <div v-html="itemObj.svg" class="svg-image"></div>
          </i-frame>
          <div class="layername">{{itemObj.name}}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog> -->
</template>
<script lang="ts">
import { Getter, Mutation } from "vuex-class";
import { Component, Vue, PropSync, Prop } from "vue-property-decorator";

const cloneDeep = require("clone-deep");
import "@/components/iframe.js";
@Component({
  components: {
    
  },
})
export default class LayersDialog extends Vue {
  @Getter("nftDataGetter") nftDataGetter: any;
  // @Prop('allNftLayersDialog', { type: Boolean }) syncedName!: Boolean
  // @PropSync('allNftLayersDialog', { type: Boolean }) syncedName!: boolean
  @Mutation("addLayerToBaseModel") addLayerToBaseModel;
  
  
  @Prop() allNftLayersDialog!: boolean;
  activeTab = "Body";
  traitLayers = [];
  get showDialog() {
    return this.allNftLayersDialog;
  }
  set showDialog(value) {
    this.$emit("dialogVisibility", false);
  }
  handleClick(tab, event) {
    this.selectedTraitLayers();
  }
  selectedTraitLayers() {
    const array = cloneDeep(this.nftDataGetter);
    const list = array.filter((item) => {
      return item.trait == this.activeTab;
    });
    this.traitLayers = list[0];
  }
  insertLayerToCanvas(item, trait) {
    this.addLayerToBaseModel({ item, trait });
    this.$nextTick(() => {
      this.buildObjectOfLayerStyles(trait);
    });
  }
  mounted() {
    this.activeTab = cloneDeep(this.nftDataGetter)[0].trait;
  }
  getStyleClassesOfinsertedLayer(layerName: string) {
    return layerName.match(
      /(?:[\.]{1})([a-zA-Z_]+[\w-_]*)(?:[\s\.\,\{\>#\:]{0})/gim
    );
  }
  getAssociatedStyles(divId) {
    // console.log(window.getComputedStyle(document.querySelector(divId)));
    // window.getComputedStyle(document.querySelector(divId)).cssText;
    const obj =  getComputedStyle(document.querySelector(divId))
    if(obj){
return {fill: obj.fill, stroke:obj.stroke}
    }
    else{
      return {}
    }
    
  }
  buildObjectOfLayerStyles(trait) {
    const cleaUpIdName = trait
      .toString()
      .replace(/\s/g, "-")
      .toLowerCase()
      .trim();
    let selectInsertedLayer: any = document.getElementById(cleaUpIdName);
    let getStyles: any =
      selectInsertedLayer.getElementsByTagName("style")[0].innerHTML;
    const stylesArray: any = this.getStyleClassesOfinsertedLayer(getStyles);
    let buildStylesArray: any = [];
    var newObj: any = {};
    stylesArray.forEach((item) => {
      newObj.name = item;
      newObj.styles = this.getAssociatedStyles(item);
      // console.log(this.getAssociatedStyles("." + cleaUpIdName))
      //  newObj.styles =
    });
    buildStylesArray.push(newObj)
    console.log(buildStylesArray)
  }
}
</script>
<style lang="scss">
.dialog-preview-image {
  width: 100px;
  height: 120px;
  border: 1px solid #dadada;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  float: left;
  margin: 10px;
  .layername {
    text-align: center;
    font-size: 10px;
    font-weight: 600;
  }
  &:hover {
    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
  }
}
.image-frame {
  width: 100px;
  height: 100px;
  padding: 0;
  margin: 0;
  border: none;
  pointer-events: none;
}
// .svg-tab-pane {
//   display: grid;
//   -moz-column-gap: 10px;
//   column-gap: 10px;
//   row-gap: 10px;
//   grid-template-columns: auto auto auto auto auto;
// }
.svg-drawer {
  padding: 0 10px;
}
</style>
