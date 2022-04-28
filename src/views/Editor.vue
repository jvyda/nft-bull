<template>
  <div class="editor">
    <MenuBar />
    <el-container>
      <el-container>
        <div v-if="baseModel.length > 0">
          <div
            class="svgholder"
            v-for="(item, key) in baseModel"
            :key="key"
            v-html="item.svg"
            :id="makeSvgClassName(item.trait)"
          ></div>
        </div>
        <div v-else>Add NFT Layers</div>
      </el-container>

      <el-aside width="240px" class="editor-sidebar">
        <el-button
          size="small"
          @click="allNftLayersDialog = true"
          type="primary"
          style="margin-left: 16px"
        >
          Add Layer
        </el-button>

        <draggable v-model="myList">
          <div v-for="(element, key) in myList" :key="key" class="layer-sortable">
            <div class="layer-sort-name">{{ element.trait }}</div>
            <div class="remove-layer"><i class="el-icon-delete"></i></div>
          </div>
        </draggable>
        <!-- <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            :title="item.trait"
            :name="item.trait"
            v-for="(item, key) in baseModel"
            :key="key"
          >
          </el-collapse-item>
        </el-collapse> -->
      </el-aside>
    </el-container>
    <AllLayersDialog
      @dialogVisibility="captureVisibility"
      :allNftLayersDialog="allNftLayersDialog"
    ></AllLayersDialog>
  </div>
</template>
<script lang="ts">
import { Getter, Mutation } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { remote, ipcRenderer } from "electron";
import MenuBar from "@/views/MenuBar.vue";
import AllLayersDialog from "@/views/AllLayersDialog.vue";
import draggable from 'vuedraggable'

@Component({
  components: {
    MenuBar,
    AllLayersDialog,
    draggable
  },
})
export default class Editor extends Vue {
  @Getter("nftDataGetter") nftDataGetter: any;
  @Getter("layerOrder") layerOrder: any;
  @Getter("baseModel") baseModel: any;
  @Mutation("sortLayers") sortLayers;
  activeName = "body";
  allNftLayersDialog = false;

  get layerOrderExists() {
    return this.layerOrder.length ? true : false;
  }
  captureVisibility(message) {
    this.allNftLayersDialog = message;
  }
  getSvgFromArray(item) {
    // console.log(item)
  }
  makeSvgClassName(name) {
    return name.toString().replace(/\s/g, "-").toLowerCase().trim();
  }
  get myList(){
    return this.baseModel
  }
  set myList(value){
     this.sortLayers(value)
  }
}
</script>
<style lang="scss">
.editor-sidebar {
  width: 240px;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 27px;
  background: #070a10;
  box-shadow: -9px 3px 10px #00000073;
  border-left: 1px solid #101623;
  .el-collapse-item {
    .el-collapse-item__header {
      border-bottom-color: #0f172a;
      color: #ffffff;
      background-color: #070a10;
    }
    .el-collapse-item__wrap {
      border-bottom-color: #0f172a;
    }
    .el-collapse-item__content {
      background-color: #101623;
    }
  }
  .el-collapse {
    border-top: none;
    border-bottom: none;
    height: 100%;
  }
}
.svgholder {
  position: absolute;
  width: 800px;
  height: 800px;
  left: calc((100% - 800px - 240px) / 2);
  svg {
    max-width: 100%;
    max-height: 100%;
  }
}
.layer-sortable{
  display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  .layer-sort-name{
    .remove-layer{

    }
  }
}
</style>
