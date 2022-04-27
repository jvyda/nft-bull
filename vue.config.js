module.exports = {
	runtimeCompiler: true,
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			preload: 'src/preload.js',
		}
	}
}