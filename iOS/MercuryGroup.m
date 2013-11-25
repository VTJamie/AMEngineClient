//
//  MercuryGroup.m
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/20/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "MercuryGroup.h"
#import "MercuryTextControl.h"
#import "MercurySelectControl.h"
#import "MercuryDateControl.h"
#import "MercuryGridControl.h"
#import "MercuryButtonControl.h"
#import "MercuryLookupControl.h"
#import "MercuryAutoSuggestControl.h"

@implementation MercuryConfirmTabView

-(void) layoutSubviews
{
    NSInteger curxpos = 0;
    NSInteger curypos = 0;
    for(MercuryBaseUIView* curview in self.subgroups)
    {
        curview.frame = CGRectMake(0, 0, self.frame.size.width, curview.frame.size.height);
        [curview layoutSubviews];
        NSInteger newypos = curypos + curview.frame.size.height;
        curview.frame = CGRectMake(curxpos, curypos, curview.frame.size.width, curview.frame.size.height);
        curypos = newypos;
    }       
}

@end

@implementation MercuryAccordionHeader

@synthesize associatedgroup;

- (id) initWithFrame:(CGRect)frame
{
 self =  [super initWithFrame:frame];
    if(self)
    {
        self.frame = frame;
        [self addTarget:self action:@selector(headerClick) forControlEvents:UIControlEventTouchUpInside];
                    }
    return self;
}

- (void) headerClick
{      
    if( self.associatedgroup.hidden)
    {
        associatedgroup.hidden = NO;
    }
    else
    {       
        self.associatedgroup.hidden = YES;
    }
            [self.associatedgroup.superview layoutSubviews];
}

@end

@implementation MercuryTabButton

@synthesize associatedgroup;

