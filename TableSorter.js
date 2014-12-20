(function ($) {
    $.fn.applySorting = function (callback) {

        var sortClass = {
            "NoSort": "no-sort",
            "Ascending": "sortup",
            "Descending": "sortdown"
        };

        var sortIndicator = {
            "NoSort": "NoSort",
            "Ascending": "Ascending",
            "Descending": "Descending"
        };

        var th = this.find('th[sort-key]');
        $.each(th, function (key, value) {
            if($(value).attr('sort-indicator') == null || $(value).attr('sort-indicator') == undefined)
            {
                $(value).attr('sort-indicator', sortIndicator.NoSort);
            }

            $(value).bind('sort', callback);
            $(value).on('click', function () {

                var $this = $(this);
                $this.siblings('th[sort-key]').attr('sort-indicator', sortIndicator.NoSort).removeClass(sortClass.Descending).removeClass(sortClass.Ascending);
                var curSort = $this.attr('sort-indicator');
                var sortKey = $this.attr('sort-key');

                if (curSort == sortIndicator.Ascending) {
                    // up sorting applied
                    // apply descending sorting [down sorting]
                    $this.attr('sort-indicator', sortIndicator.Descending);
                    $this.removeClass(sortClass.NoSort).removeClass(sortClass.Ascending);
                    $this.addClass(sortClass.Descending);

                    // trigger event
                    $this.trigger('sort', { SortKey: sortKey, SortOrder: "Descending" });
                }
                else if (curSort == sortIndicator.NoSort || curSort == sortIndicator.Descending) {
                    // down sorting applied
                    // apply ascending sorting [up sorting]
                    $this.attr('sort-indicator', sortIndicator.Ascending);
                    $this.removeClass(sortClass.NoSort).removeClass(sortClass.Descending);
                    $this.addClass(sortClass.Ascending);

                    // trigger event
                    $this.trigger('sort', { SortKey: sortKey, SortOrder: "Ascending" });
                }
            });
        });
    };
} (jQuery));