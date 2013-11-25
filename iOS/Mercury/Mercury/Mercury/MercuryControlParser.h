//
//  MercuryControlParser.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AMTextFieldControl.h"
#import "AMButtonControl.h"
#import "AMGridViewControl.h"
#import "MercuryLayoutView.h"
#import "AMSelectControl.h"
#import "AMComplexItemListControl.h"

@interface MercuryControlParser : NSObject
+ (MercuryBaseControl *)parseJsonControl:(NSDictionary *)json withFrame:(CGRect) frame andRootDefinition:(NSDictionary*) rootdefinition;
@end
