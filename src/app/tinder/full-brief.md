# Decision brief: Post-Event Matching

As of 2026-11-19. This brief lays out what changed, what is at risk, the evidence and the options. It does not recommend an option: the TPM adds a recommendation to each lead risk before it goes to leads.

## Decisions needed

1. **Android deck still reads attendees v1, which the R4 build removes**. Deadline: before the R4 build cut.
2. **Fraud notification due for R4 has no owner, spec or decision**. Deadline: by the Nov 19 2pm go/no-go.
3. **Manual fraud fallback and daily ban export may miss the 24 hour window**. Deadline: before Nov 23.
4. **R5 on a Thanksgiving week train now carries iOS deck, push and possibly fraud notification**. Deadline: none stated.

## What changed

- iOS moved the attendee discovery deck (PEM-111) from R4 to R5 (Nov 30) after app review rejected the build and a QR scanner crash appeared. Android and backend stay on R4, so R4 no longer ships the deck on both platforms. (PEM-111, PEM-114, MSG-099, MSG-100, MSG-101, MSG-075)
- The attendees API changed after privacy review. v2 returns only consenting attendees under the field visible_attendees, and v1 is removed in the R4 build. iOS switched over; the Android deck ticket still lists v1. (PEM-104, PEM-117, MSG-039, MSG-042, MSG-134)
- Legal added a requirement on Nov 10: an in-app fraud notification within 24 hours of a romance-scam ban, applying to the R4 launch. PEM-140 was created on Nov 12 with no owner, no release and a one-line acceptance criterion, and the manual versus built-properly choice is still open. (MSG-081, MSG-084, MSG-111, PEM-140, MSG-141)
- Recap Card was killed on Nov 12 after the holdout readout (open rate down 3.8%, no change in matches). iOS marked its UI Won't Do, but Android, backend, design and localization tickets are still open. (MSG-106, MSG-107, PEM-112, PEM-120, PEM-106, PEM-139)
- A launch partner was confirmed: a 4,000 person festival in Austin on Dec 5. Marketing wants attendees to wake up to matches the next morning. (MSG-043, MSG-044)
- The release train moved on: R1, R2 and R3 all shipped on plan. R4 freeze was Nov 18 with go/no-go on Nov 19 at 2pm. R5 falls in Thanksgiving week, with freeze Nov 24 and go/no-go Nov 25. (MSG-026, MSG-062, MSG-110, MSG-120, MSG-147)
- Status colors changed from week 3. iOS and T&S went yellow, and Legal stayed yellow. Backend, Android, Design, DS, MX and Loc report green going into R4 go/no-go. (MSG-030, MSG-116, MSG-139, MSG-140)

## Lead risks

### 1. Android deck still reads attendees v1, which the R4 build removes

Android deck PEM-117 still lists GET /v1 with field attendees and is In Review for R4. Backend changed to v2 (visible_attendees, consent filtered) and will remove v1 in the R4 build. Kenji told only Aaron about the change, and Grace's sync was against the kickoff doc. Android's R4 deck could fail on launch, or show attendees who did not consent.

- **Impact:** high. The Android deck is the only deck in R4, and the v1 removal lands in the same build.
- **Confidence:** high. The two tickets directly contradict each other and the only handoff recorded went to iOS.
- **Evidence:** PEM-117, PEM-104, MSG-012, MSG-039, MSG-040, MSG-041, MSG-042, MSG-103, MSG-104, MSG-134

**Decision needed:** Before the R4 build cut, who moves Android to v2, or does v1 removal wait until Android is confirmed on v2?

| Option | Upside | Downside |
|---|---|---|
| A. Android switches PEM-117 to v2 before R4 and re-tests with consent data | Matches the privacy-approved contract and keeps the R4 date for Android. | Late rework on an In Review ticket, and a retest is needed right at freeze. |
| B. Keep v1 alive past R4 and delay Kenji's cleanup PR | Android ships as built with no code change. | v1 returns non-consenting attendees, which conflicts with the privacy review outcome. |
| C. Pull the Android deck from R4 too | Removes the contract mismatch risk from R4. | R4 ships with no deck on either platform. |

**TPM recommendation:** Recommend A, with C as the fallback. Decide at the Nov 19 2pm go/no-go: the Android lead owns the switch to v2, asks the release manager for a freeze exception, and must pass a retest with consent data by end of day Fri Nov 20, ahead of the Nov 23 ship. If it doesn't, pull the Android deck from R4 (C). B is off the table: v2 exists because of the privacy review, and keeping v1 alive would work around it. _(added by David Jeanty, TPM)_

### 2. Fraud notification due for R4 has no owner, spec or decision

Legal's 24 hour fraud notification applies to the R4 launch on Nov 23. PEM-140 is P0 and To Do with no owner, no target release and the criterion 'Users get notified'. T&S status is yellow with 'working on it'. Localization has seen no copy. Rachel asked for a call before the Nov 19 go/no-go.

- **Impact:** high. It is a Legal requirement that gates the R4 launch date and needs T&S, MX, backend and Loc.
- **Confidence:** high. The ticket shows no owner and no release, and the director of product is asking for a decision.
- **Evidence:** MSG-081, PEM-140, MSG-111, MSG-112, MSG-116, MSG-117, MSG-118, MSG-139, MSG-141, MSG-083

**Decision needed:** By the Nov 19 2pm go/no-go, who owns the fraud notification and does R4 launch with a manual fallback (A) or move to R5 (B)?

