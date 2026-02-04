import { FirebaseError } from "firebase/app";

export function generateFirebaseAuthErrorMessage(error: FirebaseError): string {
  let errorMessage = error.message;
  let errorCode = error.code
  switch (errorCode) {
    case "auth/invalid-email":
      errorMessage = ("Invalid email address. Please enter a valid email.");
      break;
    case "auth/user-not-found":
      errorMessage = ("User not found. Please check the email address.");
      break;
    case "auth/wrong-password":
      errorMessage = ("Incorrect password. Please try again.");
      break;
    case "auth/email-already-in-use":
      errorMessage = ("Email already in use. Please try another email.");
      break;
    case "auth/weak-password":
      errorMessage = ("Password should be at least 6 characters.");
      break;
    case "auth/operation-not-allowed":
      errorMessage = ("Operation not allowed. Please try again later.");
      break;
    case "auth/invalid-verification-code":
      errorMessage = ("Invalid verification code. Please try again.");
      break;
    case "auth/invalid-verification-id":
      errorMessage = ("Invalid verification ID. Please try again.");
      break;
    case "auth/code-expired":
      errorMessage = ("Code expired. Please try again.");
      break;
    case "auth/invalid-action-code":
      errorMessage = ("Invalid action code. Please try again.");
      break;
    case "auth/user-disabled":
      errorMessage = ("User disabled. Please contact support.");
      break;
    case "auth/invalid-credential":
      errorMessage = ("Invalid credential. Please try again.");
      break;
    case "auth/invalid-continue-uri":
      errorMessage = ("Invalid continue URL. Please try again.");
      break;
    case "auth/unauthorized-continue-uri":
      errorMessage = ("Unauthorized continue URL. Please try again.");
      break;
    case "auth/missing-continue-uri":
      errorMessage = ("Missing continue URL. Please try again.");
      break;
    case "auth/missing-verification-code":
      errorMessage = ("Missing verification code. Please try again.");
      break;
    case "auth/missing-verification-id":
      errorMessage = ("Missing verification ID. Please try again.");
      break;
    case "auth/captcha-check-failed":
      errorMessage = ("Captcha check failed. Please try again.");
      break;
    case "auth/invalid-phone-number":
      errorMessage = ("Invalid phone number. Please try again.");
      break;
    case "auth/missing-phone-number":
      errorMessage = ("Missing phone number. Please try again.");
      break;
    case "auth/quota-exceeded":
      errorMessage = ("Quota exceeded. Please try again.");
      break;
    case "auth/missing-app-credential":
      errorMessage = ("Missing app credential. Please try again.");
      break;
    case "auth/invalid-app-credential":
      errorMessage = ("Invalid app credential. Please try again.");
      break;
    case "auth/session-expired":
      errorMessage = ("Session expired. Please try again.");
      break;
    case "auth/missing-or-invalid-nonce":
      errorMessage = ("Missing or invalid nonce. Please try again.");
      break;
    case "auth/missing-client-identifier":
      errorMessage = ("Missing client identifier. Please try again.");
      break;
    case "auth/key-retrieval-failed":
      errorMessage = ("Key retrieval failed. Please try again.");
      break;
    case "auth/invalid-oauth-provider":
      errorMessage = ("Invalid OAuth provider. Please try again.");
      break;
    case "auth/invalid-oauth-client-id":
      errorMessage = ("Invalid OAuth client ID. Please try again.");
      break;
    case "auth/invalid-cert-hash":
      errorMessage = ("Invalid cert hash. Please try again.");
      break;
    case "auth/invalid-user-token":
      errorMessage = ("Invalid user token. Please try again.");
      break;
    case "auth/invalid-custom-token":
      errorMessage = ("Invalid custom token. Please try again.");
      break;
    case "auth/app-deleted":
      errorMessage = ("App deleted. Please try again.");
      break;
    case "auth/app-not-authorized":
      errorMessage = ("App not authorized. Please try again.");
      break;
    case "auth/argument-error":
      errorMessage = ("Argument error. Please try again.");
      break;
    case "auth/invalid-api-key":
      errorMessage = ("Invalid API key. Please try again.");
      break;
    case "auth/network-request-failed":
      errorMessage = ("Network request failed. Please try again.");
      break;
    case "auth/requires-recent-login":
      errorMessage = ("Requires recent login. Please try again.");
      break;
    case "auth/too-many-requests":
      errorMessage = ("Too many requests. Please try again.");
      break;
    case "auth/unauthorized-domain":
      errorMessage = ("Unauthorized domain. Please try again.");
      break;
    case "auth/user-token-expired":
      errorMessage = ("User token expired. Please try again.");
      break;
    case "auth/web-storage-unsupported":
      errorMessage = ("Web storage unsupported. Please try again.");
      break;
    case "auth/account-exists-with-different-credential":
      errorMessage = ("Account exists with different credential. Please try again.");
      break;
    case "auth/auth-domain-config-required":
      errorMessage = ("Auth domain config required. Please try again.");
      break;
    case "auth/cancelled-popup-request":
      errorMessage = ("Cancelled popup request. Please try again.");
      break;
    case "auth/credential-already-in-use":
      errorMessage = ("Credential already in use. Please try again.");
      break;
    case "auth/custom-token-mismatch":
      errorMessage = ("Custom token mismatch. Please try again.");
      break;
    case "auth/provider-already-linked":
      errorMessage = ("Provider already linked. Please try again.");
      break;
    case "auth/timeout":
      errorMessage = ("Timeout. Please try again.");
      break;
    case "auth/missing-android-pkg-name":
      errorMessage = ("Missing Android package name. Please try again.");
      break;
    case "auth/missing-ios-bundle-id":
      errorMessage = ("Missing iOS bundle ID. Please try again.");
      break;
    case "auth/invalid-dynamic-link-domain":
      errorMessage = ("Invalid dynamic link domain. Please try again.");
      break;
    case "auth/invalid-persistence-type":
      errorMessage = ("Invalid persistence type. Please try again.");
      break;
    case "auth/unsupported-persistence-type":
      errorMessage = ("Unsupported persistence type. Please try again.");
      break;
    case "auth/invalid-oauth-client-secret":
      errorMessage = ("Invalid OAuth client secret. Please try again.");
      break;
    case "auth/invalid-argument":
      errorMessage = ("Invalid argument. Please try again.");
      break;
    case "auth/invalid-creation-time":
      errorMessage = ("Invalid creation time. Please try again.");
      break;
    case "auth/invalid-disabled-field":
      errorMessage = ("Invalid disabled field. Please try again.");
      break;
    case "auth/invalid-display-name":
      errorMessage = ("Invalid display name. Please try again.");
      break;
    case "auth/invalid-email-verified":
      errorMessage = ("Invalid email verified. Please try again.");
      break;
    case "auth/invalid-hash-algorithm":
      errorMessage = ("Invalid hash algorithm. Please try again.");
      break;
    case "auth/invalid-hash-block-size":
      errorMessage = ("Invalid hash block size. Please try again.");
      break;
    case "auth/invalid-hash-derived-key-length":
      errorMessage = ("Invalid hash derived key length. Please try again.");
      break;
    case "auth/invalid-hash-key":
      errorMessage = ("Invalid hash key. Please try again.");
      break;
    case "auth/invalid-hash-memory-cost":
      errorMessage = ("Invalid hash memory cost. Please try again.");
      break;
    case "auth/invalid-hash-parallelization":
      errorMessage = ("Invalid hash parallelization. Please try again.");
      break;
    case "auth/invalid-hash-rounds":
      errorMessage = ("Invalid hash rounds. Please try again.");
      break;
    case "auth/invalid-hash-salt-separator":
      errorMessage = ("Invalid hash salt separator. Please try again.");
      break;
    case "auth/invalid-id-token":
      errorMessage = ("Invalid ID token. Please try again.");
      break;
    case "auth/invalid-last-sign-in-time":
      errorMessage = ("Invalid last sign in time. Please try again.");
      break;
    case "auth/invalid-page-token":
      errorMessage = ("Invalid page token. Please try again.");
      break;
    case "auth/invalid-password":
      errorMessage = ("Invalid password. Please try again.");
      break;
    case "auth/invalid-password-hash":
      errorMessage = ("Invalid password hash. Please try again.");
      break;
    case "auth/invalid-password-salt":
      errorMessage = ("Invalid password salt. Please try again.");
      break;
    case "auth/invalid-photo-url":
      errorMessage = ("Invalid photo URL. Please try again.");
      break;
    case "auth/invalid-provider-id":
      errorMessage = ("Invalid provider ID. Please try again.");
      break;
    case "auth/invalid-session-cookie-duration":
      errorMessage = ("Invalid session cookie duration. Please try again.");
      break;
    case "auth/invalid-uid":
      errorMessage = ("Invalid UID. Please try again.");
      break;
    case "auth/invalid-user-import":
      errorMessage = ("Invalid user import. Please try again.");
      break;
    case "auth/invalid-provider-data":
      errorMessage = ("Invalid provider data. Please try again.");
      break;
    case "auth/maximum-user-count-exceeded":
      errorMessage = ("Maximum user count exceeded. Please try again.");
      break;
    case "auth/missing-hash-algorithm":
      errorMessage = ("Missing hash algorithm. Please try again.");
      break;
    case "auth/missing-uid":
      errorMessage = ("Missing UID. Please try again.");
      break;
    case "auth/reserved-claims":
      errorMessage = ("Reserved claims. Please try again.");
      break;
    case "auth/session-cookie-revoked":
      errorMessage = ("Session cookie revoked. Please try again.");
      break;
    case "auth/uid-already-exists":
      errorMessage = ("UID already exists. Please try again.");
      break;
    case "auth/email-already-exists":
      errorMessage = ("Email already exists. Please try again.");
      break;
    case "auth/phone-number-already-exists":
      errorMessage = ("Phone number already exists. Please try again.");
      break;
    case "auth/project-not-found":
      errorMessage = ("Project not found. Please try again.");
      break;
    case "auth/insufficient-permission":
      errorMessage = ("Insufficient permission. Please try again.");
      break;
    case "auth/internal-error":
      errorMessage = ("Internal error. Please try again.");
      break;

    default:
      errorMessage = ("Oops! Something went wrong. Please try again later.");
      break;
    }
      return errorMessage
  }