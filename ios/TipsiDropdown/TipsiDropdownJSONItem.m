//
//  TipsiDropdownJSONItem.m
//  TipsiDropdown
//
//  Created by Dmytro Zavgorodniy on 12/8/16.
//  Copyright © 2016 Tipsi. All rights reserved.
//

#import "TipsiDropdownJSONItem.h"

@interface TipsiDropdownJSONItem ()

@property (nonatomic, strong) NSDictionary *JSON;

@end

@implementation TipsiDropdownJSONItem

#pragma mark - Initialization

- (instancetype)initWithJSON:(NSDictionary *)JSON {
    self = [super init];
    if (self) {
        _JSON = JSON;
    }
    return self;
}

- (instancetype)init {
    return [self initWithJSON:nil];
}

#pragma mark - Public

- (id)JSONValue {
    return [self.JSON valueForKey:@"value"];
}

#pragma mark - TPSDropDownItem

- (NSString *)title {
    return [self.JSON valueForKey:@"label"];
}

@end
