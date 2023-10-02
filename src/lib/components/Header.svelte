<script>
	import { browser } from '$app/environment';
	import { user } from '$lib/stores/user.js';
	// Imports the user store to determine what buttons to show.
	console.log($user);
	if ( browser ) {
		//user = localStorage.getItem('user');
		if ( user ) {
		//	user = JSON.parse(user);
		}
	}
</script>

<!-- Header.svelte -->
<header class="p-3 text-black mb-2">
	<div class="container mx-auto flex justify-between items-center">
		<a href="/">💥</a>
		<nav>
			<ul>
				<li>
					<a href="/dashboard"><i class="fa-solid fa-house-flag"></i> Home</a>
				</li>
				<li>
					<a href="/dashboard/friends/"><i class="fa-solid fa-users"></i> Friends</a>
				</li>
				<li>
					<a href="/dashboard/happenings/"><i class="fa-solid fa-calendar-days"></i> Happenings</a>
				</li>
				<li>
					<a href="/dashboard/groups/"><i class="fa-solid fa-users"></i> Groups</a>
				</li>
				<li>
					<a href="/dashboard/admin"><i class="fa-solid fa-lock"></i> Admin</a>
				</li>
				{#if !$user}
				<li>
					<a href="/login">Login</a>
				</li>
				<li>
					<a href="/create-account">Create new account</a>
				</li>
				{:else}
				<li>
					<a href="/dashboard/users/{user.username}/profile"><i class="fa-solid fa-id-card"></i> Profile</a>
				</li>

				<li>
					<form method="POST" action="/logout">
						<button class="nav-button" formaction="?/logout">Logout</button>
					</form>
				</li>
				{/if}
			
			</ul>
		</nav>
	</div>
</header>

<style lang="scss">
@import '../styles/colors';
nav ul {
	margin: 0;
	list-style-type: none;
	display: flex;
	gap: 1rem;
	align-items: center;
}

a {
	text-decoration: none;
	font-size: 1rem;
	font-weight: bold;
	line-height:1.25;
	i {
		margin-right: 5px;
	}

	&:hover {
		font-weight: bold;
	}
}

img {
	width: 35%;
}

header {
	background-color: #7E7D7B;
	color: black;
}

.nav-button {
	padding: 2px 10px;
}
</style>