import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		defaultDirectory: null,
		nftRenderView: {
			attributes: {
				bg: {
					name: '',
					index: 0
				},
				body: {
					name: '',
					index: 1
				},
				eyes: {
					name: '',
					index: 2
				},
				earLeft: {
					name: '',
					index: 3
				},
				earRight: {
					name: '',
					index: 3
				},
				hair: {
					name: '',
					index: 4
				},
				mouth: {
					name: '',
					index: 5
				},
				hornLeft: {
					name: ''
				}


			}
		}
	},
	mutations: {
		setDefaultDirectory(state, payload) {
			state.defaultDirectory = payload
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
	}
})
