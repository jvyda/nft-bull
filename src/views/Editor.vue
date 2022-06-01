<template>
	<div class="editor">
		<!-- <MenuBar /> -->
		<el-container>
			<el-container>
				<div v-if="baseModel.length > 0" style="width:100%; height:100%">
					<div class="svgholder" v-for="(item, key) in baseModel" :key="key" v-html="item.svg" :id="makeSvgClassName(item.trait)"></div>
				</div>
				<div v-else>Add NFT Layers</div>
			</el-container>

			<el-aside width="240px" class="editor-sidebar">
				<el-button size="small" @click="allNftLayersDialog = true" type="primary" style="margin-left: 16px">
					Add Layer
				</el-button>
				<el-button v-if="defaultDirectory ==='' || defaultDirectory===null" icon="el-icon-refresh-right" circle size="mini" type="success" @click="$router.push({ name: 'Home' })"></el-button>
				<draggable v-model="myList">
					<div v-for="(element, key) in myList" :key="key" class="layer-sortable">
						<div class="layer-sort-name">{{ element.trait }}</div>
						<div style="width: 40px; display: flex; align-items: center; justify-content: space-between; padding: 10px;">
							<div class="remove-layer" @click="removeLayer(key)"><i class="el-icon-delete"></i></div>
							<div class="edit-layer" @click="editLayer(element, key)"><i class="el-icon-edit-outline"></i></div>
						</div>
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

				<div class="editing-layer-colors-panel" v-if="showEditingLayerColorPanel">
					<div class="color-pallette">
						<div class="color-box" v-for="(item, key) in editingLayerJson.children" :key="key">
							<!-- <div class="color-box-inner" v-for="(color, index) in filterFillNStroke(item.attributes)" :key="index" :class="index" :style="{backgroundColor: color}" @click="showColorPicker(color,item, key)"> -->

							<el-color-picker :class="index" v-for="(color, index) in filterFillNStroke(item.attributes)" :key="index" class="color-box-inner" :value="color" @change="colorChanged($event, item, key)" :predefine="predefineColors">
							</el-color-picker>
							<!-- </div> -->
						</div>
					</div>
					<el-button @click="closeEditingLayerColorPanel" size="mini" type="danger">close</el-button>
				</div>
			</el-aside>
		</el-container>
		<AllLayersDialog @dialogVisibility="captureVisibility" :allNftLayersDialog="allNftLayersDialog"></AllLayersDialog>
	</div>
</template>

<script lang="ts">
import {
	Getter,
	Mutation
} from "vuex-class";
import {
	Component,
	Vue
} from "vue-property-decorator";
import {
	remote,
	ipcRenderer
} from "electron";
import MenuBar from "@/views/MenuBar.vue";
import AllLayersDialog from "@/views/AllLayersDialog.vue";
import draggable from 'vuedraggable'
import cloneDeep from "clone-deep"

import {
	toCSS,
	toJSON
} from 'cssjson';
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
	@Getter('defaultDirectory') defaultDirectory: any
	@Mutation("removeLayerMutation") removeLayerMutation;
	@Mutation("setNewSvgContent") setNewSvgContent
	activeName = "body";
	allNftLayersDialog = false;
	editingLayerJson = {}
	showEditingLayerColorPanel = false
	editiingLayerInndex = ''

	predefineColors = [
		'#ff4500',
		'#ff8c00',
		'#ffd700',
		'#90ee90',
		'#00ced1',
		'#1e90ff',
		'#c71585',
		'rgba(255, 69, 0, 0.68)',
		'rgb(255, 120, 0)',
		'hsv(51, 100, 98)',
		'hsva(120, 40, 94, 0.5)',
		'hsl(181, 100%, 37%)',
		'hsla(209, 100%, 56%, 0.73)',
		'#c7158577'
	]


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
	get myList() {
		return this.baseModel
	}
	set myList(value) {
		this.sortLayers(value)
	}
	removeLayer(key) {
		this.editingLayerJson = {}
		this.showEditingLayerColorPanel = false
		this.removeLayerMutation(key)
	}
	editLayer(element, key) {
		this.editiingLayerInndex = key

		var el = document.createElement('html');
		el.innerHTML = element.svg;

		const styles = el.getElementsByTagName('style')[0].innerHTML.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "");
		const json = toJSON(styles);

		this.editingLayerJson = json
		this.showEditingLayerColorPanel = true

	}
	closeEditingLayerColorPanel() {
		this.editingLayerJson = {}
		this.showEditingLayerColorPanel = false

	}
	filterFillNStroke(obj) {
		let newObj = {}
		if (obj.hasOwnProperty('fill')) {
			newObj['fill'] = obj.fill.indexOf('#') !== -1 ? obj.fill : '#' + obj.fill
		}
		if (obj.hasOwnProperty('stroke')) {
			newObj['stroke'] = obj.stroke.indexOf('#') !== -1 ? obj.stroke : '#' + obj.fill
		}
		return newObj
	}
	showColorPicker(color, item, className) {
		// console.log(color, item, className)
	}
	colorChanged(val, item, key) {
		var getSelectedLayer = cloneDeep(this.editingLayerJson)
		var oldObj = getSelectedLayer.children[key].attributes
		const firstItem = Object.keys(item.attributes)[0]

		getSelectedLayer.children[key].attributes[firstItem] = val
		const newCss = toCSS(getSelectedLayer)


		var el = document.createElement('html');
		el.innerHTML = this.baseModel[this.editiingLayerInndex].svg;
		el.getElementsByTagName('style')[0].innerHTML = newCss

		this.setNewSvgContent({ index: this.editiingLayerInndex, svg: el.getElementsByTagName('body')[0].innerHTML })


	}
	mounted() {
		if (this.defaultDirectory === null || this.defaultDirectory === '') {
			this.$router.push({
				name: 'Home'
			})
		}
	}
}
</script>

<style lang="scss">
.editor {
	height: 100%;
	.el-container {
		width: calc(100% - 240px);
		height: 100%;
	}
}
.editor-sidebar {
	width: 240px;
	position: absolute;
	right: 0;
	bottom: 0;
	top: 0;
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
	// width: 800px;
	height: 100%;
	width: calc(100% - 240px);
	// left: calc((100% - 800px - 240px) / 2);

	svg {
		max-width: 100%;
		max-height: 100%;
	}
}

.layer-sortable {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;

	.layer-sort-name {
	}

	.remove-layer {
		cursor: pointer;
	}

	.edit-layer {
		cursor: pointer;
	}
}

.editing-layer-colors-panel {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: #101623;
	padding-top: 20px;
	padding-bottom: 20px;

	.color-box {
		//  margin: 5px;
		display: inline-table;
	}

	.color-box-inner {
		width: 40px;
		height: 40px;
		float: left;
		margin: 3px;
		cursor: pointer;
		&:hover {
			opacity: 0.9;
		}
		.el-color-picker__trigger {
			border: none;
			.el-color-picker__icon {
				display: none;
			}
		}
	}

	.color-pallette {
		// display: flex;
	}
}
.v-modal {
	background: transparent !important;
}
</style>
