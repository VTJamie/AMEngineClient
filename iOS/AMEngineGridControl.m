//
//  AMEngineGridControl.m
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/25/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineGridControl.h"
#import "AMEngineLoadedController.h"
#import "AMEngineLookupControl.h"

@implementation AMEngineGridViewCell

@synthesize griddefinition;
@synthesize row;

- (id)initWithGridDefinition:(NSDictionary *)ingriddefinition andRowData:(NSDictionary *)inrow andReuseIdentifier: (NSString*) reuseidentifier
{
    self = [super initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseidentifier];
    if(self)
    {
        self.griddefinition = ingriddefinition;
        self.row = inrow;
    }
    return self;
}

- (void)drawRect:(CGRect)rect 
{
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    // Use the same color and width as the default cell separator for now
    CGContextSetRGBStrokeColor(ctx, 0.0, 0.0, 0.0, 1.0);
    CGContextSetLineWidth(ctx, 0.25);
    
    CGContextMoveToPoint(ctx, 0, 0);
    CGContextAddLineToPoint(ctx, rect.size.width, 0);
    
    CGContextMoveToPoint(ctx, 0, rect.size.height);
    CGContextAddLineToPoint(ctx, rect.size.width, rect.size.height);
    
    CGContextMoveToPoint(ctx, 1, 0);
    CGContextAddLineToPoint(ctx, 1, rect.size.height);
    
    CGContextMoveToPoint(ctx, rect.size.width-1, 0);
    CGContextAddLineToPoint(ctx, rect.size.width-1, rect.size.height);    
    
    NSArray* columns = [self.griddefinition objectForKey:@"columns"];
    for (int i = 1; i < columns.count; i++) 
    {
        CGFloat f = (self.frame.size.width / columns.count) * i;        
        CGContextMoveToPoint(ctx, f, 0);
        CGContextAddLineToPoint(ctx, f, rect.size.height);        
    }
    
    CGContextStrokePath(ctx);
    
    [super drawRect:rect];
}

- (BOOL)isOpaque
{
    return NO;
}
@end

@implementation AMEngineGridControl

@synthesize label;
@synthesize tableview;
@synthesize data;

-(id)initWithDefinition:(NSDictionary *)indefinition andParent:(AMEngineBaseUIView *)inparent
{
    self = [super initWithDefinition:indefinition andParent:inparent];
    if(self)
    {
        self.frame = CGRectMake(0, 0, 754, 300);
        NSString* labelformat = [self.definition objectForKey:@"lf"];
        if([labelformat compare:@"None"] != NSOrderedSame)
        {
            
            self.label = [[UILabel alloc] initWithFrame:CGRectMake(2, 2, 150, 25)];
            self.label.text = [self.definition objectForKey:@"l"];
        }
        self.tableview = [[UITableView alloc] initWithFrame:CGRectMake(152, 2, 600, 300) style:UITableViewStylePlain];
        self.tableview.delegate = self;
        self.tableview.dataSource = self;
        self.data = [self.definition objectForKey:@"r"];
        [self.tableview reloadData];
        [self addSubview:self.label];
        [self addSubview:self.tableview];
    }
    return self;
}

