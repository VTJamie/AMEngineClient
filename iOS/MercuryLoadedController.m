//
//  MercuryLoadedController.m
//  MercuryViewController
//
//  Created by Sudhakar Moparthy on 2/20/11.
//  Copyright 2011 AbbottWebDev. All rights reserved.
//

#import "MercuryLoadedController.h"
#import "SBJson.h"

@implementation MercuryLoadedController

+ (void) testAlert: (NSString*) alertText
{
	UIAlertView *someError = [[UIAlertView alloc] initWithTitle: @"Alert" message: alertText delegate: self cancelButtonTitle: @"OK" otherButtonTitles: nil];
	
	[someError show];
	[someError release];
}

+ (void) sendRequest:(NSDictionary*)postcriteria withURL:(NSString*) urlstring withTarget: (id) target andSelector: (SEL) afterloadselector
{
    //(?<=__VIEWSTATE\" value=\")(?<val>.*?)(?=\")    
    
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];  
    NSString* baseurl = [userDefaults stringForKey:@"base_url"];
    
    NSString* finalstring = [NSString stringWithFormat:@"%@%@", baseurl, urlstring];
    NSString * post = [MercuryLoadedController concatDictionary:postcriteria withPairDelimiter:@"&" andValueDelimiter:@"="];
    NSLog(@"URL: %@", finalstring);
    NSLog(@"POST: %@", postcriteria);    
    NSData *postData = [post dataUsingEncoding:NSASCIIStringEncoding allowLossyConversion:YES];            
    NSLog(@"POST-LENGTH: %d", [postData length]);
    NSString *postLength = [NSString stringWithFormat:@"%d",[postData length]];            
    NSMutableURLRequest *request = [[[NSMutableURLRequest alloc] init] autorelease];            
    [request setURL:[NSURL URLWithString:finalstring]];        
    [request setHTTPMethod:@"POST"];        
    [request setValue:postLength forHTTPHeaderField:@"Content-Length"];            
    [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Current-Type"];            
    [request setHTTPBody:postData];     
    MercuryNSURLDelegate* urldelegate = [[MercuryNSURLDelegate alloc] initWithTarget:target andSelector:afterloadselector];
    [[NSURLConnection alloc] initWithRequest:request delegate:urldelegate startImmediately:YES];    
}

+ (NSString*) concatDictionary:(NSDictionary*) dict withPairDelimiter:(NSString*) pairdelim andValueDelimiter:(NSString*) valuedelim
{
    NSInteger count = 0;
    NSMutableString* concatstring = [[NSMutableString alloc] init];
    for(NSString* key in dict)
    {
        
        if(count > 0)
        {
            [concatstring appendString:pairdelim];   
        }
        count++;
        NSString* encodedkey = [MercuryLoadedController encodeString:key];
        NSString* encodedvalue = [MercuryLoadedController encodeString:[dict objectForKey:key]];
        [concatstring appendFormat:@"%@%@%@", encodedkey, valuedelim, encodedvalue]; 
    }
    return concatstring;
}

+ (NSString*) encodeString:(NSString*) unencodedString
{
    return (NSString *) CFURLCreateStringByAddingPercentEscapes(NULL, (CFStringRef) unencodedString, NULL, CFSTR(":/?#[]@!$&'()*+,;=\""), kCFStringEncodingUTF8);       
}

+ (void)selectText:(NSArray *)controlviews
{
    for(int i = 0; i < controlviews.count; i++)
    {
        UIView* curview = [controlviews objectAtIndex:i];
        if([[curview class] isSubclassOfClass:[UITextField class]])
        {
            [curview becomeFirstResponder];
        }
    }
}

