//
//  AMGridViewControl.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/16/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "MercuryBaseControl.h"
#import "AssistedTableView.h"

@interface AMGridViewControl : MercuryBaseControl <AssistedTableViewRowDelegate>
{
    UILabel* label;
    AssistedTableView* tableview;
    NSDictionary* currentdata;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) AssistedTableView* tableview;
@property (nonatomic, retain) NSDictionary* currentdata;
@end
