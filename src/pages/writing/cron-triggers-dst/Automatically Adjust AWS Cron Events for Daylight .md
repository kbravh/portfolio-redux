---
title: Automatically Adjust AWS Cron Events for Daylight Savings Time
description: Adjust AWS Cron Events using Lambda so that Daylight Savings Time won't affect your services.
date: 2020-04-21
slug: adjust-cron-event-for-dst
banner: ./banner.png
language: en_US
tags:
  - AWS
  - Lambda
  - Python
---

In order to lower costs for unused resources in AWS (which add up way faster than you think), we spin-down servers in our non-production environments every night during non-working hours and bring them back up in the morning. This entire process is handled by a single lambda function that is kicked off by some cron triggers in CloudWatch Event rules.

We have the environments set to sleep every weekday between 7pm and 7am, so they'll be back up in time for the first developers who get in at 7:30am. They also sleep all weekend since we don't do any development on Saturday or Sunday. Things were working flawlessly! That is, until Daylight Savings Time hit.

## The Problem

For those who may not be familiar with Daylight Savings Time (DST), it's the practice of setting the clocks forward one hour in spring and back one hour in fall to better take advantage of the daylight hours. Unfortunately, since the cron triggers in AWS are set up on UTC time, the DST time change caused our spin-up function to run an hour late.

```js
/* Original CRON triggers when not in DST */
0 13 ? * MON-FRI * // spin-up at 13:00 UTC (7am CST, Monday through Friday)
0 1 ? * TUE-SAT *// spin-down at 1:00 UTC (7pm CST, Monday through Friday)
```

    Curious about how cron events work? Cron expressions in AWS are made up of 6 slots. From left to right, they stand for Minutes (0-59), Hours (0-23), Day of the Month (0-31), Month (1-12 or JAN-DEC), Day of the Week (1-7 or SUN-SAT), and Year (1970-2199). An asterisk can stand in as a wildcard in any slot.

I adjusted our cron events to account for the time change as follows:

```js
/* New CRON triggers during DST */
0 12 ? * MON-FRI * // spin-up at 12:00 GMT (7am CST)
0 0 ? * TUE-SAT * // spin-down at 0:00 GMT (7pm CST)
```

This would work, but it was a short term fix. I wanted a longer term solution so we wouldn't run into this problem again in November when the time changed back.

## The Plan

It occurred to me that I could have the very same spin-up/spin-down function adjust its own cron triggers based on whether or not we were in Daylight Savings Time. To do this, I would just need to add a little bit of time logic.

First, I needed to get the current time local time and determine whether or not it was Daylight Savings Time. Thankfully, Python has some very useful date functionality that would make this easy to do.
```python
from datetime import datetime
import pytz

utc_time = datetime.utcnow().replace(tzinfo=pytz.utc)
cst_timezone = pytz.timezone('US/Central')
cst_time = utc_time.astimezone(cst_timezone)

# This will show the offset in seconds for DST. If it's zero, not DST
is_dst = cst_time.tzinfo._dst.seconds != 0
```

We import the `py~datetime` library, the main Python library for working with any date or time objects, and `py~pytz`, a library for accurately handling timezones. We create `py~utc_time` and set it equal to the current time in UTC with `py~datetime.utcnow()`. Note that we have to manually replace the timezone information on the native `py~datetime` object with the `py~utc` timezone from `py~pytz`.

Next, we create a central time timezone object `py~cst_timezone` and pull that information from the `py~pytz` library. Finally, we convert our UTC time to CST time using the function `py~astimezone()`, which takes in a timezone object as a parameter.

So now that we have our current time in the CST timezone, we can determine if it's Daylight Savings Time.

```python
# This will show the offset in seconds for DST. If it's zero, not DST
is_dst = cst_time.tzinfo._dst.seconds != 0
```

If we dig down into our current time object `py~cst_time`, we can get more information about the timezone. By accessing our timezone information (`py~tzinfo`), then our DST information (`py~_dst`), we can find how many `py~seconds` of an offset is currently on our time. If we are in DST, the offset will not be 0 (it will be 3600 seconds, really, since time gets shifted an hour).

## The Triggers

Now that we know if it's Daylight Savings Time or not, we can adjust our cron triggers. First, let's define what our expressions will be based on if we're in DST. During DST, we'll want the earlier triggers.

```python
if is_dst:
  start_schedule = 'cron(0 12 ? * * *)'
  stop_schedule = 'cron(0 0 ? * * *)'
else:
  start_schedule = 'cron(0 13 ? * * *)'
  stop_schedule = 'cron(0 1 ? * * *)'
# Curious why these cron expressions don't have the weekdays anymore? Read on!
```