- (id) initWithFrame:(CGRect)frame
{
    self =  [super initWithFrame:frame];//[UIButton buttonWithType:UIButtonTypeCustom];//[super initWithFrame:frame];
    if(self)
    {
        [self addTarget:self action:@selector(headerClick) forControlEvents:UIControlEventTouchUpInside];
       
        UIImage* bgimage = [UIImage imageNamed:@"ui-bg_glass_75_dadada_1x400.png"];
        [self setBackgroundImage:bgimage forState:UIControlStateNormal];
        
        [self setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
        [self setBackgroundColor:[UIColor blueColor]];
    }
    return self;
}

- (void) headerClick
{      
    if( self.associatedgroup.hidden)
    {
        for(UIView* curview in self.associatedgroup.superview.subviews)
        {
            if([[curview class] isSubclassOfClass:[MercuryTabButton class]])
            {
                MercuryTabButton* curtabbutton = (MercuryTabButton*)curview;
                curtabbutton.associatedgroup.hidden = YES;  
            }
        }
        self.associatedgroup.hidden = NO;

    }    
    [self.associatedgroup layoutSubviews];
}

@end

@implementation MercuryGroup

- (id)initWithDefinition:(NSDictionary *)indefinition andParent:(MercuryBaseUIView *)inparent
{
    self = [super initWithDefinition:indefinition andParent:inparent];
    if(self)
    {
        self.backgroundColor = [UIColor whiteColor];
        NSArray* childobjects = [self.definition objectForKey:@"c"];
        NSString* curgrouptype = [self.definition objectForKey:@"t"];
        BOOL firstchildfound = NO;
        for(NSDictionary* jsonobj in childobjects)
        {
            [jsonobj setValue:[indefinition objectForKey:@"context"] forKey:@"context"];
            [jsonobj setValue:[indefinition objectForKey:@"contextName"] forKey:@"contextName"];
            NSString* typestring = [jsonobj objectForKey:@"gt"];
            
            if([typestring compare:@"g"] == NSOrderedSame)
            {
                UIView* processedview = [[MercuryGroup alloc] initWithDefinition:jsonobj andParent:self];
                if(processedview != nil)
                {
                    if([curgrouptype compare:@"Wizard"] == NSOrderedSame || [curgrouptype compare:@"Tabs"] == NSOrderedSame)
                    {
                        processedview.hidden = firstchildfound;                        
                    }
                    firstchildfound = YES;
                    [self.subgroups addObject:processedview];
                    [self addSubview:processedview];
                }
            }
            else if([typestring compare:@"c"] == NSOrderedSame)
            {       
                UIView* processedview = [self processControl:jsonobj];
                if(processedview != nil)
                {
                    [self.subgroups addObject:processedview];
                    [self addSubview:processedview];
                }
            }           
        }    
    }
    return self;
}

-(UIView*)processControl:(NSDictionary *)control
{
    NSString* typestring = [control objectForKey:@"t"]; 
    [control setValue:[self.definition objectForKey:@"context"] forKey:@"context"];
    [control setValue:[self.definition objectForKey:@"contextName"] forKey:@"contextName"];
    
    if([typestring compare:@"text"] == NSOrderedSame)
    {       
        return [[MercuryTextControl alloc] initWithDefinition:control andParent:self];
    }   
    else  if([typestring compare:@"date"] == NSOrderedSame)
    {        
        return [[MercuryDateControl alloc] initWithDefinition:control andParent:self];
    }
    else if([typestring compare:@"dropdownlist"] == NSOrderedSame || [typestring compare:@"multiselect"] == NSOrderedSame)
    {
        return [[MercurySelectControl alloc] initWithDefinition:control andParent:self];
    }
    
    else if([typestring compare:@"grid"] == NSOrderedSame)
    {
        return [[MercuryGridControl alloc] initWithDefinition:control andParent:self];
    }       
    else if([typestring compare:@"button"] == NSOrderedSame)
    {
        return [[MercuryButtonControl alloc] initWithDefinition:control andParent:self];
    }
    else if([typestring compare:@"lookup"] == NSOrderedSame)
    {
        return [[MercuryLookupControl alloc] initWithDefinition:control andParent:self];
    }
    else if([typestring compare:@"autosuggest"] == NSOrderedSame)
    {
        return [[MercuryAutoSuggestControl alloc] initWithDefinition:control andParent:self];
    } 
    return nil;
}

- (void)layoutSubviews
{     
    NSString* grouptype = [self.definition objectForKey:@"t"];
    for(UIView* curview in self.subviews)
    {
        [curview removeFromSuperview];
    }
    if([grouptype compare:@"Table"] == NSOrderedSame)
    {
        [self DoTableLayout];
    }
    else if([grouptype compare:@"Accordion"] == NSOrderedSame)
    {
        [self DoAccordionLayout];
    }
    else if([grouptype compare:@"Wizard"] == NSOrderedSame || [grouptype compare:@"Tabs"] == NSOrderedSame)
    {
        [self DoWizardOrTabLayout];
    }
    
}

- (void) DoTableLayout
{
    NSInteger curxpos = 0;
    NSInteger numcolumns = [[self.definition objectForKey:@"o"] integerValue];
    NSInteger numviews = self.subgroups.count;
    NSInteger numrows = (numviews / numcolumns) + 1;
    NSInteger height = 0;   
    
    float colwidth = self.frame.size.width / numcolumns;
    
    for(int row = 0; row < numrows; row++)
    {           
        NSInteger maxheight = 0;
        for(int column = 0; column < numcolumns && (row * numcolumns) + column < numviews; column++)
        {
            MercuryBaseUIView* curview = [self.subgroups objectAtIndex:(row * numcolumns) + column];
            NSString* grouptype = [curview.definition objectForKey:@"gt"];
            NSInteger addtitleheight = 0;
            if([grouptype compare:@"g"] == NSOrderedSame)
            {
                addtitleheight = 25;   
            }
            
            if(curview.frame.size.height + addtitleheight > maxheight)
            {
                maxheight = curview.frame.size.height + addtitleheight;
            }
        }
        
        for(int column = 0; column < numcolumns && (row * numcolumns) + column < numviews; column++)
        {
            MercuryBaseUIView* curview = [self.subgroups objectAtIndex:(row * numcolumns) + column];
            
            NSString* grouptype = [curview.definition objectForKey:@"gt"];
            NSInteger titleheight = 0;
            if([grouptype compare:@"g"] == NSOrderedSame)
            {               
                NSString* title = [curview.definition objectForKey:@"l"];
                if(title.length > 0)
                {
                    UILabel* titlelabel = [[UILabel alloc] initWithFrame:CGRectMake(0, height, colwidth, 25)];
                    titlelabel.text = title;
                    [self addSubview:titlelabel];
                    titleheight = 25;
                }
            }
            
            [self addSubview:curview];
            curview.frame = CGRectMake(curxpos, height + titleheight, colwidth, curview.frame.size.height);
            [curview layoutSubviews];            
            curxpos = column * colwidth;        
        }    
        height = height + maxheight;
    }
    self.frame = CGRectMake(self.frame.origin.x, self.frame.origin.y, self.frame.size.width, height);
}

- (void) DoAccordionLayout
{
    float height = 0.0f;
    for(MercuryBaseUIView* curview in self.subgroups)
    {        
        MercuryAccordionHeader* headerbutton = [[MercuryAccordionHeader alloc] initWithFrame:CGRectMake(0, height, curview.frame.size.width, 25)];
        
        UILabel* headerlabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, curview.frame.size.width, 25)];
        headerbutton.backgroundColor = [UIColor colorWithRed:0.5f green:0.5f blue:1.0f alpha:1.0f];
        headerbutton.associatedgroup = curview;
        [headerbutton addSubview:headerlabel];
        [self addSubview:headerbutton];
        
        headerlabel.text = [curview.definition objectForKey:@"l"];
        height = height + 25;
        [self addSubview:curview];
        if(!curview.hidden)
        {
            curview.frame = CGRectMake(0, height, self.frame.size.width, curview.frame.size.height);
            [curview layoutSubviews];            
            
            height = height + curview.frame.size.height;
        }
    }   
    self.frame = CGRectMake(self.frame.origin.x, self.frame.origin.y, self.frame.size.width, height);
}