| Option | Upside | Downside |
|---|---|---|
| A. Launch R4 on Nov 23 with a manual T&S pull and MX templated message | Keeps the R4 date. | Needs weekend staffing that MX does not have, and Legal accepts it only if the 24h window is met every time. |
| B. Move the launch to R5 and build the notification properly | A built and tested path, with time for copy and translation. | Gives up the R4 date and puts more on a short Thanksgiving train. |
| C. Launch R4 to a narrower audience and exclude any messaging surface until the notification exists | Avoids exposure to the Legal rule while keeping some R4 scope. | Needs Legal agreement and product to accept a reduced launch, and neither is on record. |

**TPM recommendation:** Recommend B unless Legal approves C at today's go/no-go, with one condition: T&S names an owner today and estimates PEM-140 by Nov 20. The R5 freeze is Nov 24, and the next train, R6, ships Dec 7, after the festival. If the estimate does not fit R5, escalate to leads on Nov 20 to choose between C and launching after the festival. A is not reliable: it needs weekend MX staffing that does not exist and an hourly export that is on no one's board. _(added by David Jeanty, TPM)_

### 3. Manual fraud fallback and daily ban export may miss the 24 hour window

The banned-account export (PEM-127) runs once a day at 02:00 UTC. A ban at 03:00 would wait about 23 hours before the first pull, leaving almost no time to send. Option A needs about 2 agent hours a day from MX with no weekend staffing, and Legal requires the window met every time. Hourly export is feasible but is on no one's board.

- **Impact:** high. A missed 24 hour window is a Legal compliance failure on the R4 launch.
- **Confidence:** medium. The cadence and staffing gaps are stated directly, but no one has yet confirmed the window would be missed in practice.
- **Evidence:** PEM-127, MSG-088, MSG-089, MSG-085, MSG-086, MSG-084, MSG-083

**Decision needed:** If R4 launches with option A, who funds hourly export and weekend coverage before Nov 23?

| Option | Upside | Downside |
|---|---|---|
| A. Add an hourly export ticket for T&S and a weekend rota for MX | Makes option A compliant on paper. | New work and staffing during freeze week, with no named owner today. |
| B. Choose option B and build the notification with proper automation | Avoids relying on manual weekend work. | Moves the launch date. |
| C. Accept the gap on weekends and get Legal sign-off | No new staffing. | Legal said weekends must be covered, so this likely needs a Legal exception. |

**TPM recommendation:** Applies if lead 2 goes with A or B; under C the risk is delayed until messaging turns on, not removed. A built notification that reads the once-a-day export can still miss the 24 hour window, so the export has to move to hourly either way. Recommend A: Felix Wagner, who owns the export (PEM-127), confirms by Nov 20 who will make it hourly, and MX sets a weekend rota if lead 2 goes with A. C is not acceptable, since Legal said weekends must be covered. _(added by David Jeanty, TPM)_

### 4. R5 on a Thanksgiving week train now carries iOS deck, push and possibly fraud notification

R5 freeze is Tue Nov 24 and go/no-go Wed Nov 25. It now holds the iOS deck, iOS push (PEM-114), the iOS strings that shifted to about Nov 20, and possibly the fraud notification if option B is chosen. Jordan called R5 'Nov 30', but the train gives five days after the R4 go/no-go. The Austin festival is Dec 5, so there is little room for another slip.

- **Impact:** high. A miss in R5 leaves iOS out of the Dec 5 launch partner event.
- **Confidence:** medium. The dates and scope are on record, but no one has assessed R5 capacity.
- **Evidence:** MSG-120, MSG-100, MSG-099, PEM-111, PEM-114, PEM-137, MSG-084, MSG-043, MSG-044

**Decision needed:** Is there a fallback if iOS misses the Nov 24 freeze, and who confirms the Dec 5 audience can be served with Android only?

| Option | Upside | Downside |
|---|---|---|
| A. Set a hard cut line for R5 and name what drops first | Protects the iOS deck date. | Forces scope calls now, while R4 is still open. |
| B. Plan Dec 5 for Android only, with iOS as a bonus | Removes dependence on the R5 freeze. | Half the festival audience may not get the deck, and the experiment issue applies. |
| C. Accept the current plan and watch weekly | No added process. | Little warning before the Thanksgiving freeze. |

**TPM recommendation:** Recommend A. Set the R5 cut line by Nov 20 and name what drops first if iOS slips. Only two working days, Nov 20 and Nov 23, fall between the R4 go/no-go and the R5 freeze on Nov 24, and more scope may arrive if lead 2 moves to R5, so ranking priorities now is cheaper than deciding at the freeze. _(added by David Jeanty, TPM)_

## Where status and the record disagree

- Leads were told R4 holds for Android while the staggered launch is unresolved (worth watching; impact medium, confidence medium)
- Leads were told iOS had nothing changing dates while the deck was already paused (worth watching; impact medium, confidence high)
- Leads were told backend has nothing open for R4 while ready work is still in progress (worth watching; impact medium, confidence high)

## Worth watching

- Experiment randomizes by event but launch may be Android first (impact medium, confidence high)
- Localization marked its R4 item done while strings and new copy are still open (impact medium, confidence high)
- Match job takes about 6 hours on a 4,000 person event, and tuning is deferred (impact medium, confidence medium)
- Privacy review covers US only while R4 plans a 6 locale launch; Legal stayed yellow (impact medium, confidence medium)
- Recap Card killed but build and translation work continues on four teams (impact low, confidence high)
- Android push ticket still Blocked in the tracker while Slack says fixed (impact low, confidence low)
- MX marked support items signed off before consent and fraud notification scope settled (impact low, confidence low)