Next, we need to actually update the rules in CloudWatch.

```python
  import boto3
  client = boto3.client('events')

  START_RULE = "start_rule"
  STOP_RULE = "stop_rule"

  start_settings = client.list_targets_by_rule(Rule=START_RULE)
  stop_settings = client.list_targets_by_rule(Rule=STOP_RULE)
```

We create our `py~boto3` client to be able to access our AWS resources. Assuming our rules are named `py~"start_rule"` and `py~"stop_rule"`, we can then fetch information about these rules from CloudWatch. Here, we are using the function `py~list_targets_by_rule()` to get back the targets these rules have (that would be this function).

```python
# Remove targets from current rules
client.remove_targets(Rule=START_RULE,Ids=[(start_settings['Targets'][0]['Id'])])
client.remove_targets(Rule=STOP_RULE,Ids=[(stop_settings['Targets'][0]['Id'])])
# Delete rules
client.delete_rule(Name=START_RULE)
client.delete_rule(Name=STOP_RULE)
# Add new rules
client.put_rule(Name=START_RULE, ScheduleExpression=start_schedule, State='ENABLED', Description="Automatic trigger for the Spinup-Spindown function.")
client.put_rule(Name=STOP_RULE, ScheduleExpression=stop_schedule, State='ENABLED', Description="Automatic trigger for the Spinup-Spindown function")
# Add targets
client.put_targets(Rule=START_RULE, Targets=[{'Id': start_settings['Targets'][0]['Id'], 'Arn':start_settings['Targets'][0]['Arn'], 'Input': start_settings['Targets'][0]['Input']}])
client.put_targets(Rule=STOP_RULE, Targets=[{'Id': stop_settings['Targets'][0]['Id'], 'Arn':stop_settings['Targets'][0]['Arn'], 'Input': stop_settings['Targets'][0]['Input']}])
```

Technically here we aren't updating the cron triggers, but rather replacing them. In order to delete a cron event trigger in AWS, you must first remove its targets by passing in an array of IDs. We'll give it the information we got from our previous call. For example `py~start_settings['Targets'][0]['Id']` will be the ID of the first target in the array we got back from the rule's information.

Next, we delete the start and stop rules, add in our updated rules, and add our targets back in. We can take all of this data from the settings we pulled earlier. Our updated cron rules are in place!

## Final Adjustments

So now our function can update its own cron triggers, awesome! But wait; what happens on the days that the time change actually happens? Won't our function run an hour late or an hour early on that one particular day? It will indeed, but we come out lucky here.

If you remember from the cron expressions we had at the beginning, we only ran this function Monday through Friday because we don't want our environments up on the weekend. In the United States, DST begins the 2nd Sunday in March and ends on the 1st Sunday in November. So our 1 hour shift would happen on a weekend, and it would never affect us!

Like I said though, our orignal cron expressions don't run on weekends, so we'll need to change our cron expressions slightly so they will. If you notice from the code snippet earlier, we already did this:

```python
if is_dst:
  start_schedule = 'cron(0 12 ? * * *)'
  stop_schedule = 'cron(0 0 ? * * *)'
else:
  start_schedule = 'cron(0 13 ? * * *)'
  stop_schedule = 'cron(0 1 ? * * *)'
```

These cron expressions will now run every day of the week, instead of just Monday through Friday.

Now that our function runs every day, we'll need to stop it from doing the spin-up and spin-down on weekends with a bit more time logic.

```python
weekday = cst_time.weekday()
#in the python calendar, 5 and 6 correspond to Saturday and Sunday
if weekday == 5 or weekday == 6:
  return {
      'statusCode': 200,
      'message': 'Today is a not a weekday, so the spin-up/spin-down process will not proceed.'
  }
else:
  begin_startstop_process()
```

We take our `py~cst_time` object and pull the day of the week out using `py~weekday()`. We then check whether it's a Saturday or a Sunday, and if so, we return a statusCode and message and stop execution. Otherwise we can get things going!

## Final Thoughts

So there we go, we can now automatically adjust our cron triggers in AWS so that Daylight Savings Time won't affect us again! However, there are definitely some future improvements we could make. For example, you might ask the following questions:

> Why do we adjust the rules every single day even when the rules will only change twice a year? What if we have a function that does need to run on weekends that we don't want to be late twice a year?

This could be resolved pretty simply by extracting all of this functionality into a separate function. Using cron expressions, we could also set this function to only run on Sundays in March and November when the time changes would happen!

Thanks for sticking around and reading. Hopefully this will help you out with your work in AWS!