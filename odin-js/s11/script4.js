/*
Introduction to JavaScript DOMContentLoaded Event
The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, frames, and async script <script async src="..."> to complete loading.

Here are the key points of the DOMContentLoaded event:

The DOMContentLoaded event is fired when the HTML document has been completely parsed.
It does not wait for external resources such as stylesheets, images, frames, and async script <script async src="..."> to finish loading.
All deferred scripts <script defer src="..."> and modules <script type="module"> have been downloaded and executed.
The DOMContentLoaded event cannot be cancellable.
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    let btn = document.getElementById('btn');
    let form = document.getElementById('exampleForm');
    let input = form.querySelector('input');
    let lifecycleStatus = document.createElement('p');

    lifecycleStatus.id = 'lifecycleStatus';
    form.insertAdjacentElement('afterend', lifecycleStatus);

    let setStatus = (message) => {
        lifecycleStatus.textContent = message;
        console.log(message);
    };

    let recordLifecycleEvent = (eventName) => {
        let previousEvents = JSON.parse(sessionStorage.getItem('lastLifecycleEvents') || '[]');
        previousEvents.push(eventName);
        sessionStorage.setItem('lastLifecycleEvents', JSON.stringify(previousEvents));
    };

    let previousLifecycleEvents = JSON.parse(sessionStorage.getItem('lastLifecycleEvents') || '[]');
    if (previousLifecycleEvents.length > 0) {
        setStatus(`Previous lifecycle events: ${previousLifecycleEvents.join(' -> ')}`);
        sessionStorage.removeItem('lastLifecycleEvents');
    } else {
        setStatus('No lifecycle events recorded yet. Type in the form before leaving to test beforeunload.');
    }

    let hasUnsavedChanges = false;

    btn.addEventListener('click', () => {
        console.log('Button was clicked');
        alert('Button clicked!');
    });

    input.addEventListener('input', () => {
        hasUnsavedChanges = input.value.trim().length > 0;
        if (hasUnsavedChanges) {
            setStatus('Unsaved form changes detected. Leaving now should trigger a browser warning.');
            return;
        }

        setStatus('No unsaved changes. Leaving now should not trigger a browser warning.');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        hasUnsavedChanges = false;
        input.value = '';
        setStatus('Form submitted locally. No unsaved changes remain.');
    });
});


// beforeunload should be attached to window and used only when the page has
// unsaved state that would be lost during navigation.
window.addEventListener('beforeunload', (event) => {
    let input = document.querySelector('#exampleForm input');
    if (!input || input.value.trim().length === 0) {
        return;
    }

    let previousEvents = JSON.parse(sessionStorage.getItem('lastLifecycleEvents') || '[]');
    previousEvents.push('beforeunload');
    sessionStorage.setItem('lastLifecycleEvents', JSON.stringify(previousEvents));
    event.preventDefault();
    event.returnValue = '';
});


window.addEventListener('pagehide', () => {
    let previousEvents = JSON.parse(sessionStorage.getItem('lastLifecycleEvents') || '[]');
    previousEvents.push('pagehide');
    sessionStorage.setItem('lastLifecycleEvents', JSON.stringify(previousEvents));
});

// unload fires on window during page teardown, not on document.
window.addEventListener('unload', () => {
    let previousEvents = JSON.parse(sessionStorage.getItem('lastLifecycleEvents') || '[]');
    previousEvents.push('unload');
    sessionStorage.setItem('lastLifecycleEvents', JSON.stringify(previousEvents));
});
