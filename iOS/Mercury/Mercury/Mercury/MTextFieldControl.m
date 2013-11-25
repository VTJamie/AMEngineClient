//
//  AMTextFieldControl.m
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMTextFieldControl.h"
#import "AMConstants.h"
#import "MercuryStaticVariables.h"
#import "MercuryDataManager.h"
#import "MercuryLayoutView.h"

@implementation AMTextFieldControl

@synthesize label;
@synthesize textfield;
@synthesize textdisplay;

- (id) initWithFrame:(CGRect)frame andJsonDefinition:(NSDictionary *)jsondefinition andRootDefinition:(NSDictionary *)root
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, frame.size.width, 34) andJsonDefinition:jsondefinition andRootDefinition:root];
    if(self)
    {  
        if([[jsondefinition objectForKey:[AMConstants C:IS_VISIBLE]] boolValue])
        {
            float labelwidth = 0.0f;
            float textwidth = 0.0f;
            if([[jsondefinition objectForKey:[AMConstants C:LABEL]] length] > 0)
            {
                labelwidth = (frame.size.width-4)/2.0f;
                textwidth = labelwidth;
            }
            else 
            {
                labelwidth = 2.0f;
                textwidth = (frame.size.width-4);
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
            
            if([[jsondefinition objectForKey:[AMConstants C:EDITABLE]] boolValue])
            {
                textfield = [[UITextField alloc] initWithFrame:CGRectMake(labelwidth, 2, textwidth, frame.size.height-4)];
                
                textfield.borderStyle = UITextBorderStyleRoundedRect;
                
                textfield.text = [jsondefinition objectForKey:[AMConstants C:CURRENT_VALUE]];
                textfield.delegate = self;
                [self addSubview:textfield];
            }
            else 
            {            
                textdisplay = [[UILabel alloc] initWithFrame:CGRectMake(labelwidth, 2, textwidth, self.frame.size.height-4)];
                textdisplay.text = [jsondefinition objectForKey:[AMConstants C:CURRENT_VALUE]];
                textdisplay.numberOfLines = 0;
                textdisplay.lineBreakMode = UILineBreakModeWordWrap;
                [textdisplay sizeToFit];
                textdisplay.frame = CGRectMake(labelwidth, 2, textwidth, textdisplay.frame.size.height);
                [self addSubview:textdisplay];
            }
            
            float maxheight = 0.0f;
            for(UIView* subview in self.subviews)
            {
                if(maxheight < subview.frame.size.height)
                {
                    maxheight = subview.frame.size.height;
                }
            }
            if(maxheight < self.frame.size.height)
            {
                maxheight = self.frame.size.height;
            }
            self.frame = CGRectMake(self.frame.origin.x, self.frame.origin.y, self.frame.size.width, maxheight);
        }
        else 
        {
            self.frame = CGRectMake(self.frame.origin.x, self.frame.origin.y, self.frame.size.width, 1);
        }
    }
    return self;
}

- (void)updateJsonDefinition:(NSDictionary *)jsondefinition
{
    [super updateJsonDefinition:jsondefinition];
    if(self.textdisplay != nil)
    {
        self.textdisplay.text = [jsondefinition objectForKey:[AMConstants C:CURRENT_VALUE]];
    }
    else 
    {
        self.textfield.text = [jsondefinition objectForKey:[AMConstants C:CURRENT_VALUE]];  
    }
        
}

-(void)addValueToDict:(NSMutableDictionary *)fieldlist
{
    if([[self.definition objectForKey:[AMConstants C:IS_VISIBLE]] boolValue])
    {
        if([[self.definition objectForKey:[AMConstants C:EDITABLE]] boolValue])
        {
            [fieldlist setObject:self.textfield.text forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C:FIELD_PREFIX], [self.definition objectForKey:[AMConstants C:ID]]]];
        }
        else 
        {
            [fieldlist setObject:self.textdisplay.text forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C:FIELD_PREFIX], [self.definition objectForKey:[AMConstants C:ID]]]]; 
        }
    }
    else 
    {
        [fieldlist setObject:[self.definition objectForKey:[AMConstants C:CURRENT_VALUE]] forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C:FIELD_PREFIX], [self.definition objectForKey:[AMConstants C:ID]]]]; 
    }
}



- (BOOL)textFieldShouldEndEditing:(UITextField *)textField
{
    if([[[self definition] objectForKey:[AMConstants C:CHANGE_TRIGGERS_REFRESH]] boolValue])
    {
        NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
        [postdata setObject:[AMConstants C:REQUEST_TYPE_REFRESH_CONTROLS] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]]; 
        [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:ID]] forKey:[AMConstants C:REQUEST_DATA_OBJECT_ID]];
        [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:OBJECT_NAME]] forKey:[AMConstants C:REQUEST_OBJECT_NAME]];
        [self addValueToDict:postdata];  
        [MercuryStaticVariables fillDictionary:postdata withPersistDictionary:[MercuryStaticVariables sharedInstance].persist];
        [MercuryDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:refreshResponse:)];
    }
    return YES;
}

- (void) dataManager:(MercuryDataManager*) datamanager refreshResponse:(NSDictionary*) refreshresponse
{    
    [[(MercuryLayoutView*)[self superview] getTopParent] refreshControls:[[refreshresponse objectForKey:[AMConstants C:RESPONSE_BODY]] objectForKey:[AMConstants C:CONTROL_ARRAY]]];
}


- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    [textField resignFirstResponder];
    return YES;
}
// called when 'return' key pressed. return NO to ignore.

@end
