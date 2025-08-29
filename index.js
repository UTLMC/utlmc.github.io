function toggleTab(event) {
    const active = event.srcElement;
    for (const tabTitle of active.parentElement.children) {
        tabTitle.classList.remove('nav-active');
    }
    active.classList.add('nav-active');

    const activeId = `tab-${active.innerText.toLowerCase().replace(" ", "-")}`;
    for (const tab of document.querySelectorAll('main article')) {
        if (activeId === tab.id) {
            tab.classList.add('tab-active');
        } else {
            tab.classList.remove('tab-active');
        }
    }
}