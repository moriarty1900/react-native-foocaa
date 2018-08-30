//
//  NSString+HMAC_SHA1.m
//  HMAC_SHA1
//
//  Created by Elliott on 14-7-25.
//  Copyright (c) 2014年 xujialiang. All rights reserved.
//

#import "NSString+HMAC_SHA1.h"
#include <CommonCrypto/CommonDigest.h>
#include <CommonCrypto/CommonHMAC.h>

@implementation NSString (HMAC_SHA1)

- (NSString *)HmacSha1WithSecret:(NSString *)key {
    
    const char *cKey  = [key cStringUsingEncoding:NSASCIIStringEncoding];
    const char *cData = [self cStringUsingEncoding:NSASCIIStringEncoding];
    
    unsigned char cHMAC[CC_SHA1_DIGEST_LENGTH];
    
    CCHmac(kCCHmacAlgSHA1, cKey, strlen(cKey), cData, strlen(cData), cHMAC);
    
    NSData *HMAC = [[NSData alloc] initWithBytes:cHMAC length:sizeof(cHMAC)];
    
    NSString *hash = [HMAC base64Encoding];
    
    return hash;
}

+ (NSString *)hmacSha1:(NSString*)key text:(NSString*)text
{
    
    const char *cKey  = [key cStringUsingEncoding:NSUTF8StringEncoding];
    
    
    
    const char *cData = [text cStringUsingEncoding:NSUTF8StringEncoding];
    
    
    
    uint8_t cHMAC[CC_SHA1_DIGEST_LENGTH];
    
    
    
    CCHmac(kCCHmacAlgSHA1, cKey, strlen(cKey), cData, strlen(cData), cHMAC);
    
    
    //NSData *HMAC = [[NSData alloc] initWithBytes:cHMAC length:CC_SHA1_DIGEST_LENGTH];
    
    
    
    NSString *hash;
    
    
    NSMutableString * output = [NSMutableString stringWithCapacity:CC_SHA1_DIGEST_LENGTH * 2];
    
    
    
    for(int i = 0; i < CC_SHA1_DIGEST_LENGTH; i++)
        
        
        
        [output appendFormat:@"%02x", cHMAC[i]];
    
    
    
    hash = output;
    
    
    
    return hash;
    
    
}
@end
