<script>

	// Imports the user store to determine what buttons to show.
	//import { user } from '$lib/stores/user.js';
	import { apiKey } from '$lib/stores/apiKey.js';

</script>

<!-- Footer.svelte -->
<footer class="p-3 text-white mb-5 flex items-end">
	<div class="container mx-auto">
		<div class="flex flex-nowrap justify-between align-bottom items-end">
			<a href="/">sup</a>

			<nav>
				<ul>
					<li>
						<a href="/dashboard"><i class="fa-solid fa-house-flag"></i> Home</a>
					</li>
					<li>
						<a href="/dashboard/friends/"><i class="fa-solid fa-users"></i> Friends</a>
					</li>
					<li>
						<a href="/dashboard/news/"><i class="fa-solid fa-newspaper"></i> News</a>
					</li>
					<li>
						<a href="/dashboard/profile"><i class="fa-solid fa-id-card"></i> Profile</a>
					</li>
					<li>
						<a href="/dashboard/groups"><i class="fa-solid fa-people-group"></i> Groups</a>
					</li>
					{#if !($apiKey)}
					<li>
						<a href="/login">Login</a>
					</li>
					<li>
						<a href="/create-account">Create new account</a>
					</li>
					{:else}
					<li>
						<a href="/logout">Logout</a>
					</li>				
					{/if}
				</ul>
			</nav>
		</div>
	</div>
</footer>

<style lang="scss">
@import '../styles/colors';
nav ul {
	margin: 0;
	list-style-type: none;
	display: flex;
	gap: 1rem;
}

a {
	text-decoration: none;
	font-size: 1rem;
	font-weight: bold;

	i {
		margin-right: 5px;
	}
}

img {
	width: 35%;
}

footer {
	width: 100%;
	margin-bottom: 0;
	background-color: #7E7D7B;
	color: black;
}
</style>