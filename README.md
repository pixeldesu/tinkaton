<div align='center'>
  <img width=250px src='.github/images/tinkaton.png?raw=true'>

  <h1>tinkaton</h1>
  <p>tinkaton is a library that can be used to extract information from popular frontend framework entrypoints on websites.</p>
</div>

> [!IMPORTANT]
> tinkaton is a project made to tinker with web projects in an exploratory fashion, so it should be only used for educational purposes!

## Installation

You can get tinkaton via NPM:

```shell
$ npm install tinkaton
```

Or directly in the browser:

```html
<!-- IIFE build -->
<script src="https://unpkg.com/tinkaton/dist/tinkaton.global.js"></script>
```

## Usage

```js
// If you want to use the ESM build, import Tinkaton
import Tinkaton from "https://unpkg.com/tinkaton/dist/tinkaton.js";

const tinkaton = new Tinkaton();
tinkaton.run(); // returns an array with extracted data for each entrypoint found
```

If you use the IIFE build `tinkaton.global.js`, you do the following:

```js
// Assuming you loaded tinkaton.global.js beforehand, either importing it through a script or another way
const tinkaton = new Tinkaton.default();
tinkaton.run(); 
```

## Supported Frameworks

| Framework | How is it detected?                                                  | What is extracted?                                             |
|-----------|----------------------------------------------------------------------|----------------------------------------------------------------|
| Alpine.js | Elements with the `x-data` attribute                                 | The data instance proxy                                        |
| Livewire  | Elements with the `wire:id` attribute                                | Livewire snapshot information (from the `__livewire` property) |
| Vue 2     | `#app` elements with a `__vue__` property                            | The entire root component                                      |
| Vue 3     | `#app` elements with a `__vue_app__` property                        | The global properties of the Vue instance                      |
| React     | Elements with `_reactRootContainer` or `__reactContainer` properties | All properties passed to components down the element tree      |
| Stimulus  | `window.Stimulus` being defined                                      | The global Stimulus instance (`window.Stimulus`)               |
| Turbo     | `window.Turbo` being defined                                         | The global Turbo instance (`window.Turbo`)                     |
| Ember     | `window.Ember` being defined                                         | The global Ember instance (`window.Ember`)                     |
| Backbone  | `window.Backbone` being defined                                      | The global Backbone instance (`window.Backbone`)               |
| Knockout  | `window.Knockout` being defined                                      | The global Knockout instance (`window.Knockout`)               |

All extractors also support being passed a custom selector that will be tested for matching properties!

## Contributing

If you want to contribute to the project, please check out the [Contribution Guidelines](/.github/CONTRIBUTING.md)!

## License

tinkaton is licensed under [aGPL v3](./LICENSE).

_This project is not affiliated with Game Freak or the Pokémon Company and Tinkaton is solely used as a project name/mascot while all trademarks and copyrights are with their respective holders._