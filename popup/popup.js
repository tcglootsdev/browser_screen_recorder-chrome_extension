let tabId = null;

//initial data
let supabaseUrl = "https://yjrdmpkrbgybnrfgklxa.supabase.co";
let supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcmRtcGtyYmd5Ym5yZmdrbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5Njg4MTQsImV4cCI6MjAzMzU0NDgxNH0.B-PeCWx6G3yM0sAPvEscMkpkeEd6UvFZHHMIAbcLLMw";
const SupabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// dom elements
let googleSignInButton = document.getElementsByClassName("write")[0]
let loginForm = document.getElementById("login_form")

SupabaseClient.auth.getSession().then((session) => {
  console.log(session)
  if (session) {
    // User is already authenticated
    loginForm.style.display = "none";
    document.getElementById("content").innerHTML = session.data.session.user.email;
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  tabId = tabs[0].id;
});

document
  .getElementsByClassName("write")[0]
  .addEventListener("click", async () => {

    googleSignInButton.innerHTML = '<div class="text-center"><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span>  </div></div>';
    googleSignInButton.setAttribute("disabled", "true")
    const manifest = chrome.runtime.getManifest();


    const url = new URL("https://accounts.google.com/o/oauth2/auth");

    url.searchParams.set("client_id", manifest.oauth2.client_id);
    url.searchParams.set('response_type', 'id_token')
    url.searchParams.set('access_type', 'offline')
    url.searchParams.set('redirect_uri', `https://${chrome.runtime.id}.chromiumapp.org`)
    url.searchParams.set('scope', manifest.oauth2.scopes.join(' '))
    

    chrome.identity.launchWebAuthFlow(
      {
        url: url.href,
        interactive: true,
      },
      async (redirectedTo) => {

        if (chrome.runtime.lastError) {
          // auth was not successful
        } else {
          // auth was successful, extract the ID token from the redirectedTo URL
          const url = new URL(redirectedTo)
          const params = new URLSearchParams(url.hash)
          
          const { data, error } = await SupabaseClient.auth.signInWithIdToken({
            provider: 'google',
            token: params.get('#id_token'),
          })
          
          if (error == null) {
            // add logic
            loginForm.style.display = "none"
            console.log(data)
            document.getElementById("content").innerHTML = data.user.email
          }
        }
      }
    )
    
});
