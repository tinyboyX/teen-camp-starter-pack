<signin>
    <nav id="navbar">
        <div class="grid">
         <div class="col-4" id="Homepage">Song4you</div> 
         <div class="col-2">Songs</div>
         <div class="col-2">Top100</div>
         <div class="col-2">Playlist</div>
         <div class="col-1"><button type="button" name="button">Sign up</button></div>
         <div class="col-1"><button type="button" name="button">Sign in</button></div>
        </div>
     </nav>
<div style='text-align:center'>
    <h1 style='font-family: Lato; color:#4F4F4F'>Sign In</h1>
      </div>
      <div style="text-align:center">
        <form id='signin-form' style='border:3px solid black;padding:5px;'>
          <label for="em">Email Adress</label><br>
          <input  type="email" name="em" placeholder="Please enter your email" id='em'><br>
          <label for="pass">Password</label><br>
          <input type="password" name="password" placeholder="Please enter your password" id='pass'><br>
          <input type="checkbox" id='remember'>
          <label for="remember">Remember me</label><br>
          <div class="form-group">
            <button type="button" id="signin_btn">Sign In</button>
          </div>
        </form>
        <p class="alert alert-warning" id="signin_alert"></p>
</div>
</signin>