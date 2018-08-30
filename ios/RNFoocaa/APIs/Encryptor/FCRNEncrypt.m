//
//  FCRNEncrypt.m
//  NewFookii
//
//  Created by Foocaa on 17/6/7.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "FCRNEncrypt.h"
#import "NSData+AES.h"
#import "NSData+Base64.h"
#import "NSString+Base64.h"
#import <React/RCTBridge.h>

@interface FCRNEncrypt ()<RCTBridgeModule>

@end

@implementation FCRNEncrypt


RCT_EXPORT_MODULE(EncryptModule);

RCT_EXPORT_METHOD(encrypt:(NSString *)text key:(NSString*)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  
  NSData *cipherData;
  NSString *base64Text;
  
  cipherData = [[text dataUsingEncoding:NSUTF8StringEncoding] AES256EncryptWithKey:key];
  base64Text = [cipherData base64EncodedString];
  if (base64Text.length == 0) {
    reject(@"-1",@"encrypt error",nil);
  }else{
    resolve(base64Text);
  }
  
}

RCT_EXPORT_METHOD(dencrypt:(NSString *)text key:(NSString*)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  
  NSData *cipherData;
  NSString *plainText;
  
  cipherData = [text base64DecodedData];
  plainText  = [[NSString alloc] initWithData:[cipherData AES256DecryptWithKey:key] encoding:NSUTF8StringEncoding];
  if (plainText.length == 0) {
    reject(@"-1",@"dencrypt error",nil);
  }else{
    resolve(plainText);
  }
  
}



@end
