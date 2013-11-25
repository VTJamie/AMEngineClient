//
//  AssistedViewController.m
//  AssistedViewController
//
//  Created by Jamieson Abbott on 2/12/11.
//  Copyright 2011 Assisted. All rights reserved.
//

#import "AssistedTableView.h"
#import "AssistedUITableViewCell.h"
@implementation AssistedTableView

@synthesize controls;

- (id) initWithFrame:(CGRect)frame style:(UITableViewStyle)style
{
    self = [super initWithFrame:frame style:style];
    if(self)
    {
        self.controls = [[NSMutableDictionary alloc] init];  
        self.delegate = self;
        self.dataSource = self;    
    }
    return self;
}

- (void) tableView:(UITableView *)tableview didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    AssistedMethodContainer* controlmethod = [self getAssistedMethod:indexPath.section];
    
   if(controlmethod != nil)
   {
       [controlmethod.target forTableViewController:self didSelectRowAtIndexPath:indexPath];
   }    
}

- (void) addTarget: (id) target andSectionTitle: sectiontitle andAccessoryType: (UITableViewCellAccessoryType) accessorytype andSelectionType: (UITableViewCellSelectionStyle) selectionType inSection: (NSInteger) section andHeight: (CGFloat) height
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];    
    //    [target performSelector:createmethod];    
    
    if([self.controls objectForKey:sectionString] == nil)
    {
        [self.controls setValue: [[AssistedMethodContainer alloc] initWithTarget:target andSectionTitle: sectiontitle andAccessoryType:accessorytype andSelectionType: selectionType andHeight:height] forKey:sectionString];
    }
}

- (AssistedMethodContainer*) getAssistedMethod: (NSInteger) section
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];       
    
    if([[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[AssistedMethodContainer class]])
    {
        return [self.controls objectForKey:sectionString];
    }
    else        
    {
        return nil;
    }
}

- (void) addObject: (UIView*) addview inSection: (NSInteger) section inRow: (NSInteger) row andHeight:(CGFloat) height
{
    [self addObject:addview andSectionTitle:nil andAccessoryType:UITableViewCellAccessoryNone andSelectionType:UITableViewCellSelectionStyleNone inSection:section inRow:row andHeight:height];
}

- (void) addObject: (UIView*) addview andSectionTitle: sectiontitle andAccessoryType: (UITableViewCellAccessoryType) accessorytype andSelectionType:(UITableViewCellSelectionStyle) selectionstyle inSection: (NSInteger) section inRow: (NSInteger) row andHeight: (CGFloat) height
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];    
    NSString* rowString = [NSString stringWithFormat:@"%d", row];
    
    if([self.controls objectForKey:sectionString] == nil)
    {
        [self.controls setValue:[[AssistedSectionControlContainer alloc] initWithSectionTitle:sectiontitle andHeight:height] forKey:sectionString];
    }
    
    if([[[self.controls objectForKey:sectionString] class ]isSubclassOfClass:[AssistedSectionControlContainer class]])
    {
        AssistedSectionControlContainer* cursection = [self.controls objectForKey:sectionString];
        if([cursection.controls objectForKey:rowString] == nil)
        {
            [cursection.controls setValue:[[AssistedControlContainer alloc] initWithAccessoryType:accessorytype andSelectionType:selectionstyle] forKey:rowString];
        }                
        
        AssistedControlContainer* controlcontainer = [cursection.controls objectForKey:rowString];
        [controlcontainer.controls addObject: addview];    
    }
}

- (AssistedControlContainer*) getControlsInSection: (NSInteger) section inRow: (NSInteger) row
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];    
    NSString* rowString = [NSString stringWithFormat:@"%d", row];       
    
    if(
       self.controls == nil || 
       [self.controls objectForKey:sectionString] == nil ||
       ![[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[AssistedSectionControlContainer class]]
       )
    {
        return nil;
    }        
    
    return [((AssistedSectionControlContainer*)[self.controls objectForKey:sectionString]).controls objectForKey:rowString];
}

- (UITableViewCell *)tableView:(UITableView *)tableview cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    AssistedUITableViewCell* newcell = (AssistedUITableViewCell*)[tableview dequeueReusableCellWithIdentifier:@"AssistedTableViewCell"];
    if (newcell == nil) 
    {               
        newcell = [[AssistedUITableViewCell alloc] initWithParent:self andReuseIdentifier:@"AssistedTableViewCell"];          
    }                          
    newcell.frame = CGRectMake(newcell.frame.origin.x, newcell.frame.origin.y, newcell.frame.size.width, [self getSectionHeight:indexPath.section]);
    
       
    AssistedControlContainer* controlcontainer = [self getControlsInSection:indexPath.section inRow:indexPath.row];
    if(controlcontainer != nil)
    {        
        newcell.selectionStyle = controlcontainer.selectionType;   
        newcell.accessoryType = controlcontainer.accessoryType;         
        for(int i = 0; i < controlcontainer.controls.count; i++)
        {
            UIView* curview = [controlcontainer.controls objectAtIndex:i];        
            [newcell addSubview:curview];
        }                
    }
    else
    {
        AssistedMethodContainer* controlmethod = [self getAssistedMethod:indexPath.section];
       
        newcell.accessoryType = controlmethod.accessoryType;
        newcell.selectionStyle = controlmethod.selectionType;           
       
        [controlmethod.target forTableViewController:self cellToFill:newcell atIndexPath:indexPath];
        
    }
    
    return newcell;
}

