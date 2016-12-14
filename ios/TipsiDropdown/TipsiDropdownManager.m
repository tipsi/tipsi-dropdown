//
//  TipsiDropdownManager.m
//  TipsiDropdown
//
//  Created by Anton Petrov on 24.10.16.
//  Copyright © 2016 Tipsi. All rights reserved.
//

#import "TipsiDropdownManager.h"

#import "TipsiDropdown.h"
#import "TipsiDropdownJSONItem.h"

#import "RCTFont.h"

@implementation TipsiDropdownManager

RCT_EXPORT_MODULE()

#pragma mark - View

- (UIView *)view
{
    return [[TipsiDropdown alloc] init];
}

#pragma mark - Properties

RCT_CUSTOM_VIEW_PROPERTY(items, NSArray<NSDictionary *>, __unused TipsiDropdown)
{
    NSMutableArray <id <TPSDropDownItem>> *items = [[NSMutableArray alloc] init];
    for (NSDictionary *JSONDictionary in json) {
        id <TPSDropDownItem> JSONItem = [[TipsiDropdownJSONItem alloc] initWithJSON:JSONDictionary];
        [items addObject:JSONItem];
    }
    
    view.items = [items copy];
}

RCT_CUSTOM_VIEW_PROPERTY(selectedIndex, NSInteger, __unused TipsiDropdown)
{
    view.selectedItemIndex = [RCTConvert NSInteger:json];
}

RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

#pragma mark - Properties (Appearance)

RCT_EXPORT_VIEW_PROPERTY(indicatorImage, UIImage)

// backgroundColor property sync in RCTViewManager

RCT_CUSTOM_VIEW_PROPERTY(fontFamily, NSString, TipsiDropdown)
{
    view.font = [RCTFont updateFont:view.font withFamily:json ?: defaultView.font.familyName];
}
RCT_CUSTOM_VIEW_PROPERTY(fontSize, NSNumber, TipsiDropdown)
{
    view.font = [RCTFont updateFont:view.font withSize:json ?: @(defaultView.font.pointSize)];
}

RCT_CUSTOM_VIEW_PROPERTY(fontWeight, NSString, __unused TipsiDropdown)
{
    view.font = [RCTFont updateFont:view.font withWeight:json]; // defaults to normal
}

RCT_CUSTOM_VIEW_PROPERTY(fontStyle, NSString, __unused TipsiDropdown)
{
    view.font = [RCTFont updateFont:view.font withStyle:json]; // defaults to normal
}

RCT_EXPORT_VIEW_PROPERTY(textAlignment, NSTextAlignment)

RCT_CUSTOM_VIEW_PROPERTY(separatorHeight, NSNumber, __unused TipsiDropdown)
{
    view.separatorWidth = [RCTConvert CGFloat:json];
}

RCT_EXPORT_VIEW_PROPERTY(separatorColor, UIColor)

RCT_CUSTOM_VIEW_PROPERTY(cornerRadius, NSNumber, __unused TipsiDropdown)
{
    view.cornerRadius = [RCTConvert CGFloat:json];
}

// borderWidth property sync in RCTViewManager

RCT_EXPORT_VIEW_PROPERTY(borderColor, UIColor)

RCT_EXPORT_VIEW_PROPERTY(textColor, UIColor)

@end
