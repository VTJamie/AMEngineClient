//
//  AMButtonControl.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "MercuryBaseControl.h"
#import "MercuryDataManager.h"

@interface AMButtonControl : MercuryBaseControl

@property (nonatomic, retain) UIButton* button;

- (void) dataManager:(MercuryDataManager*) datamanager responseSaveString:(NSDictionary *) response;
- (void) dataManager:(MercuryDataManager*) datamanager dialogSaveResponse:(NSDictionary *) response;
- (void) dataManager:(MercuryDataManager*) datamanager cancelresponse:(NSDictionary *) response;
- (void) buttonClick;
@end
