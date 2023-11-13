import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import { createAuth0 } from '@auth0/auth0-vue'
const app = createApp(App)
app.use(router)

app.use(
    createAuth0({
      domain: "dev-0akwmrvuetclqqnc.us.auth0.com",
      clientId: "iVev6MoEytpVbDWp8wTiIUBjouZwHhSO",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );
  
  app.mount('#app');
