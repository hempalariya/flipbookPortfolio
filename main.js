'use strict';

const book = document.querySelector('.book');
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.navigation');

let currentIndex = 0;

function bookClose(isAtLast = false) {
    book.style.transform = isAtLast ? 'translateX(100%)' : 'translateX(0)';
}

function bookOpen() {
    book.style.transform = 'translateX(50%)';
}

function setZIndex(currentPageId, direction) {
    const page = Array.from(pages).find(p => +p.dataset.pageId === currentPageId);
    if (!page) return;

    const zIndexValue = direction === 'next'
        ? currentPageId
        : pages.length - currentPageId + 1;

    page.style.zIndex = zIndexValue;
}

navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const clickedBtn = e.target.closest('button')?.dataset.navigation;
        const pageElement = e.target.closest('.page');
        const pageId = +pageElement.dataset.pageId;

        // Update index based on direction
        if (clickedBtn === 'next') {
            if (currentIndex >= pages.length) return;
            currentIndex++;
        }

        if (clickedBtn === 'pre') {
            if (currentIndex <= 0) return;
            currentIndex--;
        }

        // Flip the page
        pageElement.classList.toggle('flipped');

        // Update book position
        if (currentIndex === 0) {
            bookClose();
        } else if (currentIndex === 1 || currentIndex === 2) {
            bookOpen();
        } else if (currentIndex === 3) {
            bookClose(true);
        }

        // Set z-index for layering
        setZIndex(pageId, clickedBtn);
    });
});
