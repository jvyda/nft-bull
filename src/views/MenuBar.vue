<template lang="">
  <el-row>
    <el-col :span="24" class="navbar__menu-box">
      <ul class="el-menu el-menu--horizontal navbar__menu">
        <li class="el-menu-item app-menu-icons close" @click="closeWindow">
          <i class="el-icon-close"></i>
        </li>

        <li
          class="el-menu-item app-menu-icons maximize"
          @click="maximizeWindow"
        >
          <i class="el-icon-full-screen"></i>
        </li>
        <li
          class="el-menu-item app-menu-icons minimize"
          @click="minimizeWindow"
        >
          <i class="el-icon-minus"></i>
        </li>
        <li class="el-menu-item app-menu-icons save" @click="saveFile">
          <i class="el-icon-download"></i>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Getter, Mutation } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { remote, ipcRenderer } from "electron";
const dialog = remote.dialog;
const WIN = remote.getCurrentWindow();
@Component({
  components: {},
})
export default class MenuBar extends Vue {
  @Getter('defaultDirectory') defaultDirectory: any
  maximizeWindow() {
    if (remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().unmaximize();
    } else {
      remote.getCurrentWindow().maximize();
    }

    // remote.getCurrentWindow().maximize();
  }
  closeWindow() {
    remote.getCurrentWindow().close();
  }
  minimizeWindow() {
    remote.getCurrentWindow().minimize();
  }
  saveFile() {
    let options = {
      //Placeholder 1
      title: "Save file - Jay's NFT Editor",

      //Placeholder 2
      defaultPath: this.defaultDirectory,

      //Placeholder 4
      buttonLabel: "Save File",

      //Placeholder 3
      filters: [
        { name: "Custom File Type", extensions: ["jnft"] },
        { name: "All Files", extensions: ["*"] },
      ],
    };
    console.log(options)
    // let filename = dialog.showSaveDialog(WIN, options)
  }
}
</script>
<style lang="scss">
.editor {
  .el-menu {
    background-color: #050b19;
    background: linear-gradient(0deg, #0c1323, #182440);

    &.el-menu--horizontal {
      border-bottom-color: #121d35;
      .el-menu-item {
        height: 20px;
        line-height: 20px;
        &.app-menu-icons {
          border-radius: 50px;
          border: 1px solid;
          padding: 0;
          width: 15px;
          height: 15px;
          margin: 5px;
          display: flex;
          float: right;
          &.close {
            border-color: #ce5347;
            background-color: #ed6a5e;
          }
          &.maximize {
            border-color: #d6a243;
            background-color: #f6be4f;
          }
          &.minimize {
            border-color: #58a942;
            background-color: #62c554;
          }
          &.save {
            border-color: #58a942;
            background-color: #62c554;
          }
          i {
            color: #ffffff;
            font-size: 11px;
            width: 11px;
            height: 11px;
            margin: 0;
            padding: 0;
            margin: 0;
            position: absolute;
            margin-top: 1px;
            margin-left: 1px;
          }
        }
      }
    }
  }
}
</style>
