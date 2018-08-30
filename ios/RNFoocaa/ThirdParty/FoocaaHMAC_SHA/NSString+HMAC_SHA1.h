//
//  NSString+HMAC_SHA1.h
//  HMAC_SHA1
//
//  Created by Elliott on 14-7-25.
//  Copyright (c) 2014年 xujialiang. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (HMAC_SHA1)

//- (NSString *)HmacSha1WithSecret:(NSString *)key;

/**
 *  加密
 *
 *  @param key  秘钥
 *  @param text 要加密的字段
 *
 *  @return <#return value description#>
 */
+ (NSString *)hmacSha1:(NSString*)key text:(NSString*)text;//这个才是我们需要用的-thomas

@end
