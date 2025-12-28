import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailLink as firebaseSignInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { auth } from "./config";

const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google SSO
 */
export const signInWithGoogle = async (): Promise<User> => {
  if (!auth) {
    throw new Error("Firebase auth is not initialized");
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

/**
 * Send sign-in link to email (Email OTP)
 */
export const sendEmailOTP = async (email: string): Promise<void> => {
  if (!auth) {
    throw new Error("Firebase auth is not initialized");
  }
  try {
    const actionCodeSettings = {
      url: `${window.location.origin}/auth/callback`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  } catch (error) {
    console.error("Error sending email OTP:", error);
    throw error;
  }
};

/**
 * Sign in with email link (Email OTP)
 */
export const signInWithEmailLink = async (
  email: string,
  emailLink: string
): Promise<User> => {
  if (!auth) {
    throw new Error("Firebase auth is not initialized");
  }
  try {
    if (!isSignInWithEmailLink(auth, emailLink)) {
      throw new Error("Invalid email link");
    }

    const result = await firebaseSignInWithEmailLink(auth, email, emailLink);
    return result.user;
  } catch (error) {
    console.error("Error signing in with email link:", error);
    throw error;
  }
};

/**
 * Sign out
 */
export const signOut = async (): Promise<void> => {
  if (!auth) {
    throw new Error("Firebase auth is not initialized");
  }
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

/**
 * Get current user's ID token
 */
export const getIdToken = async (): Promise<string | null> => {
  if (!auth) {
    return null;
  }
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }
    return await user.getIdToken();
  } catch (error) {
    console.error("Error getting ID token:", error);
    return null;
  }
};

