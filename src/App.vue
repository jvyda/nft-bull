<template>
	<div id="app">

		<router-view />
	</div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");
#app {
	font-family: lato, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	background: #0a101d;
	color: #c6d0d4;
	height: 100%;
	font-weight: 300;
	width: 100%;
	height: 100%;
	position: fixed;
}
html{
	font-family: lato, Helvetica, Arial, sans-serif;
	font-weight: 300;
}
</style>
