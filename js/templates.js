var images = [
    'images/cycle/desktop_windows-24px.svg',
    'images/cycle/cake-24px.svg',
    'images/cycle/airline_seat_individual_suite-24px.svg',
    'images/cycle/directions_bike-24px.svg',
    'images/cycle/highlight-24px.svg',
    'images/cycle/sentiment_satisfied_alt-24px.svg',
    'images/cycle/sports_esports-24px.svg',
    'images/cycle/sports_hockey-24px.svg',
    'images/cycle/videogame_asset-24px.svg',
]

function cycleImageList(groupname, imageList, location) {
    var template = document.querySelector('#template-cycle-img');

    // Cycle through all the images in the list.
    for (let i = 0; i < imageList.length; i++) {
        const element = imageList[i];
        var clone = document.importNode(template.content, true);

        var input = clone.querySelector("input");
        var label = clone.querySelector("label");
        var img = clone.querySelector("img");

        input.id = groupname + "-img-" + i
        input.name = groupname

        if (i == 0) {
            // The first input should be checked, to begin at the start.
            input.checked = true;
        }
        if (i == imageList.length - 1) {
            // If it is the last element, we want to link it to the first. 
            label.htmlFor = groupname + "-img-" + 0
        } else {
            // Otherwise just link it to the next one.
            label.htmlFor = groupname + "-img-" + (i + 1)
        }
        img.src = element
        location.appendChild(clone)

        // Remove placeholders.
        location.querySelectorAll('.placeholder').forEach(element => {
            location.removeChild(element)
        });
    }
}

function filterButton(location, groupname, value){
    let template = document.querySelector('#filter-button');
    let clone = document.importNode(template.content, true);

    let input = clone.querySelector('input')
    input.id = value;
    input.value = value;
    input.name = groupname;

    let label = clone.querySelector('label');
    label.htmlFor = value;
    label.innerText = value;
    location.prepend(clone);
}

function portfolioItem(location, jsonConfig) {
    let template = document.querySelector('#modal-btn-and-modal');
    let tagTemplate = document.querySelector('#tag');

    let clone = document.importNode(template.content, true);

    clone.querySelectorAll('label').forEach(function(element) {
        element.htmlFor = jsonConfig.htmlSpecifics.modalId;
        element.setAttribute('data-category', jsonConfig.content.tags.reduce((s1, s2) => s1 + " " + s2));
    })
    clone.querySelector("input").id = jsonConfig.htmlSpecifics.modalId;
    clone.querySelector("h1").innerText = jsonConfig.content.title;
    clone.querySelector("p").innerText = jsonConfig.content.content;

    clone.querySelector(".modal-btn-img").src = jsonConfig.button.image;
    clone.querySelector(".modal-img").src = jsonConfig.content.image;

    let tagsDiv = clone.querySelector(".modal-tags")
    jsonConfig.content.tags.forEach(tagText => {
        let tagClone = document.importNode(tagTemplate.content, true)
        tagClone.querySelector("div").innerText = tagText
        tagsDiv.appendChild(tagClone)
    })


    clone.querySelector(".modal-links")

    location.appendChild(clone)
}

window.onload = function() {
    cycleImageList("icon-cycle-1", images, document.querySelector("#cycle-img-wrapper-1"))
    cycleImageList("icon-cycle-2", images, document.querySelector("#cycle-img-wrapper-2"))
    cycleImageList("icon-cycle-3", images, document.querySelector("#cycle-img-wrapper-3"))
    cycleImageList("icon-cycle-4", images, document.querySelector("#cycle-img-wrapper-4"))
    
    let filterButtonLocation = document.querySelector('.tag-filter');
    let portfolioItemsLocation = document.querySelector("#portfolio-items");

    let uniqueTags = new Set(portfolioItems.flatMap(element => element.content.tags));
    Array.from(uniqueTags)
      .sort()
      .reverse()
      .forEach(tag => {
          this.filterButton(filterButtonLocation, 'portfolio-items-filter', tag)
      });
    this.filterButton(filterButtonLocation, 'portfolio-items-filter', 'All')


    portfolioItems.forEach(element => {
        this.portfolioItem(portfolioItemsLocation, element)
    });
}