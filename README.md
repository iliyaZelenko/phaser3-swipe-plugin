### Installation

```bash
npm i --save phaser3-swipe-plugin

# Or 

yarn add phaser3-swipe-plugin
```

### Usage

1. Import
```js
import SwipePlugin from 'phaser3-swipe-plugin'
```

2. Add to config (GameConfig) `plugins` property.

```js
  ...
  plugins: {
    global: [
      {
        key: 'SwipePlugin',
        plugin: SwipePlugin,
        start: true,
        // custom options
        data: {
          // you can give your value for min offset
          offset: 100
        }
      }
    ]
  }
  ...
```

3. Add event listener.

```js
game.events.on('swipe', (dir) => {
  // 'up', 'right', 'down' or 'left'
  console.log(dir)
})
```

Tested on Phaser `3.15.1`.
