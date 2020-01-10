import setupFirebaseApplication from './firebase-admin.application';

export function setupServiceProviders(){
    const adminSDK = setupFirebaseApplication();
    const adminAuth = adminSDK.auth();
    const dbInstance = adminSDK.firestore();

    return {
        adminAuth,
        dbInstance
    }
}