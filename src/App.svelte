<script>
	import Scheduler from "./Scheduler.svelte"
	let daySegments;
	// $: console.log(daySegments)
</script>

<main>
	<Scheduler bind:daySegments={daySegments}/>
	
</main>

<style>
	main {
		background-color: grey;
		height: 100%;
	}
</style>