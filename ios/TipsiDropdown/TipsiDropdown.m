//
//  TipsiDropdown.m
//  TipsiDropdown
//
//  Created by Anton Petrov on 18.10.16.
//  Copyright © 2016 Tipsi. All rights reserved.
//

#import "TipsiDropdown.h"

#import "TipsiDropdownJSONItem.h"

#import "RCTUtils.h"

@interface TipsiDropdown () <TPSDropDownDelegate>

@end

@implementation TipsiDropdown

#pragma mark - Initialization

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.delegate = self;
    }
    return self;
}

#pragma mark - TPSDropDownDelegate

- (void)dropDown:(TPSDropDown *)dropDown didSelectItemAtIndex:(NSInteger)index {
    if (_onChange) {
        id nextValue = nil;
        
        id nextItem = self.items[index];
        if ([nextItem isKindOfClass:[TipsiDropdownJSONItem class]]) {
            TipsiDropdownJSONItem *nextJSONItem = nextItem;
            nextValue = [nextJSONItem JSONValue];
        }
        
        _onChange(@{
                    @"newIndex": @(index),
                    @"newValue": RCTNullIfNil(nextValue),
                    });
    }
}

@end