- (void) DoWizardOrTabLayout
{
    float tabwidth = self.frame.size.width / (self.subgroups.count+1) - 4;
    float tabcurposition = 0.0f;
    float maxheight = 0.0f;
    for(MercuryBaseUIView* curview in self.subgroups)
    {        
        MercuryTabButton* headerbutton = [[MercuryTabButton alloc] initWithFrame:CGRectMake(tabcurposition+2, 0, tabwidth, 50)];
        tabcurposition += tabwidth+2;        
        headerbutton.associatedgroup = curview;        
        [self addSubview:headerbutton];
        
        [headerbutton setTitle:[curview.definition objectForKey:@"l"] forState:UIControlStateNormal];
        
        [self addSubview:curview];
        
        if(!curview.hidden)
        {
            curview.frame = CGRectMake(0, 50, self.frame.size.width, curview.frame.size.height);
            [curview layoutSubviews];                         
        }        
        if(curview.frame.size.height+50 > maxheight)
        {
            maxheight = curview.frame.size.height+50;
        }
    }   
    
    MercuryTabButton* headerbutton = [[MercuryTabButton alloc] initWithFrame:CGRectMake(tabcurposition+2, 0, tabwidth, 50)];
    tabcurposition += tabwidth+2;        
    //headerbutton.associatedgroup = curview;        
    [headerbutton setTitle:@"Confirm" forState:UIControlStateNormal];
    [self addSubview:headerbutton];
    
    self.frame = CGRectMake(self.frame.origin.x, self.frame.origin.y, self.frame.size.width, maxheight+50);
}

@end
