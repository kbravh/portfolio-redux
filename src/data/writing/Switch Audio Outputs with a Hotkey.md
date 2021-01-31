---
title: Switch Audio Outputs with a Hotkey
description: Create a shell script to switch audio output devices on Linux systems.
date: 2020-09-11
language: en_US
stage: 1
tags:
  - Bash
---

# Switch audio outputs with a hotkey
Based on [Ubuntu forums](https://ubuntuforums.org/showthread.php?t=1370383). However, it tries to simply increment the index number by 1. The `pacmd list-sinks` command shows the indexes (at least currently) as 2 and 38. So simply adding 1 produces the error `Sink 39 does not exist.`

## Tools/commands used in this script
* `declare` - declares a new variable, allows for setting 'types'
* `pacmd` - provides information about audio devices
* `notify-send` - sends pop-up notifications to user (may need to be installed with `sudo apt install libnotify-bin`)
	* Icons `-i` can be found in the following locations:
		* `/usr/share/icons/gnome/32x32`
		* `/usr/share/notify-osd/icons/`
* `grep` - the ever useful search command
	* Here, used with [Character Classes](https://www.gnu.org/software/grep/manual/html_node/Character-Classes-and-Bracket-Expressions.html)
* `sed` - the inline editing tool
* `mapfile` - not sure how it works yet; this was the recommended way to populate arrays from grep results
* Run through [ShellCheck](https://www.shellcheck.net/) to verify script.

## Complete Script
```bash
#!/bin/bash

# Grab a count of how many audio sinks we have
sink_count=$(pacmd list-sinks | grep -c "index:[[:space:]][[:digit:]]")
# Create an array of the actual sink IDs
sinks=()
mapfile -t sinks < <(pacmd list-sinks | grep 'index:[[:space:]][[:digit:]]' | sed -n -e 's/.*index:[[:space:]]\([[:digit:]]\)/\1/p')
# Get the ID of the active sink
active_sink=$(pacmd list-sinks | sed -n -e 's/\*[[:space:]]index:[[:space:]]\([[:digit:]]\)/\1/p')
# Get the ID of the last sink in the array
final_sink=${sinks[$((sink_count - 1 ))]}

# Find the index of the active sink
for index in "${!sinks[@]}"; do
  if [[ "${sinks[$index]}" == "$active_sink" ]]; then
    active_sink_index=$index
  fi
done

# Default to the first sink in the list
next_sink=${sinks[0]}
next_sink_index=0

# If we're not at the end of the list, move up the list
if [[ $active_sink -ne $final_sink ]] ; then
  next_sink=${sinks[$next_sink_index]}
  next_sink_index=$(( active_sink_index + 1))
fi

#change the default sink
pacmd "set-default-sink ${next_sink}"

#move all inputs to the new sink
for app in $(pacmd list-sink-inputs | sed -n -e 's/index:[[:space:]]\([[:digit:]]\)/\1/p');
do
  pacmd "move-sink-input $app $next_sink"
done

# Create a list of the sink descriptions
sink_descriptions=()
mapfile -t sink_descriptions < <(pacmd list-sinks | sed -n -e 's/.*alsa.name[[:space:]]=[[:space:]]"\(.*\)"/\1/p')
# Find the index that matches our new active sink
for sink_index in "${!sink_descriptions[@]}"; do
  if [[ "$sink_index" == "$next_sink_index" ]] ; then
    notify-send -i audio-volume-high "Sound output switched to ${sink_descriptions[$sink_index]}"
    exit
  fi
done
```

## Triggering the script
1. Place this script in `/usr/local/bin/`
2. Make it executable `chmod 755` (we use `755` instead of just `+x` to allow other users or groups, such as the keyboard shortcut itself, to run the executable).
3. Tie the command to a keyboard shortcut