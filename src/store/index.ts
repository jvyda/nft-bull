import { FormItem } from "element-ui";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		defaultDirectory: null,
		nftData: [],
		baseModel: [],
		layerOrder: ["Body"],
	},
	mutations: {
		setDefaultDirectory(state, payload) {
			state.defaultDirectory = payload;
		},
		setNftData(state, payload) {
			state.nftData = payload;
		},
		addLayerToBaseModel(state, payload) {
			const baseModel: any = state.baseModel;
			const checkIfItemExists = baseModel.find((item) => {
				return item.trait === payload.trait
			});

			if (checkIfItemExists) {
				checkIfItemExists.trait = payload.trait
				checkIfItemExists.layerName = payload.item.name
				checkIfItemExists.svg = payload.item.svg
			} else {
				baseModel.push({ trait: payload.trait, layerName: payload.item.name, svg: payload.item.svg, colors: [{ className: '', color: '' }] })
			}
		},
		sortLayers(state, payload) {
			state.baseModel = payload
		},
		removeLayerMutation(state, payload) {
			state.baseModel.splice(payload, 1);
		},
		setNewSvgContent(state: any, payload) {
			state.baseModel[payload.index].svg = payload.svg
		}
	},
	actions: {},
	modules: {},
	getters: {
		defaultDirectory: (state) => {
			return state.defaultDirectory;
		},
		nftDataGetter: (state) => {
			return state.nftData;
		},
		fullStore: (state) => {
			return state;
		},
		baseModel: (state) => {
			return state.baseModel;
		},
		layerOrder: (state) => {
			return state.layerOrder;
		},
	},
});
