<script lang="ts">
  import { writable } from 'svelte/store'
  import { debounce, debounceTimer } from '$lib'
  const value = writable('world')

  const debounced = debounce(value, 300)

  let withTimer = 'world'
  let countWithTimer = 0
  function countTimed() {
    countWithTimer++
  }
  const timer = debounceTimer(300)
  $: if ($timer.up()) {
    withTimer = $debounced + ' ' + $value
    countTimed()
  }

  let withoutTimer = 'world'
  let countWithoutTimer = 0
  function countNotTimed() {
    countWithoutTimer++
  }
  $: {
    withoutTimer = $debounced + ' ' + $value
    countNotTimed()
  }
</script>

<input bind:value={$value} />
<h1>Hello, {$value}!</h1>
<h1>Hello, {$debounced}!</h1>
<h1>Hello, {withTimer}!</h1>
<h2>without timer rendered {countWithTimer} time(s)</h2>
<h1>Hello, {withoutTimer}!</h1>
<h2>with timer rendered {countWithoutTimer} time(s)</h2>
