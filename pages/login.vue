<template lang="html">
  <div>
    <!-- <link rel="stylesheet" href="https://unpkg.com/bulmaswatch/darkly/bulmaswatch.min.css"> -->
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Login</h3>
                    <p class="subtitle has-text-grey">Please login to proceed.</p>
                    <div class="box">
                        <figure class="avatar image is-96x96">
                            <img class="is-rounded" src="https://api.adorable.io/avatars/285/test.png">
                        </figure><br>
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="email" placeholder="Your Email" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>
                            <button class="button is-block is-link is-large is-fullwidth">Login</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.avatar{
  margin-left: auto;
  margin-right: auto;
}
</style>
