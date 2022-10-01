[![npm-badge](https://badge.fury.io/js/svelte-reactive-debounce.svg)](https://www.npmjs.com/package/svelte-reactive-debounce)

# svelte-reactive-debounce

Easily debounce svelte store updates and reactive statements (`$:` statements).

## Installation

```bash
npm install svelte-reactive-debounce
```

## Usage

- Debounce a svelte store (`readable` / `writable` / `derived`)

```html
<script lang="ts">
  import { writable } from 'svelte/store'
  import { debounce } from 'svelte-reactive-debounce'

  const value = writable('world')
  const debounced = debounce(value, 300 /* debounce time (millisecond)*/)
</script>

<input bind:value="{$value}" />
<h1>Hello, {$debounced}!</h1>
```

- Debounce svelte reactive statements (`$:`)

```html
<script lang="ts">
  import { writable } from 'svelte/store'
  import { debounceTimer } from 'svelte-reactive-debounce'

  let keyword = ''
  let result = ''

  const timer = debounceTimer(500 /* debounce time (millisecond)*/)
  $: if (keyword.length > 0 && $timer.up()) {
    result = 'Searching...'
    setTimeout(() => {
      result = `I\'m the searching result of ${keyword}.`
    }, 500)
  }
</script>

Search: <input bind:value="{keyword}" />
<p>{result}</p>
```

## Playground

https://svelte.dev/repl/aa8c746fb3a340a78ef039a4b4806e5f?version=3.50.1
