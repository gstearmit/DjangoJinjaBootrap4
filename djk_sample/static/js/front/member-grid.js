'use strict';

App.ko.MemberGridRow = function(options) {
    $.inherit(App.ko.GridRow.prototype, this);
    this.init(options);
};

(function(MemberGridRow) {

    MemberGridRow.useInitClient = true;

    MemberGridRow.toDisplayValue = function(value, field) {
        var displayValue = this._super._call('toDisplayValue', value, field);
        switch (field) {
        case 'role':
            // Display field value as bootstrap label.
            var types = ['success', 'info', 'primary'];
            displayValue = $('<span>', {
                'class': 'label preformatted'
            })
            .text(displayValue)
            .addClass(
                'label-' + (this.values[field] < types.length ? types[this.values[field]] : 'info')
            );
            break;
        case 'note':
            // Display field value as bootstrap clickable popover.
            var gridColumn = this.ownerGrid.getKoGridColumn(field);
            if (this.values[field] !== '') {
                displayValue = $('<button>', {
                    'class': 'btn btn-info',
                    'data-content': this.values[field],
                    'data-toggle': 'popover',
                    'data-trigger': 'click',
                    'data-placement': 'bottom',
                    'title': gridColumn.name,
                }).text('Full text');
            }
            break;
        case 'is_endorsed':
            // Display field value as form input.
            var attrs = {
                'type': 'checkbox',
                'class': 'form-field club-member',
                'data-pkval': this.getValue(this.ownerGrid.meta.pkField),
                'name': field + '[]',
            };
            if (this.values[field]) {
                attrs['checked'] = 'checked';
            }
            displayValue = $('<input>', attrs);
        }
        return displayValue;
    };

})(App.ko.MemberGridRow.prototype);


App.MemberGridActions = function(options) {
    $.inherit(App.GridActions.prototype, this);
    this.init(options);
};

(function(MemberGridActions) {

    MemberGridActions.queryargs_endorse_members = function(options) {
        options['member_ids'] = JSON.stringify(this.grid.getEndorsedMemberIds());
        return options;
    };

    MemberGridActions.callback_endorse_members = function(viewModel) {
        this.grid.updateMeta(viewModel.meta);
        var dialog = new App.Dialog(viewModel);
        dialog.alert();
        var lockoutProjectGrid = $('#lockout_project_grid').component();
        if (lockoutProjectGrid !== null) {
            lockoutProjectGrid.gridActions.perform('list');
        }
    };

})(App.MemberGridActions.prototype);


App.ko.MemberGrid = function(options) {
    $.inherit(App.ko.Grid.prototype, this);
    this.init(options);
};

(function(MemberGrid) {

    MemberGrid.iocRow = function(options) {
        return new App.ko.MemberGridRow(options);
    };

    MemberGrid.iocGridActions = function(options) {
        return new App.MemberGridActions(options);
    };

    MemberGrid.getEndorsedMemberIds = function() {
        var members = {};
        $('input.club-member[name^="is_endorsed"]')
        .map(function() {
            members[$(this).data('pkval')] = $(this).prop('checked');
        });
        return members;
    };

    MemberGrid.onChangeEndorsementButtonClick = function(data, ev) {
        this.gridActions.perform('endorse_members');
    };

})(App.ko.MemberGrid.prototype);
