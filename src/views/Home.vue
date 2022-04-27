
<template>

	<div class="home" v-loading.fullscreen.lock="fullscreenLoading">
		<div class="flex-holder" v-if="defaultDirectory ==='' || defaultDirectory===null">

			<div class="bull-logo"><img src="@/assets/bull1.png" /></div>
			<el-button type="success" class="setdriectory-button" @click="openWorkingDirectoryDialog">Set Working Directory</el-button>
			<h4 class="color-white-text">
				You need to set a working directory first
			</h4>
		</div>
	</div>
</template>

<script lang="ts">
/* eslint-disable  */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Getter, Mutation } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator';
// import { useIpcRenderer } from '@vueuse/electron'
const fs = require('fs')
import { ipcRenderer } from 'electron'
@Component({
	components: {

	},
})
export default class Home extends Vue {
	fullscreenLoading = false
	@Getter('defaultDirectory') defaultDirectory: any
	@Getter('nftDataGetter') nftDataGetter: any
	@Mutation('setDefaultDirectory') setDefaultDirectory
	@Mutation('setNftData') setNftData
	openWorkingDirectoryDialog() {
		this.fullscreenLoading = true
		ipcRenderer.send('defaultDirectory:unset');
		// console.log('set directory')
	}
	getDefaultDirectorySubfolders(path) {
		return fs.readdirSync(path).filter(function (file) {
			return fs.statSync(path + '/' + file).isDirectory();
		});
	}
	mounted() {
		this.$nextTick(function () {
			ipcRenderer.on('defaultDirectory:set', (event, result) => {
				//@ts-ignore
				if (!event.canceled && result.result.filePaths.length > 0) {
					this.setDefaultDirectory(result.result.filePaths[0])
					this.setNftData(result.data)
					this.fullscreenLoading = false
					this.$router.push({ name: 'Editor' })
				}
				else {
					this.fullscreenLoading = false
				}
			})
		})
	}
}
</script>
<style lang="scss">
html {
	background: #383b43;
	height: 100%;
	body {
		margin: 0;
		padding: 0;
		min-height: 100%;
	}
	.home {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
	.flex-holder {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.bull-logo {
		width: 200px;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: brightness(1.3);
		mix-blend-mode: hard-light;
		z-index: -1;
		opacity: 1;
		img {
			max-width: 100%;
			object-fit: contain;
		}
	}
	.color-white-text {
		color: #c6d0d4;
		font-family: lato;
		font-weight: 300;
	}
	.setdriectory-button {
		height: 70px;
		width: 300px;
		font-size: 20px;
	}
}
</style>
