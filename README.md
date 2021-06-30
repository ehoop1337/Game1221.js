# Game1221.js
The game resembles "2048", the differences are: the dropout of cells 1 or 2, you can also combine horizontally, vertically and at the corners of the selected goal

> Works without connecting jQuery

> Unminified file size - 11 KB

> Minified file size - 5.46 KB

## Function parameters
* @param1 {string} selector    To which DOM element are we creating an instance of the class

## Required styles
* #game>div:hover{background:#e4e4e4 !important;cursor:pointer !important}
* .active{background:orange !important;color: #fff !important}
* #game>div.active:hover{background:orange !important;cursor:pointer !important}

## Example
```html
...
	<style>
		#game > div:hover {
			background: #e4e4e4 !important;
		    cursor: pointer !important;
		}
		.active {
		    background: orange !important;
		    color: #fff !important;
		}
		#game > div.active:hover {
		    background: orange !important;
		    cursor: pointer !important;
		}
	</style>
</head>
<body>
	<div id="game"></div>

	<script src="Game1221.min.js"></script>
	<script>
		let game = new Game1221("#game");
	</script>
</body>
...
```
  
## Example jsFiddle
[https://jsfiddle.net/ehoop1337/j5uq6nLo/](https://jsfiddle.net/ehoop1337/j5uq6nLo/)
