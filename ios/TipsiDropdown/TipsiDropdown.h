//
//  TipsiDropdown.h
//  TipsiDropdown
//
//  Created by Anton Petrov on 18.10.16.
//  Copyright © 2016 Tipsi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <TPSDropDown/TPSDropDown.h>

#import "UIView+React.h"

@interface TipsiDropdown : TPSDropDown

@property (nonatomic, copy) RCTBubblingEventBlock onChange;

@end
