//
//  AMEngineTextControl.m
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/20/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineTextControl.h"
#import "AMEngineLoadedController.h"

@implementation AMEngineTextControl

@synthesize label;
@synthesize textlabel;
@synthesize textfield;

- (id) initWithDefinition:(NSDictionary*) indefinition andParent:(AMEngineBaseUIView *)inparent
{
    self = [super initWithDefinition:indefinition andParent:inparent];
    if (self)
    {
        self.frame = CGRectMake(0, 0, 304, 29);
        self.label = [[UILabel alloc] initWithFrame:CGRectMake(5, 2, 150, 25)];
        [self addSubview:self.label];
        self.label.textAlignment = UITextAlignmentRight;
        self.label.text = [self.definition objectForKey:@"l"];
        
        if([[self.definition objectForKey:@"e"] boolValue])
        {
            self.textfield = [[UITextField alloc] initWithFrame:CGRectMake(155, 2, 150, 25)];
            self.textfield.borderStyle = UITextBorderStyleRoundedRect;
            self.textfield.keyboardType = UIKeyboardTypeDefault;
            self.textfield.returnKeyType = UIReturnKeyDone;
            self.textfield.delegate = self;
            self.textfield.textColor = [UIColor blackColor];    
            self.textfield.text = [self.definition objectForKey:@"v"];
            self.textfield.placeholder = [self.definition objectForKey:@"l"];           
            [self addSubview:self.textfield];
        }
        else
        {
            self.textlabel = [[UILabel alloc] initWithFrame:CGRectMake(155, 2, 147, 25)];
            self.textlabel.text = [self.definition objectForKey:@"v"];
            [self addSubview:self.textlabel];
        }
    }
    return self;
}

- (NSDictionary *)getValues
{
    NSMutableDictionary* returnvalues = [[NSMutableDictionary alloc] init];
    [self.definition setValue:self.textfield.text forKey:@"v"];
    [returnvalues addEntriesFromDictionary:[super getValues]];
    [returnvalues setValue:[self.definition objectForKey:@"v"] forKey:[self.definition objectForKey:@"id"]];
    return returnvalues;
}

- (void)textFieldDidEndEditing:(UITextField *)textField
{
    [self.definition setValue:self.textfield.text forKey:@"v"];
    [self sendRefreshWithData:[self getValues] refreshSentControls:NO];
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField;              // called when 'return' key pressed. return NO to ignore.
{
    [self.textfield resignFirstResponder];
    return YES;
}

- (void) layoutSubviews
{
    NSString* labelwidthstring = [self.definition objectForKey:@"lw"];
    float labelwidthpercent = 0.5f;
    
    if([labelwidthstring compare:@"Long"] == NSOrderedSame)
    {
        labelwidthpercent = 0.5f;
    }
    else if([labelwidthstring compare:@"Medium"] == NSOrderedSame)
    {
        labelwidthpercent = 0.35f;
    }
    else if([labelwidthstring compare:@"Short"] == NSOrderedSame)
    {
        labelwidthpercent = 0.25f;
    }
    else if([labelwidthstring compare:@"ExtraShort"] == NSOrderedSame)
    {
        labelwidthpercent = 0.15f;
    }
    else if([labelwidthstring compare:@"None"] == NSOrderedSame)
    {
        labelwidthpercent = 0.25f;
    }
    else if([labelwidthstring compare:@"Calculated"] == NSOrderedSame)
    {
        labelwidthpercent = 0.25f;
    }

    float labelwidth = (self.frame.size.width-10) * labelwidthpercent;
    float controlwidth = (self.frame.size.width-10) * (1.0f-labelwidthpercent);

    self.label.frame = CGRectMake(5, 2, labelwidth, 25);
    self.textfield.frame = CGRectMake(labelwidth+5, 2, controlwidth, 25);
    self.textlabel.frame = CGRectMake(labelwidth+5, 2, controlwidth, 25); 
    
//    float halfwidth = (self.frame.size.width-4) / 2;
//    self.label.frame = CGRectMake(2, 2, halfwidth, 25);
//    self.textfield.frame = CGRectMake(halfwidth+2, 2, halfwidth, 25);
//    self.textlabel.frame = CGRectMake(halfwidth+2, 2, halfwidth, 25); 

}

@end
