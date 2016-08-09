# Retrospective
This was done for a work hackathon in order to spread some React/Redux knowledge, and as such I didn't want to spend *that* much time on it.  Below are the changes we'd have done it this were a real project.

## Usability

#### Feedback
Currently, there is literally zero feedback on what the user has just done.  Multiple times during development I asked myself:

>Did I just edit this address or did I add it?  And where is the address located within the list?

To alleviate this, add a simple alert system that says things like *"Successfully added/edited address"*.  Maybe the alert drops down below the list panel's filter input and disappears after X seconds.

I'd also add some implicit feedback that
(a) scrolls the edited/added address into view, and
(b) fades the background color from orange (or something) to the normal background color of an address list item, indicating which one was just acted upon.

#### Toggling addresses on the map

Toggling addresses on the map is clunky.  At the very least, add more visual indication that it's even possible to toggle the map pin; converting the map icon to a proper button would probably be enough.

#### Filtering addresses
When filtering, it'd be cool if we could bold or otherwise format the matching terms in the address.  So when we type *3850* in the filter bar, the matching list items will bold the **3850** part of their address.  This tells me why an address matched.

#### Toggling auto-population of form fields
Maybe add a switch/checkbox to the Add/Edit view that would determine whether or not to populate the form fields from the Google autocomplete.  This is just in case a user doesn't actually want that to happen (obviously this is more relevant to editing than adding).


----
## Visual Design
#### Look and feel
The app has basically a super flat brutalist look and feel.  A few very subtle box-shadows and shallow gradients would go a long way in making for a warmer, more comfortable application experience.  Some animations would be good.

#### Font styling
Address items in the list use the same font, color, and size for all parts of the address.  This isn't great, because users  generally don't care what country the address is in, but the text implies that all parts of the address are on equal-standing.  Format the font/size/color so that the eye is drawn to the street/state/zip, then country.


----
## Code
Redux's flow of data makes app state easy to reason about and facilitates very quick development of features *and* good reuse of the code behind those features.  Of course, there are a few smells in the project:

#### We need a router
The `AddressPanel` view has too much responsibility: namely having to know to show a specific view based on global state's `viewMode`.  In a real application, use `react-router` and URL based navigation to make this all go away.

#### More containers!
In the same vein, `AddressPanelContainer` is basically acting as a God-object/Gatekeeper, passing down every action and prop that its descendants need to know about.  This makes it more cumbersome to add features via new actions/props, as we must pass them down through multiple layers of components (that might not even care about them!).

Split in to multiple, finer-grained `Container` components.  For example, I'd split `AddressPanelContainer` into `AddressDetailsContainer` and `AddressListContainer`.

#### General component re-use
In a real project, we'd want to be able to re-use UI/CSS components like grids, rows, form input groups, buttons, etc.  There is almost none of that UI modularization here.

#### More tests
Yep.
