//
//  MercuryViewController.m
//  MercuryViewController
//
//  Created by Sudhakar Moparthy on 2/12/11.
//  Copyright 2011 AbbottWebDev. All rights reserved.
//

#import "MercuryTableViewController.h"
#import "MercuryUITableViewCell.h"
#import "MercuryLoadedController.h"
@implementation MercuryTableViewController

@synthesize parent;
@synthesize controls;
@synthesize context;
@synthesize contextName;

- (id) initWithParent: (id) myparent withContext:(NSString*) incontext withContextName:(NSString*) incontextname
{
    self = [super initWithStyle:UITableViewStyleGrouped];
    if(self)
    {
        self.controls = [[NSMutableDictionary alloc] init];
        self.context = incontext;
        self.contextName = incontextname;
        
        self.parent = myparent;
    }
    return self;
}

- (id) initWithStyle:(UITableViewStyle)style
{
    return [self initWithParent:nil withContext:nil withContextName:nil];    
}

- (void) tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    MercuryMethodContainer* controlmethod = [self getMercuryMethod:indexPath.section];
    
   if(controlmethod != nil)
   {
       [controlmethod.target forTableViewController:self didSelectRowAtIndexPath:indexPath];
   }
    else
    {
        [MercuryLoadedController testAlert:@"Not FOund"];
    }
}

- (void) addTarget: (id) target andSectionTitle: sectiontitle andAccessoryType: (UITableViewCellAccessoryType) accessorytype andSelectionType: (UITableViewCellSelectionStyle) selectionType inSection: (NSInteger) section
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];    
    //    [target performSelector:createmethod];    
    
    if([self.controls objectForKey:sectionString] == nil)
    {
        [self.controls setValue: [[MercuryMethodContainer alloc] initWithTarget:target andSectionTitle: sectiontitle andAccessoryType:accessorytype andSelectionType: selectionType] forKey:sectionString];
    }
}

- (MercuryMethodContainer*) getMercuryMethod: (NSInteger) section
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];       
    
    if([[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[MercuryMethodContainer class]])
    {
        return [self.controls objectForKey:sectionString];
    }
    else        
    {
        return nil;
    }
}

- (void) addObject: (UIView*) addview inSection: (NSInteger) section inRow: (NSInteger) row
{
    [self addObject:addview andSectionTitle:nil andAccessoryType:UITableViewCellAccessoryNone andSelectionType:UITableViewCellSelectionStyleNone andControlDef:nil inSection:section inRow:row];
}

- (void) addObject: (UIView*) addview andSectionTitle: sectiontitle andAccessoryType: (UITableViewCellAccessoryType) accessorytype andSelectionType:(UITableViewCellSelectionStyle) selectionstyle andControlDef:(NSDictionary*) control inSection: (NSInteger) section inRow: (NSInteger) row
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];    
    NSString* rowString = [NSString stringWithFormat:@"%d", row];
    
    if([self.controls objectForKey:sectionString] == nil)
    {
        [self.controls setValue:[[MercurySectionControlContainer alloc] initWithSectionTitle:sectiontitle] forKey:sectionString];
    }
    
    if([[[self.controls objectForKey:sectionString] class ]isSubclassOfClass:[MercurySectionControlContainer class]])
    {
        MercurySectionControlContainer* cursection = [self.controls objectForKey:sectionString];
        if([cursection.controls objectForKey:rowString] == nil)
        {
            [cursection.controls setValue:[[MercuryControlContainer alloc] initWithAccessoryType:accessorytype andSelectionType:selectionstyle andControlDef:control] forKey:rowString];
        }
        
        if([[addview class] isSubclassOfClass:[UITextField class]])
        {
            ((UITextField*)addview).delegate = self;
        }
        
        MercuryControlContainer* controlcontainer = [cursection.controls objectForKey:rowString];
        [controlcontainer.controls addObject: addview];    
    }
}