+ (NSString*)readPlist:(NSString *)key 
{  
    NSData *plistData;  
    NSString *error;  
    NSPropertyListFormat format;  
    id plist;  
    
    NSString *localizedPath = [[NSBundle mainBundle] pathForResource:@"MercurySettings" ofType:@"plist"];
    plistData = [NSData dataWithContentsOfFile:localizedPath];   
    
    plist = [NSPropertyListSerialization propertyListFromData:plistData mutabilityOption:NSPropertyListImmutable format:&format errorDescription:&error];  
    if (!plist) {  
        NSLog(@"Error reading plist from file '%s', error = '%s'", [localizedPath UTF8String], [error UTF8String]);  
        [error release];  
    }      
    NSDictionary* plistdict = plist;
    
    return [plistdict objectForKey:key];  
}  

@end

@implementation MercuryNSURLDelegate

@synthesize receivedData;
@synthesize target;
@synthesize finishloading;

- (id) initWithTarget: (id) intarget andSelector: (SEL) inselector
{
    self = [super init];
    if(self)
    {
        self.receivedData = [[NSMutableData alloc] init];
        self.target = intarget;
        self.finishloading = inselector;
    }
    return self;
}

- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
{           
    [self.receivedData setLength:0];
}

- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data

{
    
    // Append the new data to receivedData.
    
    // receivedData is an instance variable declared elsewhere.
    
    [self.receivedData appendData:data];
    
}

- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
{               
    // inform the user    
    NSLog(@"Connection failed! Error - %@ %@",          
          [error localizedDescription],          
          [[error userInfo] objectForKey:NSURLErrorFailingURLStringErrorKey]);    
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection
{        
    NSString* jsonstring = [[NSString alloc] initWithData:self.receivedData encoding:NSUTF8StringEncoding];        
    
    SBJsonParser* parser = [[SBJsonParser alloc] init];
    NSDictionary* curdict = [parser objectWithString: jsonstring];    
    
    if(curdict == nil)
    {
        curdict = [[NSMutableDictionary alloc] init];
        
        NSError *error = NULL;
        NSRegularExpression *viewstateregex = [NSRegularExpression regularExpressionWithPattern:@"(?<=__VIEWSTATE\" value=\")(.*)(?=\")" options:NSRegularExpressionCaseInsensitive error:&error];
        // NSLog(@"%d", [regex numberOfMatchesInString:jsonstring options:0 range:NSMakeRange(0, [jsonstring length])]);
        NSTextCheckingResult* textresult = [viewstateregex firstMatchInString:jsonstring options:0 range:NSMakeRange(0, [jsonstring length])];
        
        NSLog(@"__VIEWSTATE: %@", [jsonstring substringWithRange:[textresult range]]);
        
        [curdict setValue:[jsonstring substringWithRange:[textresult range]] forKey:@"__VIEWSTATE"];
        
        NSRegularExpression *eventregex = [NSRegularExpression regularExpressionWithPattern:@"(?<=__EVENTVALIDATION\" value=\")(.*)(?=\")" options:NSRegularExpressionCaseInsensitive error:&error];
        textresult = [eventregex firstMatchInString:jsonstring options:0 range:NSMakeRange(0, [jsonstring length])];
        NSLog(@"__EVENTVALIDATION: %@", [jsonstring substringWithRange:[textresult range]]);
        [curdict setValue:[jsonstring substringWithRange:[textresult range]] forKey:@"__EVENTVALIDATION"];
    }
    else
    {
       NSLog(@"RESPONSE: %@", jsonstring);
    }
     //       NSLog(@"RESPONSE: %@", jsonstring);
    [self.target performSelector:self.finishloading withObject:curdict];
}


- (BOOL)connection:(NSURLConnection *)connection canAuthenticateAgainstProtectionSpace:(NSURLProtectionSpace *)protectionSpace 
{
    //    return YES;
    return [protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust];
}

- (void)connection:(NSURLConnection *)connection didReceiveAuthenticationChallenge:(NSURLAuthenticationChallenge *)challenge {
    if ([challenge.protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust])
    {     
        [challenge.sender useCredential:[NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust] forAuthenticationChallenge:challenge];
    }
    [challenge.sender continueWithoutCredentialForAuthenticationChallenge:challenge];
}


@end
