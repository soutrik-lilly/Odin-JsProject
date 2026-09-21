/*

When you open a page, the following events occur in sequence:

DOMContentLoaded – the browser fully loaded HTML and completed building the DOM tree. However, it hasn’t loaded external resources like stylesheets and images. In this event, you can start selecting DOM nodes or initialize the interface.
load – the browser fully loaded the HTML and external resources like images and stylesheets.
When you leave the page, the following events fire in sequence:

beforeunload – fires before the page and resources are unloaded. You can use this event to show a confirmation dialog to confirm if you want to leave the page. By doing this, you can prevent data loss in case the user is filling out a form and accidentally clicks a link that navigates to another page.
unload – fires when the page has completely unloaded. You can use this event to send the analytic data or to clean up resources.

document.addEventListener('DOMContentLoaded',() => {
    // handle DOMContentLoaded event
});

document.addEventListener('load',() => {
    // handle load event
});

document.addEventListener('beforeunload',() => {
    // handle beforeunload event
});

document.addEventListener('unload',() => {
    // handle unload event
});

*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
});

document.addEventListener('load', () => {
    console.log('Page fully loaded including all resources');
});

document.addEventListener('beforeunload', (event) => {
    console.log('Before unload event triggered');
    event.preventDefault(); // for most browsers
    event.returnValue = ''; // for Chrome
});

document.addEventListener('unload', () => {
    console.log('Unload event triggered');
});
