//
//  AMGridViewControl.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/16/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMEngineBaseControl.h"
#import "AssistedTableView.h"

@interface AMGridViewControl : AMEngineBaseControl <AssistedTableViewRowDelegate>
{
    UILabel* label;
    AssistedTableView* tableview;
    NSDictionary* currentdata;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) AssistedTableView* tableview;
@property (nonatomic, retain) NSDictionary* currentdata;
@end
