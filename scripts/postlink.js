const rnpmlink = require('react-native-foocaa-link-scripts');

// Configure Android first.
//let promise = null
// if (rnpmlink.android.checkIfAndroidDirectoryExists()) {
//     console.log('Configuring AppCenter Analytics for Android');
//     promise = rnpmlink.android.initAppCenterConfig()
//         .then(() => {
//             rnpmlink.android.removeAndroidDuplicateLinks();
//         }).catch((e) => {
//             console.error(`Could not configure AppCenter for Android. Error Reason - ${e.message}`);
//             return Promise.resolve();
//         });
// } else {
//     promise = Promise.resolve();
// }

let promise = Promise.resolve();
// Then iOS even if Android failed.
if (rnpmlink.ios.checkIfAppDelegateExists()) {
    promise
        .then(() => {
            const code = 'BMKMapManager *mapManager = [[BMKMapManager alloc]init];  // Initialize BMKMapManager \n' +
              'BOOL ret = [self.mapManager start:AppKey  generalDelegate:nil];\n' +
              'if (!ret) { NSLog(@"manager start failed!"); }';
            return rnpmlink.ios.initInAppDelegate('#import <RNFoocaa/RNFoocaa.h>', code);
        })
        .catch((e) => {
            console.error(`Could not configure AppCenter for iOS. Error Reason - ${e.message}`);
            return Promise.resolve();
        });
}
return promise;
