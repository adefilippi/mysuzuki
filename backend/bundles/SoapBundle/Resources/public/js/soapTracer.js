(function() {
    var elements = document.getElementsByClassName('js-xmlcode')

    for (i = 0; i < elements.length ; i++ ) {
        elements[i].innerText = vkbeautify.xml(elements[i].innerText);
        hljs.highlightBlock(elements[i]);
    }

    attachZeroClipboard('js-clipboard-btn');
})();

function expandEnvelope(link) {
    var sections = link.children,
            target = link.getAttribute('data-target-id'),
            targetId = target.replace('code', '');

    if (document.getElementById('small' + target).style.display != 'none') {
        document.getElementById('small' + target).style.display = 'none';
        document.getElementById(target).style.display = 'inline';

        sections[0].style.display = 'none';
        sections[1].style.display = 'inline';
        sections[2].style.display = 'inline';
    } else {
        document.getElementById('small' + target).style.display = 'inline';
        document.getElementById(target).style.display = 'none';

        sections[0].style.display = 'inline';
        sections[1].style.display = 'none';
        sections[2].style.display = 'none';
    }

    return false;
}

function attachZeroClipboard(elementsClassName) {
    if (typeof elementsClassName === 'undefined') {
        elementsClassName = 'js-clipboard-btn';
    }

    var buttons = document.getElementsByClassName(elementsClassName);
    for (var i=0, item; item = buttons[i]; i++) {
        var client = new ZeroClipboard(item);
    }
}
