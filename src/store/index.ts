import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		defaultDirectory: null,
		nftData:[],
		baseModel: [],
		layerOrder: []
	},
	mutations: {
		setDefaultDirectory(state, payload) {
			state.defaultDirectory = payload
		},
		setNftData(state, payload){
			console.log(payload)
			state.nftData = payload
		}
	},
	actions: {
	},
	modules: {
	},
	getters: {
		defaultDirectory: state => {
			return state.defaultDirectory
		},
		nftDataGetter: state => {
			return state.nftData
		},
	}
})
