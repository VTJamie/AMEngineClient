//
//  AMComplexItemListControl.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/16/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMEngineBaseControl.h"
#import "AssistedTableView.h"
#import "AMEngineDataManager.h"

@interface AMComplexItemListControl : AMEngineBaseControl <AssistedTableViewRowDelegate>
{
    AssistedTableView* tableview;
    NSDictionary* currentdata;
    UILabel* label;
    UIButton* addbutton;
    
}
@property (nonatomic, retain) AssistedTableView* tableview;
@property (nonatomic, retain) NSDictionary* currentdata;
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UIButton* addbutton;

- (void) dataManager: (AMEngineDataManager*)datamanager addButtonClickResponse:(NSDictionary *) response;
- (void) addButtonClick;
@end