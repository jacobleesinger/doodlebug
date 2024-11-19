<main class="flex flex-col justify-center items-center container">
  <h2 class="text-2xl my-8">Admin Login</h2>
  <form method="POST" action="?/login" class="flex flex-col justify-start items-start ">

    <section class="flex flex-col space-y-2 mb-4">

      <label for="email">
        Email
      </label>
      <input name="email" type="email" class="input input-bordered"/>
    </section>

    <section class="flex flex-col space-y-2 mb-4">
      <label for="password">
        Password
      </label>
      <input name="password" type="password" class="input input-bordered"/>
    </section>

    <section class="flex mt-4">
        <button class="btn btn-primary">Log In</button>
    </section>

  </form>
</main>
