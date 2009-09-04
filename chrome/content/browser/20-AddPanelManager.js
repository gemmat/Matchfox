const EXPORT = ["AddPanelManager"];

let Bookmark = Model.Bookmark;

var AddPanelManager = {
    currentPanel: null,

    // XXX AddPanelManagerではなく全体に属すべき。
    getBookmarkFor: function APM_getBookmarkFor(item) {
        if (item.url) return item;
        let win = item instanceof Ci.nsIDOMWindow ? item : null;
        let uri = win ? newURI(win.location.href) :
            (item instanceof Ci.nsIURI) ? item : newURI(item);
        let url = URLNormalizer.normalize(uri).asciiSpec;
        let bookmark = Bookmark.findByUrl(url)[0];
        if (bookmark) return bookmark;
        bookmark = new Bookmark();
        bookmark.title = win ? (win.document.title || url) : "";
        bookmark.url = url;
        bookmark.comment = "";
        return bookmark;
    },

    get panelDialog APM_get_panelDialog() {
        return this.currentPanel && this.currentPanel.document.documentElement;
    },

    get panelContent APM_get_panelContent() {
        if (!this.currentPanel || this.currentPanel.closed)
            return null;
        let doc = this.currentPanel.document;
        return doc.getElementById("hBookmarkAddPanelContent");
    },

    toggle: function APM_toggle() {
        let panel = this.panelContent;
        if (panel && panel.bookmark.url === gBrowser.currentURI.asciiSpec)
            this.panelDialog.cancelDialog();
        else
            this.showPanel(gBrowser.contentWindow);
    },

    showPanel: function APM_showPanel(item, options) {
        if (!User.user) {
            UIUtils.encourageLogin();
            return;
        }
        let bookmark = this.getBookmarkFor(item);
        if (!/^https?:\/\//.test(bookmark.url)) return;
        if (!bookmark.title && options && options.title)
            bookmark.title = options.title;

        let panel = this.panelContent;
        if (panel) {
            panel.show(bookmark);
        } else {
            this.currentPanel = window.openDialog(
                "chrome://hatenabookmark/content/addPanel.xul",
                "_blank",
                "chrome, dialog, resizable, alwaysRaised, centerscreen",
                { bookmark: bookmark });
        }
    }
};
