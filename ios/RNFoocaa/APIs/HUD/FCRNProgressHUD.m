//
//  FCRNProgressHUD.m
//  Fookii
//
//  Created by Raymond on 2018/8/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "FCRNProgressHUD.h"
#import <React/RCTBridge.h>
#import "SVProgressHUD.h"

@interface FCRNProgressHUD ()<RCTBridgeModule>

@end

@implementation FCRNProgressHUD

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup{
  return YES;
}

- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}

- (instancetype)init{
  [SVProgressHUD setMinimumDismissTimeInterval:2];
  return [super init];
}

RCT_EXPORT_METHOD(showWithStatus:(NSString*)string mask:(BOOL)mask){
  [SVProgressHUD setDefaultMaskType:mask ? SVProgressHUDMaskTypeClear : SVProgressHUDMaskTypeNone];
  [SVProgressHUD showWithStatus:string];
}

RCT_EXPORT_METHOD(showProgress:(CGFloat)progress status:(NSString*)status mask:(BOOL)mask){
  [SVProgressHUD setDefaultMaskType:mask ? SVProgressHUDMaskTypeClear : SVProgressHUDMaskTypeNone];
  [SVProgressHUD showProgress:progress status:status];
}

RCT_EXPORT_METHOD(dismiss){
  [SVProgressHUD dismiss];
}

RCT_EXPORT_METHOD(dismissWithDelay:(NSTimeInterval)delay){
  [SVProgressHUD dismissWithDelay:delay];
}

RCT_EXPORT_METHOD(showInfoWithStatus:(NSString*)string mask:(BOOL)mask){
  [SVProgressHUD setDefaultMaskType:mask ? SVProgressHUDMaskTypeClear : SVProgressHUDMaskTypeNone];
  [SVProgressHUD showInfoWithStatus:string];
}

RCT_EXPORT_METHOD(showSuccessWithStatus:(NSString*)string mask:(BOOL)mask){
  [SVProgressHUD setDefaultMaskType:mask ? SVProgressHUDMaskTypeClear : SVProgressHUDMaskTypeNone];
  [SVProgressHUD showSuccessWithStatus:string];
}

RCT_EXPORT_METHOD(showErrorWithStatus:(NSString*)string mask:(BOOL)mask){
  [SVProgressHUD setDefaultMaskType:mask ? SVProgressHUDMaskTypeClear : SVProgressHUDMaskTypeNone];
  [SVProgressHUD showSuccessWithStatus:string];
}

@end
