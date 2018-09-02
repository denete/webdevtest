Instructions
============

Your Task
---------

Using the provided feed data, construct a page that is formatted to match the included mockups. You will only be using one HTML document for this test. Your document will render either a promotion view or a promotion list view.

The promotion view layout should be responsive and render as shown in the wide mockup (webdevtest/mockup-wide.jpg) for viewports greater than 480 pixels and as shown in the 480px mockup (webdevtest/mockup-480.jpg) below that breakpoint.

Place your HTML in webdevtest/src/index.html. All other resources should be saved where appropriate in the webdevtest/src hierarchy.

Feed Data
---------

Your page should load data from the provided datafile. Almost no content will be hard-coded into your document.

- webdevtest/src/js/webdevtest-data.js

URLs and page rendering
-----------------------

The page should render the promotion list view (webdevtest/mockup-list.jpg) when accessed by the URL below.

webdevtest/src/index.html

The links from the promotion list view should take us to the individual promotion view. The page should render one of the three promotions from the feed data when accessed by the URLs below.

- webdevtest/src/index.html?promo=promo01
- webdevtest/src/index.html?promo=promo02
- webdevtest/src/index.html?promo=promo03

Design Attributes
-----------------

For most visual elements, you are provided with details on styling below. Other visual elements that are not detailed below will require you to use your best judgement to match the mockups provided.

Promotion list view (all viewport sizes)
----------------------------------------

- Reference webdevtest/mockup-list.jpg
- All typefaces are Arial
- Promotion link text is 24px bold, #036dbe
- Promotion summary text and Next Drawing text is 14px, #444444
- Images have a dropshadow applied

Promotion view layouts (all viewport sizes)
-------------------------------------------

- All typefaces are Arial
- "Drawing Schedule" and "Total Tickets Entered" text is 18px bold, #000000
- The summary text and other body text is 14px with 24px line heights, #444444

Promotion view layout (greater than 480px viewport)
---------------------------------------------------

- Reference webdevtest/mockup-wide.jpg
- Promotion Name is 24px, #000000
- Background gradient is from #cccccc to #ffffff

Promotion view layout (480px or less viewport)
---------------------------------------------------

- Reference webdevtest/mockup.jpg
- Next Entry Deadline text is 24px bold, #b20000
- Tables should render as shown
- Entries locked notice is #b20000

Evaluation
----------

You will be evaluated on your HTML, CSS, and JavaScript code quality as well as your attention to detail in completing the code test. Be sure that your code reflects your abilities and knowledge.

Other Information
-----------------

You may use any libraries or frameworks that you choose for this task.