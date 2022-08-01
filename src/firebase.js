import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMrDDPBw918Gbo2_K-NbRJ6ZG74jiyxEs",
  authDomain: "sorta-sql.firebaseapp.com",
  projectId: "sorta-sql",
  storageBucket: "sorta-sql.appspot.com",
  messagingSenderId: "986979504688",
  appId: "1:986979504688:web:97e522186098517d7293f5",
  measurementId: "G-0SH9P3T438",
};
import store from "@/store";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GithubAuthProvider(app);

export const githubSignin = async () => {
  console.log("signing in with github");
  const { user, error } = await signInWithPopup(auth, provider)
    .then((result) => {
      console.log("success");
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      store.dispatch("setGithubAccessToken", token);

      const user = result.user;
      console.log("success", { user, token });
      return { user, error: null };
    })
    .catch((error) => {
      console.log("failure");
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);

      // TODO - create a modal error
      console.log("error", { errorCode, errorMessage, email, credential });
      return { user: null, errorMessage };
    });

  if (!error) return user;
  else console.error(error);
};

export const githubSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("signed out");
      store.dispatch("signUserOut");
      localStorage.removeItem("sorta-sql-user");
      // TODO - redirect to login
    })
    .catch((err) => {
      console.error(err);
      // TODO - create a modal error
    });
};
