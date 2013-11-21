//
//  AMEngineDataManager.m
//  Toy List
//
//  Created by Jamieson Abbott on 2/20/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMEngineDataManager.h"
#import "AMConstants.h"
#import "SBJson.h"
#import "AMEngineStaticVariables.h"

@implementation AMEngineDataManager

@synthesize receivedData;
@synthesize target;
@synthesize finishloading;
@synthesize transformtostring;
@synthesize returnedresponse;

- (id) initWithTarget: (id) intarget andSelector: (SEL) inselector andTransformToString: (BOOL) intransformstring
{
    self = [super init];
    if(self)
    {
        self.receivedData = [[NSMutableData alloc] init];
        self.target = intarget;
        self.finishloading = inselector;
        self.transformtostring = intransformstring;
        self.returnedresponse = nil;
    }
    return self;
}

+ (AMEngineDataManager*) sendRequest:(NSDictionary*)postcriteria withTarget: (id) target andSelector: (SEL) afterloadselector
{
    return [AMEngineDataManager sendRequest:postcriteria withTarget:target andSelector:afterloadselector getString:YES];
}

+ (AMEngineDataManager*) sendRequest:(NSDictionary*)postcriteria withTarget: (id) target andSelector: (SEL) afterloadselector getString:(BOOL) transformtostring
{
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    NSString* urlstring = [userDefaults stringForKey:@"base_url"];
    
    NSString * post = [AMEngineDataManager concatDictionary:postcriteria withPairDelimiter:@"&" andValueDelimiter:@"="];
    NSLog(@"URL: %@", urlstring);
    NSLog(@"%@", postcriteria);
    
    
    NSData *postData = [post dataUsingEncoding:NSASCIIStringEncoding allowLossyConversion:YES];
    
    NSString *postLength = [NSString stringWithFormat:@"%d",[postData length]];
    NSMutableURLRequest *request = [[[NSMutableURLRequest alloc] init] autorelease];
    [request setURL:[NSURL URLWithString:urlstring]];
    [request setHTTPMethod:@"POST"];
    [request setValue:postLength forHTTPHeaderField:@"Content-Length"];
    [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Current-Type"];
    [request setHTTPBody:postData];
    AMEngineDataManager* urldelegate = [[AMEngineDataManager alloc] initWithTarget:target andSelector:afterloadselector andTransformToString:transformtostring];
    [[NSURLConnection alloc] initWithRequest:request delegate:urldelegate startImmediately:YES];
    return urldelegate;
}

+ (NSString*) sendSynchronousRequest:(NSDictionary*)postcriteria
{
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    NSString* urlstring = [userDefaults stringForKey:@"base_url"];
    
    NSString * post = [AMEngineDataManager concatDictionary:postcriteria withPairDelimiter:@"&" andValueDelimiter:@"="];
    NSLog(@"URL: %@", urlstring);
    NSLog(@"%@", postcriteria);
    
    
    NSData *postData = [post dataUsingEncoding:NSASCIIStringEncoding allowLossyConversion:YES];
    
    NSString *postLength = [NSString stringWithFormat:@"%d",[postData length]];
    NSMutableURLRequest *request = [[[NSMutableURLRequest alloc] init] autorelease];
    [request setURL:[NSURL URLWithString:urlstring]];
    [request setHTTPMethod:@"POST"];
    [request setValue:postLength forHTTPHeaderField:@"Content-Length"];
    [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Current-Type"];
    [request setHTTPBody:postData];
    
    NSURLResponse* urlresponse;
    NSError* error;
    NSData* data = [NSURLConnection sendSynchronousRequest:request returningResponse:&urlresponse error:&error];
    NSString* responsestring = [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];
    return responsestring;
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
        NSString* encodedkey = [AMEngineDataManager encodeString:key];
        NSString* encodedvalue = [AMEngineDataManager encodeString:[dict objectForKey:key]];
        [concatstring appendFormat:@"%@%@%@", encodedkey, valuedelim, encodedvalue];
    }
    return concatstring;
}

+ (NSString*) encodeString:(NSString*) unencodedString
{
    return (NSString *) CFURLCreateStringByAddingPercentEscapes(NULL, (CFStringRef) unencodedString, NULL, CFSTR(":/?#[]@!$&'()*+,;=\""), kCFStringEncodingUTF8);
}


- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
{
    returnedresponse = [response retain];
    
    [self.receivedData setLength:0];
}

- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
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
    NSLog(@"%@ %@ %d", self, self.returnedresponse, self.receivedData.length);
    if(self.transformtostring)
    {
        NSString* responsestring = [[NSString alloc] initWithData:self.receivedData encoding:NSASCIIStringEncoding];
        NSLog(@"%@", responsestring);
        if([self.target respondsToSelector:self.finishloading])
        {
            SBJsonParser* parser = [[SBJsonParser alloc] init];
            NSDictionary* responsedict = [parser objectWithString:responsestring];
            [AMEngineDataManager handleResponseStatus: responsedict];
            [self.target performSelector:self.finishloading withObject:self withObject:responsedict];
        }
    }
    else
    {
        if([self.target respondsToSelector:self.finishloading])
        {
            [self.target performSelector:self.finishloading withObject:self withObject:self.receivedData];
        }
    }
}