- (NSInteger) numberOfSectionsInTableView:(UITableView *)tableview
{
    return self.controls.count;
}

- (NSInteger) tableView:(UITableView *)tableview numberOfRowsInSection:(NSInteger)section
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];
    
    if([[[self.controls objectForKey:sectionString] class ]isSubclassOfClass:[AssistedSectionControlContainer class]])
    {
        AssistedSectionControlContainer* cursection = [self.controls objectForKey:sectionString];
        return cursection.controls.count;
    }
    else if([[[self.controls objectForKey:sectionString] class ]isSubclassOfClass:[AssistedMethodContainer class]])
    {
        AssistedMethodContainer* methcontainer = [self.controls objectForKey:sectionString];
        return [methcontainer.target numberOfRowsInSection:section];              
    }
    else
    {
        return 0;
    }
}

- (NSString*)tableView:(UITableView *)tableview titleForHeaderInSection:(NSInteger)section
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];
    if([[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[AssistedSectionControlContainer class]])
    {
        AssistedSectionControlContainer* cursection = [self.controls objectForKey:sectionString];
        return cursection.sectionName;
    }
    else if([[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[AssistedMethodContainer class]])
    {
        AssistedMethodContainer* cursection = [self.controls objectForKey:sectionString];        
        return cursection.sectionName;
    }
    else
    {
        return nil;
    }
}

- (CGFloat)tableView:(UITableView *)tableview heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return [self getSectionHeight:indexPath.section];
}

- (CGFloat) getSectionHeight:(NSInteger) section
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section ];
    if([[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[AssistedSectionControlContainer class]])
    {
        AssistedSectionControlContainer* cursection = [self.controls objectForKey:sectionString];
        return cursection.height;
    }
    else if([[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[AssistedMethodContainer class]])
    {
        AssistedMethodContainer* cursection = [self.controls objectForKey:sectionString];        
        return cursection.height;
    }
    else
    {
        return 50;
    }
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
	return YES;
}

- (BOOL)tableView:(UITableView *)tableview canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    AssistedMethodContainer* controlmethod = [self getAssistedMethod:indexPath.section];
    
    if(controlmethod != nil && [controlmethod.target respondsToSelector:@selector(canEditRowAtIndexPath:)])
    {             
        return [controlmethod.target canEditRowAtIndexPath:indexPath];
    } 
    else
    {
        return NO;
    }
}

- (void)tableView:(UITableView *)tableview commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    AssistedMethodContainer* controlmethod = [self getAssistedMethod:indexPath.section];
    
    if(controlmethod != nil && [controlmethod.target respondsToSelector:@selector(commitEditingStyle:forRowAtIndexPath:)])
    {
        [controlmethod.target commitEditingStyle:editingStyle forRowAtIndexPath:indexPath];
    } 
}

@end

@implementation AssistedSectionControlContainer
@synthesize sectionName;
@synthesize height;
@synthesize controls;

- (id) initWithSectionTitle:(NSString *)sectiontitle andHeight: (CGFloat) inheight
{
    [super init];
    sectionName = sectiontitle;
    controls = [[NSMutableDictionary alloc] init];
    height = inheight;
    return self;
}
@end

@implementation AssistedControlContainer

@synthesize controls;
@synthesize accessoryType;
@synthesize selectionType;

- (id) initWithAccessoryType: (UITableViewCellAccessoryType) inaccessorytype andSelectionType: (UITableViewCellSelectionStyle) selectiontype 
{
    [super init];
    self.controls = [[NSMutableArray alloc] init];
    self.accessoryType = inaccessorytype;
    self.selectionType = selectiontype;
    
    return self;
}

@end

@implementation AssistedMethodContainer

@synthesize target;
@synthesize accessoryType;
@synthesize selectionType;
@synthesize sectionName;
@synthesize height;

- (id) initWithTarget:(id) intarget andSectionTitle:(NSString*) sectiontitle andAccessoryType: (UITableViewCellAccessoryType) inaccessorytype andSelectionType: (UITableViewCellSelectionStyle) selectiontype andHeight: (CGFloat) inheight
{
    target = intarget;
    accessoryType = inaccessorytype;
    selectionType = selectiontype;
    sectionName = sectiontitle;
    height = inheight;
    return self;
}

@end