- (MercuryControlContainer*) getControlsInSection: (NSInteger) section inRow: (NSInteger) row
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];    
    NSString* rowString = [NSString stringWithFormat:@"%d", row];       
    
    if(
       self.controls == nil || 
       [self.controls objectForKey:sectionString] == nil ||
       ![[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[MercurySectionControlContainer class]]
       )
    {
        return nil;
    }        
    
    return [((MercurySectionControlContainer*)[self.controls objectForKey:sectionString]).controls objectForKey:rowString];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    MercuryUITableViewCell* newcell = (MercuryUITableViewCell*)[tableView dequeueReusableCellWithIdentifier:@"MercuryTableViewCell"];
    if (newcell == nil) 
    {               
        newcell = [[MercuryUITableViewCell alloc] initWithParent:self andReuseIdentifier:@"MercuryTableViewCell"];
    }                          
    
    for(NSString* subview in newcell.controls) 
    {      
        [[newcell.controls objectForKey:subview] removeFromSuperview];
    }
    
    [newcell.controls removeAllObjects];   
    
    MercuryControlContainer* controlcontainer = [self getControlsInSection:indexPath.section inRow:indexPath.row];
    if(controlcontainer != nil)
    {        
        newcell.selectionStyle = controlcontainer.selectionType;   
        newcell.accessoryType = controlcontainer.accessoryType;         
        for(int i = 0; i < controlcontainer.controls.count; i++)
        {
            UIView* curview = [controlcontainer.controls objectAtIndex:i];
            
            [newcell.controls setObject:curview forKey:[NSString stringWithFormat:@"%d %d %d", indexPath.section, indexPath.row, i]];                                            
        }                
    }
    else
    {
        MercuryMethodContainer* controlmethod = [self getMercuryMethod:indexPath.section];
       
        newcell.accessoryType = controlmethod.accessoryType;
        newcell.selectionStyle = controlmethod.selectionType;           
            
        [controlmethod.target forTableViewController:self cellToFill:newcell atIndexPath:indexPath];
        
    }
    
    [newcell showControls];
    return newcell;
}

- (NSInteger) numberOfSectionsInTableView:(UITableView *)tableView
{
    return self.controls.count;
}

- (NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];
    
    if([[[self.controls objectForKey:sectionString] class ]isSubclassOfClass:[MercurySectionControlContainer class]])
    {
        MercurySectionControlContainer* cursection = [self.controls objectForKey:sectionString];
        return cursection.controls.count;
    }
    else if([[[self.controls objectForKey:sectionString] class ]isSubclassOfClass:[MercuryMethodContainer class]])
    {
        MercuryMethodContainer* methcontainer = [self.controls objectForKey:sectionString];
        return [methcontainer.target numberOfRowsInSection:section];              
    }
    else
    {
        return 0;
    }
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField 
{
    [textField resignFirstResponder];
    return NO;
}

- (NSString*)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    NSString* sectionString = [NSString stringWithFormat:@"%d", section];
    if([[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[MercurySectionControlContainer class]])
    {
        MercurySectionControlContainer* cursection = [self.controls objectForKey:sectionString];
        return cursection.sectionName;
    }
    else if([[[self.controls objectForKey:sectionString] class] isSubclassOfClass:[MercuryMethodContainer class]])
    {
        MercuryMethodContainer* cursection = [self.controls objectForKey:sectionString];
        return cursection.sectionName;
    }
    else
    {
        return nil;
    }
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
	return YES;
}


@end

@implementation MercurySectionControlContainer
@synthesize sectionName;
@synthesize controls;

- (id) initWithSectionTitle:(NSString *)sectiontitle
{
    [super init];
    sectionName = sectiontitle;
    controls = [[NSMutableDictionary alloc] init];
    return self;
}
@end

@implementation MercuryControlContainer

@synthesize controls;
@synthesize accessoryType;
@synthesize selectionType;
@synthesize controldef;

- (id) initWithAccessoryType: (UITableViewCellAccessoryType) inaccessorytype andSelectionType: (UITableViewCellSelectionStyle) selectiontype andControlDef: (NSDictionary*) incontroldef
{
    [super init];
    self.controls = [[NSMutableArray alloc] init];
    self.accessoryType = inaccessorytype;
    self.selectionType = selectiontype;
    self.controldef = incontroldef;
    
    return self;
}

@end

@implementation MercuryMethodContainer

@synthesize target;
@synthesize accessoryType;
@synthesize selectionType;
@synthesize sectionName;

- (id) initWithTarget:(id) intarget andSectionTitle:(NSString*) sectiontitle andAccessoryType: (UITableViewCellAccessoryType) inaccessorytype andSelectionType: (UITableViewCellSelectionStyle) selectiontype
{
    target = intarget;
    accessoryType = inaccessorytype;
    selectionType = selectiontype;
    sectionName = sectiontitle;
    return self;
}

@end