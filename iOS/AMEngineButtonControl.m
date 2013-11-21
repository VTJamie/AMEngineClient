//
//  AMEngineButtonControl.m
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/26/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineButtonControl.h"
#import "AMEngineLoadedController.h"

@implementation AMEngineButtonControl

@synthesize selectbutton;

-(id)initWithDefinition:(NSDictionary *)indefinition andParent:(AMEngineBaseUIView *)inparent
{
    self = [super initWithDefinition:indefinition andParent:inparent];
    if(self)
    {
        self.frame = CGRectMake(0, 0, 154, 40);
        self.selectbutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
        [self.selectbutton setTitle:[self.definition objectForKey:@"l"] forState:UIControlStateNormal];
        self.selectbutton.frame = CGRectMake(0, 0, 150, 40);
        [self.selectbutton addTarget:self action:@selector(buttonClick) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:self.selectbutton];
    }
    return self;
}

- (void) buttonClick
{
    NSString* buttontype = [self.definition objectForKey:@"buttontype"];
    if([buttontype compare:@"Search"] == NSOrderedSame)
    {
        for(NSString* searchgroup in [self.definition objectForKey:@"s"])
        {        
            [AMEngineGridControl runSearch:searchgroup withParentGroup:[self getHighestParent]];
        }
    }
}

- (void) layoutSubviews
{
    self.selectbutton.frame = CGRectMake(0, 0, self.frame.size.width-4, 40);
}
@end
