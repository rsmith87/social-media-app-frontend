<script>
	export let profile;
</script>

<div class="flex flex-wrap bg-white p-4 user-card rounded-md">
	<img class="mb-2" src="{profile.profile.image}" alt={profile.user.name} />
	<p class="mb-3"><strong>Name</strong>: {profile.user.name}</p>
	<p class="mb-3"><strong>Username</strong>: {profile.user.username}</p>
	<p class="mb-3"><strong>Email</strong>: {profile.user.email}</p>
	<p class="mb-3">{profile.profile.location}</p>
	<p class="mb-3">{profile.profile.bio}</p>
	<div class="flex flex-nowrap justify-between w-[100%] social-media-icons">
		<div class="basis-1/4">
			<a href="#"><i class="fa-solid fa-envelope"></i></a>
		</div>
		<div class="basis-1/4">
			<a href="#"><i class="fa-brands fa-facebook"></i></a>
		</div>
		<div class="basis-1/4">
			<a href="#"><i class="fa-brands fa-x-twitter"></i></a>
		</div>
		<div class="basis-1/4">
			<a href="#"><i class="fa-solid fa-money-bill"></i></a>
		</div>
	</div>
</div>

<style lang="scss">
	.user-card p {
		display: block;
		width: 100%;

		strong {
			font-weight: 600;
		}
	}

	.social-media-icons div {
		text-align: center;
	}
</style>