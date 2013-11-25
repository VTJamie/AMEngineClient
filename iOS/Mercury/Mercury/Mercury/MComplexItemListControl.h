//
//  AMComplexItemListControl.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/16/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "MercuryBaseControl.h"
#import "AssistedTableView.h"
#import "MercuryDataManager.h"

@interface AMComplexItemListControl : MercuryBaseControl <AssistedTableViewRowDelegate>
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

- (void) dataManager: (MercuryDataManager*)datamanager addButtonClickResponse:(NSDictionary *) response;
- (void) addButtonClick;
@end