- (BOOL)connection:(NSURLConnection *)connection canAuthenticateAgainstProtectionSpace:(NSURLProtectionSpace *)protectionSpace
{
    return [protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust];
}

- (void)connection:(NSURLConnection *)connection didReceiveAuthenticationChallenge:(NSURLAuthenticationChallenge *)challenge {
    if ([challenge.protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust])
    {
        [challenge.sender useCredential:[NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust] forAuthenticationChallenge:challenge];
    }
    [challenge.sender continueWithoutCredentialForAuthenticationChallenge:challenge];
}

+ (void)registerDefaultsFromSettingsBundle
{
    NSString *settingsBundle = [[NSBundle mainBundle] pathForResource:@"Settings" ofType:@"bundle"];
    if(!settingsBundle) {
        NSLog(@"Could not find Settings.bundle");
        return;
    }
    
    NSDictionary *settings = [NSDictionary dictionaryWithContentsOfFile:[settingsBundle stringByAppendingPathComponent:@"Root.plist"]];
    NSArray *preferences = [settings objectForKey:@"PreferenceSpecifiers"];
    
    NSMutableDictionary *defaultsToRegister = [[NSMutableDictionary alloc] initWithCapacity:[preferences count]];
    for(NSDictionary *prefSpecification in preferences) {
        NSString *key = [prefSpecification objectForKey:@"Key"];
        if(key)
        {
            [defaultsToRegister setObject:[prefSpecification objectForKey:@"DefaultValue"] forKey:key];
        }
    }
    [[NSUserDefaults standardUserDefaults] registerDefaults:defaultsToRegister];
    [defaultsToRegister release];
}

+ (void) testAlert: (NSString*) alertText
{
	UIAlertView *someError = [[UIAlertView alloc] initWithTitle: @"Alert" message: alertText delegate: self cancelButtonTitle: @"OK" otherButtonTitles: nil];
	
	[someError show];
	[someError release];
}

+ (void) handleResponseStatus:(NSDictionary*) response
{
    if([AMConstants isLoaded])
    {
        if(![[response objectForKey:[AMConstants C:SESSION_VALID]] boolValue])
        {
            if([response objectForKey:[AMConstants C:ERROR]] != nil)
            {
                [AMEngineDataManager testAlert:[NSString stringWithFormat:@"%@", [response objectForKey:[AMConstants C:ERROR]]]];
            }
        }
        NSLog(@"%@", [response objectForKey:[AMConstants C:PERSIST]]);
        [AMEngineStaticVariables sharedInstance].persist = [response objectForKey:[AMConstants C:PERSIST]];
    }
}

@end