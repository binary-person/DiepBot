## v2.2.7

- Update gamemodes

## v2.2.6

- API update

## v2.2.5

- Update server regions

## v2.2.4

- Fix broken prevention of constant reminders about server expired links
- Add ability to shush bot from sending server expired link notifications

## v2.2.3

- Fix discord's breaking API change

## v2.2.2

- Change to 6 hours per server link check

## v2.2.1

- Add include-only for wordle
- Fix number bounds for wordle

## v2.2.0

- Add wordle support :D
- Add silencing feature for notifications
- Add DiepStats linking command

## v2.1.0

- Add DiepStats link support

## v2.0.0

- Switched to slash command system
- Hard-coded many values for Diepcord, and removed settings storage
- added routine check server links for Diepcord

## v1.5.3

- Fix party links not being converted to server ids correctly

## v1.5.2

- Accommodate recent m28 server id reset updates in `convertPartyToServerId.js`

## v1.5.1

- Add option to automatically react to diep links that are expired for the `check` command

## v1.5.0

- Fix aliasing a multi-argument command
- Add `check` command

## v1.4.1

- Fix uptime output for `getallservers`

## v1.4.0

- Add command `getallservers`

## v1.3.2

- Round to the nearest thousand for weekly challenges
- Introduce minimum score requirement for weekly challenges
- Changed weekly time to Sunday 4am UTC

## v1.3.1

- Add token reward amount to weekly challenges
- Remove non-tiered weekly challenges for now

## v1.3.0

- Add weekly challenges
- Add `weeklychallenge` command
- Changed weekly time to Sunday 5am UTC

## v1.2.0

- Move formatMS to util folder
- Add aliases: tdm and 2tdm for teams. 4tdm for 4teams. sbx for sandbox.
- Add `getserverinfo` command
- Add record keeping functionality to DiepServerCollection for determining diep server uptime

## v1.1.1

- rename command 'getdiepserver' to 'getserver'

## v1.1.0

- Add crontab functionality
- Add tank of the week
- Add ability to view current settings
- Add help admin and help owner
- Add eval for debugging purposes
- Fix invalid number of arguments when unsetting prefix

## v1.0.0

Initial commit
