//
//  MercurySelectControl.m
//  Mercury
//
//  Created by Jamieson Abbott on 11/23/11.
//  Copyright (c) 2011 AM Interfaces. All rights reserved.
//

#import "AMSelectControl.h"
#import "AJComboBox.h"
#import "AMConstants.h"

@implementation AMSelectControl

@synthesize label;
@synthesize combobox;

- (id)initWithFrame:(CGRect)frame andJsonDefinition:(NSDictionary *)jsondefinition andRootDefinition:(NSDictionary *)root
{
    self = [super initWithFrame:frame andJsonDefinition:jsondefinition andRootDefinition:root];
    if (self)
    {
        float labelwidth = 0.0f;
        float selectwidth = 0.0f;
        if([[jsondefinition objectForKey:[AMConstants C:LABEL]] length] > 0)
        {
            labelwidth = (frame.size.width-4)/2.0f;
            selectwidth = labelwidth;
        }
        else 
        {
            labelwidth = 2.0f;
            selectwidth = (frame.size.width-4);
        }
        
        if([[jsondefinition objectForKey:[AMConstants C:LABEL]] length] > 0)
        {           
            label = [[UILabel alloc] initWithFrame:CGRectMake(2, 2, labelwidth, frame.size.height-4)];
            label.text = [jsondefinition objectForKey:[AMConstants C:LABEL]];
            label.numberOfLines = 0;
            label.lineBreakMode = UILineBreakModeWordWrap;
            label.font = [UIFont systemFontOfSize:14];
            [label sizeToFit];
            label.frame = CGRectMake(2, 2, labelwidth, label.frame.size.height);
            [self addSubview:label];            
        }


        combobox = [[AJComboBox alloc] initWithFrame:CGRectMake(labelwidth, 0, selectwidth, frame.size.height)];    
        NSMutableArray* selectarray = [[NSMutableArray alloc] init];
        NSArray* selectitems = [jsondefinition objectForKey:[AMConstants C:SELECT_ITEMS]];
        for(NSDictionary* selectitem in selectitems)
        {
            [selectarray addObject:[AJComboBoxItem 
                                     withLabel:[selectitem objectForKey:[AMConstants C:SELECT_ITEM_LABEL]] 
                                    andValue:[selectitem objectForKey:[AMConstants C:SELECT_ITEM_VALUE]]
                                     andSelected:[[selectitem objectForKey:[AMConstants C:SELECT_ITEM_IS_SELECTED]] boolValue]]];
        }
             
        NSString* displaytype = [jsondefinition objectForKey:[AMConstants C:SELECT_DISPLAY_TYPE]];
        combobox.singleselect = [displaytype compare:[AMConstants C:SELECT_DISPAY_TYPE_DROPDOWN]] == NSOrderedSame || [displaytype compare:[AMConstants C:SELECT_DISPAY_TYPE_RADIO]] == NSOrderedSame;
        combobox.arrayData = selectarray;
     
        [self addSubview:combobox];
    }
    return self;
}

-(void)didChangeComboBoxValue:(AJComboBox *)comboBox selectedIndex:(NSInteger)selectedIndex
{
    
}

- (void)addValueToDict:(NSMutableDictionary *)fieldlist
{
    for(AJComboBoxItem* comboitem in self.combobox.arrayData)
    {
        if(comboitem.isselected)
        {
            [fieldlist setObject:comboitem.value forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C:FIELD_PREFIX],[self.definition objectForKey:[AMConstants C:ID]]]];
        }
    }
}
@end