- (void) layoutSubviews
{
    if(self.label == nil)
    {    
        self.tableview.frame = CGRectMake(0, self.tableview.frame.origin.y, self.frame.size.width, 300);
    }
    else
    {
        float fifthofthewidth = (self.frame.size.width-4) / 5;
        self.label.frame = CGRectMake(2, 2, fifthofthewidth, 25);
        self.tableview.frame = CGRectMake(fifthofthewidth, 2, fifthofthewidth*4, 300);
    }
    
    [self.tableview reloadData];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [[self.data objectForKey:@"rows"] count] + 1;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    AMEngineGridViewCell* newcell = (AMEngineGridViewCell*)[tableView dequeueReusableCellWithIdentifier:@"Cell"];
    if(newcell == nil)
    {
        newcell = [[AMEngineGridViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"Cell"];
    }
    newcell.griddefinition = self.definition;
    
    for(UIView* curview in [newcell.contentView subviews])
    {        
        [curview removeFromSuperview];        
    }
    
    NSArray* columns = [newcell.griddefinition objectForKey:@"columns"];
    
    newcell.contentView.frame = CGRectMake(0, 0, tableView.frame.size.width, newcell.frame.size.height); 
    CGFloat cellwidth = newcell.contentView.frame.size.width / columns.count;
    CGFloat cellheight = newcell.contentView.frame.size.height - 4;
    
    for (int i = columns.count-1; i >= 0; i--) 
    {
        if( indexPath.row == 0)
        {
            UILabel* celllabel = [[UILabel alloc] initWithFrame:CGRectMake(cellwidth * i + 2, 2, cellwidth-4, cellheight)];
            celllabel.textAlignment = UITextAlignmentCenter;
            celllabel.font = [UIFont fontWithName:@"Arial" size:12];
            celllabel.text = [[columns objectAtIndex:i] objectForKey:@"l"];
            [newcell.contentView addSubview:celllabel];
        }
        else
        {
            NSDictionary* curcolumndef = [[self.definition objectForKey:@"columns"] objectAtIndex:i];
            NSString* columntype = [curcolumndef objectForKey:@"t"];
            if([columntype compare:@"Display"] == NSOrderedSame)
            {
                UILabel* celllabel = [[UILabel alloc] initWithFrame:CGRectMake(cellwidth * i + 2, 2, cellwidth-4, cellheight)];
                celllabel.textAlignment = UITextAlignmentCenter;
                celllabel.font = [UIFont fontWithName:@"Arial" size:12];
                NSString* cellvalue = [NSString stringWithFormat:@"%@", [[[[self.data objectForKey:@"rows"] objectAtIndex:indexPath.row-1] objectForKey:@"cell"] objectAtIndex:i]];
                celllabel.text = cellvalue;
                [newcell.contentView addSubview:celllabel];
            }
            else if([columntype compare:@"Delete"] == NSOrderedSame)
            {
                UIButton* actionbutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
                actionbutton.frame = CGRectMake(cellwidth * i + 2, 2, cellwidth-4, cellheight);
                [actionbutton setBackgroundColor:[UIColor colorWithRed:1.0f green:1.0f blue:1.0f alpha: 1]];
                [actionbutton setTitleColor:[UIColor colorWithRed:0.5f green:0.5f blue:1.0f alpha: 1] forState:UIControlStateNormal];
                [actionbutton setTitle:@"Delete" forState:UIControlStateNormal];
                [newcell.contentView addSubview:actionbutton];

            }
            else if([columntype compare:@"Preview"] == NSOrderedSame)
            {
                UIButton* actionbutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
                actionbutton.frame = CGRectMake(cellwidth * i + 2, 2, cellwidth-4, cellheight);
                [actionbutton setBackgroundColor:[UIColor colorWithRed:1.0f green:1.0f blue:1.0f alpha: 1]];
                [actionbutton setTitleColor:[UIColor colorWithRed:0.5f green:0.5f blue:1.0f alpha: 1] forState:UIControlStateNormal];
                [actionbutton setTitle:@"Preview" forState:UIControlStateNormal];
                [newcell.contentView addSubview:actionbutton];
            }
        }
    }
    return newcell;
}

- (NSIndexPath*)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if(indexPath.row == 0)
    {    
        return nil;
    }
    else
    {
        return indexPath;
    }
}

+(void) runSearch:(NSString*) searchgroup withParentGroup:(AMEngineBaseUIView*) group
{
    AMEngineGridControl* gridcontrol = [AMEngineGridControl getGridControlWithSearchGroup:searchgroup underGroup:group];
    if(gridcontrol != nil)
    {
        [gridcontrol executeSearch];
    }
}

- (void) executeSearch
{
    NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];   
    [postdata setValue:[self.definition objectForKey:@"context"] forKey:@"context"];
    [postdata setValue:[self.definition objectForKey:@"contextName"] forKey:@"contextName"];
    [postdata setValue:@"1" forKey:@"page"];
    [postdata setValue:@"10" forKey:@"rows"];
    [postdata setValue:[self.definition objectForKey:@"searchgroup"] forKey:@"searchgroup"];
    [postdata setValue:@"Contract Number" forKey:@"sidx"];
    [postdata setValue:@"asc" forKey:@"sord"];
    [postdata addEntriesFromDictionary:[[self getHighestParent] getValues]];
    
    [AMEngineLoadedController sendRequest:postdata withURL:@"/SpotESPageT1.aspx" withTarget:self andSelector:@selector(getNewGridData:)];     
}

- (void) getNewGridData: (NSDictionary*) jsondata
{    
    self.data = jsondata;
    [self.tableview reloadData];    
}

+ (AMEngineGridControl*) getGridControlWithSearchGroup:(NSString*)searchgroup underGroup: (AMEngineBaseUIView*) group
{
    for (AMEngineBaseUIView* curview in group.subgroups) 
    {
        NSString* dictsearchgroup = [curview.definition objectForKey:@"searchgroup"];     
        if([[curview class] isSubclassOfClass:[AMEngineGridControl class]] 
           && 
           [dictsearchgroup compare:searchgroup] == NSOrderedSame)
        {
            return (AMEngineGridControl*)curview;
        }
        else if([[curview class] isSubclassOfClass:[AMEngineGroup class]])
        {
            AMEngineGridControl* gridcontrolfound = [AMEngineGridControl getGridControlWithSearchGroup:searchgroup underGroup:curview];
            if(gridcontrolfound != nil)
            {
                return gridcontrolfound;
            }            
        }
    }
    return nil;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    id<AMEngineLookupDelegate> lookupdelegate = [self.definition objectForKey:@"lookupdelegate"];
    if(lookupdelegate != nil)
    {
        [lookupdelegate lookupValueSelected:[[[self.data objectForKey:@"rows"] objectAtIndex:indexPath.row-1] objectForKey:@"id"] andContext:[self.definition objectForKey:@"context"]];
    }
}

- (void) replaceWithDefinition:(NSDictionary *)indefinition
{
    [super replaceWithDefinition:indefinition];
    [self.definition setValue:[self.olddefinition  objectForKey:@"lookupdelegate"] forKey:@"lookupdelegate"];
}

@end
