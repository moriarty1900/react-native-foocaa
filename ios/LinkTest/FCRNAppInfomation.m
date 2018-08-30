//
//  FCRNAppInfomation.m
//  eggcare
//
//  Created by pg on 2018/6/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "FCRNAppInfomation.h"
#import <React/RCTBridgeModule.h>

@interface FCRNAppInfomation ()<RCTBridgeModule>


@end


@implementation FCRNAppInfomation

RCT_EXPORT_MODULE(AppInfoModule);

RCT_REMAP_METHOD(getVersion,
                 getVersionWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
  NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
  resolve(version);
}




@end
