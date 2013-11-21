//
//  AMButtonControl.m
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMButtonControl.h"
#import "AMEngineDataManager.h"
#import "AMEngineStaticVariables.h"

#import "AMEngineLayoutView.h"
#import "AMConstants.h"

@implementation AMButtonControl

@synthesize button;

- (id)initWithFrame:(CGRect)frame andJsonDefinition:(NSDictionary *)jsondefinition andRootDefinition:(NSDictionary *)root
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, frame.size.width, 34) andJsonDefinition:jsondefinition andRootDefinition:root];
    if(self)
    {
        self.button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
        self.button.frame = CGRectMake(2, 2, self.frame.size.width-4, self.frame.size.height-4);
        [self.button addTarget:self action:@selector(buttonClick) forControlEvents:UIControlEventTouchUpInside];
        [self updateJsonDefinition:jsondefinition];
        [self addSubview:button];
    }
    return self;
}

- (void)updateJsonDefinition:(NSDictionary *)jsondefinition
{
    [super updateJsonDefinition:jsondefinition];
    [self.button setTitle:[self.definition objectForKey:[AMConstants C:LABEL]] forState:UIControlStateNormal];
}

- (void) buttonClick
{
    NSString* clicktype = [self.definition objectForKey:[AMConstants C:BUTTON_TYPE]];
    if([clicktype compare:[AMConstants C:BUTTON_TYPE_SUBMIT]] == NSOrderedSame)
    {
        if([[[self.rootdefinition objectForKey:[AMConstants C:RESPONSE_BODY]] objectForKey:[AMConstants C:IS_DIALOG]] boolValue])
        {
            NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
            [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_REQUEST] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]]; 
            [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SAVE_ITEM] forKey:[AMConstants C:REQUEST_TYPE_SUB_IDENTIFIER]];
            [postdata setObject:[self.definition objectForKey:[AMConstants C:ID]] forKey:[AMConstants C:REQUEST_FIELD_ACTION_PROPERTY_NAME]];
            
            NSDictionary* responsebody = [self.rootdefinition objectForKey:[AMConstants C:RESPONSE_BODY]];
            [postdata setObject:[responsebody objectForKey:[AMConstants C:MAIN_REQUEST_FIELD_NAME]] forKey:[AMConstants C:REQUEST_MAIN_OBJECT_FIELD_NAME]];
            [postdata setObject:[responsebody objectForKey:[AMConstants C:MAIN_REQUEST_OBJECT_ID]] forKey:[AMConstants C:REQUEST_MAIN_OBJECT_ID]];
            
            
            [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:ID]] forKey:[AMConstants C:REQUEST_DATA_OBJECT_ID]];
            [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:OBJECT_NAME]] forKey:[AMConstants C:REQUEST_OBJECT_NAME]];
            [postdata addEntriesFromDictionary:[[(AMEngineLayoutView*)self.superview getTopParent] getFieldValues]];        
            [AMEngineStaticVariables fillDictionary:postdata withPersistDictionary:[AMEngineStaticVariables sharedInstance].persist];       
            [AMEngineDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:dialogSaveResponse:)];
        }
        else 
        {
            NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
            [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_REQUEST] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]]; 
            [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_SUBMIT] forKey:[AMConstants C:REQUEST_TYPE_SUB_IDENTIFIER]];
            [postdata setObject:[self.definition objectForKey:[AMConstants C:ID]] forKey:[AMConstants C:REQUEST_FIELD_ACTION_PROPERTY_NAME]];
            [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:ID]] forKey:[AMConstants C:REQUEST_DATA_OBJECT_ID]];
            [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:OBJECT_NAME]] forKey:[AMConstants C:REQUEST_OBJECT_NAME]];
            [postdata addEntriesFromDictionary:[[(AMEngineLayoutView*)self.superview getTopParent] getFieldValues]];        
            [AMEngineStaticVariables fillDictionary:postdata withPersistDictionary:[AMEngineStaticVariables sharedInstance].persist];       
            [AMEngineDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:responseSaveString:)];
        }
        
    }
}

- (void) dataManager:(AMEngineDataManager*) datamanager responseSaveString:(NSDictionary *) response
{
    
    if([[[response objectForKey:[AMConstants C:RESPONSE_BODY]] objectForKey:[AMConstants C:ERRORS]] count] > 0)
    {
        for(NSDictionary* curerror in [[response objectForKey:[AMConstants C:RESPONSE_BODY]] objectForKey:[AMConstants C:ERRORS]])
        { 
            [AMEngineDataManager testAlert:[curerror objectForKey:[AMConstants C:ERROR_MESSAGE]]];
        }
    }
    else
    {                                                          
        AMEngineLayoutView* topparent = (AMEngineLayoutView*)self.superview;

        if(topparent.parentcontroller.dialogparent == nil)
        {
            [topparent clearChildren];     
            [topparent.parentcontroller showLandingScreen];
        }
        else 
        {
            [topparent.parentcontroller.dialogparent.rootview refreshControls];
            [topparent.parentcontroller.navigationController popViewControllerAnimated:YES];
        }
    }
}

- (void) dataManager:(AMEngineDataManager*) datamanager dialogSaveResponse:(NSDictionary *) response
{
    
    if([[[response objectForKey:[AMConstants C:RESPONSE_BODY]] objectForKey:[AMConstants C:ERRORS]] count] > 0)
    {
        for(NSDictionary* curerror in [[response objectForKey:[AMConstants C:RESPONSE_BODY]] objectForKey:[AMConstants C:ERRORS]])
        { 
            [AMEngineDataManager testAlert:[curerror objectForKey:[AMConstants C:ERROR_MESSAGE]]];
        }
    }
    else
    {                                                   
        [[(AMEngineLayoutView*)self.superview getTopParent].parentcontroller.dialogparent.rootview refreshControls];
        [[(AMEngineLayoutView*)self.superview getTopParent].parentcontroller dismissModalViewControllerAnimated:YES];
    }
}

- (void) dataManager:(AMEngineDataManager*) datamanager cancelresponse:(NSDictionary *) response
{        
    
}
@end
