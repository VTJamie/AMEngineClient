//
//  AMEngineBaseControl.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AMEngineBaseControl : UIView
{
    NSDictionary* definition;
    NSDictionary* rootdefinition;
}
@property (nonatomic, retain) NSDictionary* definition;
@property (nonatomic, retain) NSDictionary* rootdefinition;

- (id) initWithFrame:(CGRect)frame andJsonDefinition:(NSDictionary*) jsondefinition andRootDefinition:(NSDictionary*) root;

- (void) updateJsonDefinition:(NSDictionary*) jsondefinition;
- (void) addValueToDict:(NSMutableDictionary*) fieldlist;
- (void) addNameToDict:(NSMutableDictionary*) fieldlist;
@end
