//
//  TipsiDropdownJSONItem.h
//  TipsiDropdown
//
//  Created by Dmytro Zavgorodniy on 12/8/16.
//  Copyright © 2016 Tipsi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <TPSDropDown/TPSDropDown.h>

@interface TipsiDropdownJSONItem : NSObject <TPSDropDownItem>

- (instancetype)initWithJSON:(NSDictionary *)JSON NS_DESIGNATED_INITIALIZER;

- (id)JSONValue;

@end
