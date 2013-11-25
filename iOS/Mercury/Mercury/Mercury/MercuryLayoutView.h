//
//  MercuryLayoutView.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryMain.h"

@class MercuryMain;

@interface MercuryLayoutView : UIScrollView

@property (nonatomic, retain) NSArray* childcontrols;
@property (nonatomic, retain) NSDictionary* rootdefinition;
@property (nonatomic, retain) MercuryMain* parentcontroller;

- (void) loadJSON: (NSDictionary*) currentviewjson withRootDefinition: root andClearChildren: (BOOL) clearchildren;
- (void) clearChildren;
- (NSMutableDictionary*) getFieldValues;
- (MercuryLayoutView*) getTopParent;
- (void) refreshControls;
- (void) dataManager:(MercuryDataManager*) datamanager refreshResponse:(NSString*) refreshresponse;
- (void) refreshControls:(NSArray*) controlarray;
@end
