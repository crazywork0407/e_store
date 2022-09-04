$(document).ready(function () {
    let initialized = false;

    $("body").on("click", ".sidebar-menu .sub-menu a, .read-more", function (e) {
        e.preventDefault();
        $(".sidebar-menu a.active").removeClass("active");
        $(this).addClass("active");

        var index = $(this).attr("index");
        var subIndex = $(this).attr('sub-index');
        var content = docData[ index ].list[ subIndex ];

        var data = '<div class="document-content">\
                        <h2 class="entry-title">' + content[ 'entry-title' ] + '</h2>';
        for (var i = 0; i < content.list.length; i++) {
            data += '<div class="entry-content">\
                            <h4 class="entry-subtitle">' + content.list[ i ][ 'entry-subtitle' ] + '</h4>\
                            <div class="entry-subcontent">' + content.list[ i ][ 'entry-subcontent' ] + '</div>\
                    </div>'
        }
        data += '</div>';

        $(".content-wrapper").html(data);

        initialized &&
            $('html, body').animate({
                'scrollTop': $(".content-wrapper").offset().top - 15
            }, 400);
        initialized = true;
    });

    $(".sub-menu a.active").click();

    $(".header-search form").submit(function (e) {
        e.preventDefault();
        var searchText = $("#search-text").val();
        var matchedArr = [];
        let regex = new RegExp(searchText, "i");
        var data = "";

        if (searchText.length > 3) {
            docData.map((item1, index1) => (
                item1.list.map((item2, index2) => (
                    item2.list.map((item3, index3) => (
                        ((item3[ "entry-subcontent" ].search(regex) > -1) || (item3[ "entry-subtitle" ].search(regex) > -1)) ?
                            matchedArr.push({ index1, index2, index3 })
                            : ""
                    ))
                ))
            ))
        }

        if (searchText.length <= 3 || matchedArr.length === 0) {
            data = '<div class="document-content search-content no-content">\
                        <h2 class="entry-title">No matched result</h2>\
                        <span>Sorry, no results are found. Maybe, words are too short or mistyped. Please try again with different words</span>\
                    </div>';
        } else {
            var repText = "<span class='match-text'> " + searchText + " </span>";
            regex = new RegExp(searchText, 'gi');

            data = '<div class="document-content search-content">';

            matchedArr.map((elem) => (
                data += '<div class="entry-content">\
                        <h2 class="entry-title">\
                            <a to="#" index="' + elem.index1 + '" sub-index="' + elem.index2 + '">' + (docData[ elem.index1 ].list[ elem.index2 ].list[ elem.index3 ][ "entry-subtitle" ]).replace(regex, replacer) + '</a>\
                            </h2>\
                        <div class="entry-subcontent">' +
                (docData[ elem.index1 ].list[ elem.index2 ].list[ elem.index3 ][ "entry-subcontent" ]).replace(regex, replacer) +
                '</div>\
                        <div class="entry-action mb-2"><a to="#" index="' + elem.index1 + '" sub-index="' + elem.index2 + '" class="btn read-more">Read More...</a></div>\
                    </div>'
            ));

            data += '</div>';
            $(".content-wrapper").html(data);
        }

    });

    function replacer (match, offset, string) {
        while (offset >= 0) {
            offset--;
            if (string[ offset ] === '>') return "<span class='match-text'> " + match + " </span>";
            else if (string[ offset ] === '<') return match;
        }

        return "<span class='match-text'> " + match + " </span>";
    }
});