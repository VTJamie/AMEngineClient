//
//  AMEngineLayoutView.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineMain.h"

@class AMEngineMain;

@interface AMEngineLayoutView : UIScrollView

@property (nonatomic, retain) NSArray* childcontrols;
@property (nonatomic, retain) NSDictionary* rootdefinition;
@property (nonatomic, retain) AMEngineMain* parentcontroller;

- (void) loadJSON: (NSDictionary*) currentviewjson withRootDefinition: root andClearChildren: (BOOL) clearchildren;
- (void) clearChildren;
- (NSMutableDictionary*) getFieldValues;
- (AMEngineLayoutView*) getTopParent;
- (void) refreshControls;
- (void) dataManager:(AMEngineDataManager*) datamanager refreshResponse:(NSString*) refreshresponse;
- (void) refreshControls:(NSArray*) controlarray;
@end
