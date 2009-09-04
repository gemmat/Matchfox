
var EXPORT = ['TagCompleter'];

elementGetter(this, 'panel', 'hBookmark-panel-tagcomplete', document);
elementGetter(this, 'list', 'hBookmark-tagcomplete-listbox', document);

let E = createElementBindDocument(document);

/*
 * ToDo: 毎回 addPanel 呼び出されると作られるため重い
 */

var TagCompleter = {
    reloadTags: function() {
        let self = this;
        p.b(function() {
            let dTags =  model('Tag').findDistinctTags();
            let tags = [];
            let tagsCount = {};
            dTags.forEach(function(e) { tags.push(e.name);tagsCount[e.name] = e.count;});
            self.tagCache.set('tags', tags);
            self.tagCache.set('tagsCount', tagsCount);
        }, 'reloadTags');
    },
    clearCache: function clearCache() {
        this.tagCache._tags = null;
        this.tagCache.tagsCount = null;
    },
    get tagCache() {
        if (!shared.has('tagCache')) {
            shared.set('tagCache', new ExpireCache('tagcache', 30 * 60));
        }
        return shared.get('tagCache');
    },
    get tagsCount() {
        return this.tagCache.get('tagsCount');
    },
    get tags() {
        let t = this.tagCache.get('tags');
        if (!t) {
            this.reloadTags();
            return this.tagCache.get('tags');
        }
        return t;
    }
};

TagCompleter.List = {
    clear: function() {
        list.selectedIndex = -1;
        while(list.firstChild) list.removeChild(list.firstChild);
    },
    listClickHandler: function(e) {
        e.stopPropagation();
        list.selectedItem = e.currentTarget;
        let ev = document.createEvent('UIEvents');
        ev.initEvent('complete', true, false);
        list.dispatchEvent(ev);
    },
    showTags: function(tags, el) {
        this.clear();
        let tagsCount = TagCompleter.tagsCount;
        let self = this;
        tags.forEach(function(tag) {
            let item = E('richlistitem', {flex:1, 'class': 'hBookmark-tagcomplete-listitem', value:tag},
                E('hbox', {flex:1}, 

                    E('label', {'class': 'hBookmark-tagcomplete-tagname', value: tag}),
                    E('spacer', {flex: 1}),
                    E('label', {'class': 'hBookmark-tagcomplete-tagcount', value: tagsCount[tag] || 0})
                )
            );
            item.addEventListener('click', method(self, 'listClickHandler'), false);
            item.addEventListener('mouseover', method(self, 'listMousemoveHandler'), false);
            list.appendChild(item);
        });
        this.show(el);
    },
    listMousemoveHandler: function(e) {

        list.selectedItem = e.currentTarget;
    },
    isOne: function() {
        return list.getRowCount() == 1;
    },
    get shown() panel.state == 'open',
    show: function(el) {
        panel.openPopup(el, 'after_start', 0, 0,false,false);
    },
    hide: function() {
        panel.hidePopup();
    },
    next: function() {
        if (list.selectedIndex == list.getRowCount() - 1) {
            this.first();
        } else {
            list.selectedIndex = list.selectedIndex + 1;
        }
    },
    prev: function() {
        if (list.selectedIndex == 0) {
            this.last();
        } else {
            list.selectedIndex = list.selectedIndex - 1;
        }
    },
    first: function() {
        list.selectedIndex = 0;
        list.ensureIndexIsVisible(list.selectedIndex);
    },
    last: function() {
        list.selectedIndex = list.getRowCount() - 1;
        list.ensureIndexIsVisible(list.selectedIndex);
    },
    getCurrentTag: function(force) {
        let item = list.selectedItem;
        if (!item && force) {
            item = list.getItemAtIndex(0);
        }
        return item ? item.value : null;
    }
}

TagCompleter.InputHandler = function(input) {
    this.input = input;
    this.inputLine = new TagCompleter.InputLine('', []);
    delete this.inputLine['suggestTags'];
    // this.inputLine.__defineGetter__('suggestTags', function() TagCompleter.tags);
    this.inputLine.__defineGetter__('suggestTags', method(this, 'suggestTags'));
    this.tagCompleteEnabled = Prefs.bookmark.get('addPanel.tagCompleteEnabled');
    this.prevValue = this.input.value;
    input.addEventListener('keyup', method(this, 'inputKeyupHandler'), false);
    input.addEventListener('keydown', method(this, 'inputKeydownHandler'), false);
    input.addEventListener('input', method(this, 'inputInputHandler'), false);
    list.addEventListener('complete', method(this, 'listCompleteHandler'), false);
    if (XMigemoCore) {
        this.inputLine.useMigemo = Prefs.bookmark.get('addPanel.xulMigemo');
    }
}

TagCompleter.InputHandler.prototype = {
    get textbox() 
        document.getBindingParent(this.input),
    get addPanel() 
        document.getBindingParent(this.textbox),
    updateRecommendedTags: function(tags) {
        delete this._suggestTags;
        this.recommendTags = tags;
    },
    suggestTags: function() {
        if (!this._suggestTags) {
            if (this.recommendTags && this.recommendTags.length) {
                let t = Array.slice(this.recommendTags).concat(TagCompleter.tags).sort();
                this._suggestTags = t;
            } else {
                return TagCompleter.tags;
            }
        }
        return this._suggestTags;
    },
    updateLineValue: function() 
        this.inputLine.value = this.input.value,
    updateValue: function() 
        this.prevValue = this.input.value = this.inputLine.value,
    lastCaretPos: null,
    inputKeyupHandler: function(ev) {
        let caretPos = this.caretPos;
        if (caretPos == this.lastCaretPos) return;
        this.lastCaretPos = caretPos;
        this.updateLineValue();
        if (!this.tagCompleteEnabled) return;
        let words = this.inputLine.suggest(caretPos);
        if (words.length) {
            TagCompleter.List.showTags(words, this.input);
        } else {
            TagCompleter.List.hide();
        }
    },
    get caretPos() this.textbox.selectionEnd,
    inputKeydownHandler: function(ev) {
        let tList = TagCompleter.List;
        let keyCode = ev.keyCode;
        if (tList.shown) {
            let caret = this.text
            let stopEvent = false;
            if (keyCode == ev.DOM_VK_ENTER || keyCode == ev.DOM_VK_RETURN) {
                this.insert(true);
                stopEvent = true;
            } else if (keyCode == ev.DOM_VK_TAB) {
                if (tList.isOne()) {
                    this.insert(true);
                } else if (ev.shiftKey) {
                    tList.prev();
                } else {
                    tList.next();
                }
                stopEvent = true;
            } else if (keyCode == ev.DOM_VK_UP) {
                tList.prev();
                stopEvent = true;
            } else if (keyCode == ev.DOM_VK_DOWN) {
                tList.next();
                stopEvent = true;
            }

            if (stopEvent) {
                ev.stopPropagation();
                ev.preventDefault();
            }
        } else {
            // submit
            // 本来はここではすべきでない

            // EnterキーのハンドリングはFirefox側が行う
            //if (keyCode == ev.DOM_VK_ENTER || keyCode == ev.DOM_VK_RETURN) {
            //    this.addPanel.saveBookmark();
            //}
        }
    },
    inputInputHandler: function(ev) {
        this.updateLineValue();
        let tagsRE = /^(?:\[[^?%\/\[\]]+\])*/;
        let currentValue = this.input.value;
        let prevTags = this.prevValue.match(tagsRE)[0];
        let currentTags = currentValue.match(tagsRE)[0];
        this.prevValue = currentValue;
        if (prevTags != currentTags)
            this.fireTagChangeEvent();
    },
    listCompleteHandler: function(ev) {
        this.insert(true);
    },
    insert: function(force) {
        let tag = TagCompleter.List.getCurrentTag(force);
        let line = this.inputLine;
        if (tag) {
            if (IS_OSX) {
                // OSX では、タイミングをずらさないと IME 入力時 input.value 代入が空になる
                setTimeout(function(self) {
                    let pos = line.insertionTag(tag, self.caretPos);
                    self.updateValue();
                    self.textbox.setSelectionRange(pos + 0, pos + 0);
                    self.fireTagChangeEvent();
                }, 0, this);
            } else {
                let pos = line.insertionTag(tag, this.caretPos);
                this.updateValue();
                this.textbox.setSelectionRange(pos + 0, pos + 0);
                this.fireTagChangeEvent();
            }
        }
        TagCompleter.List.hide();
    },
    fireTagChangeEvent: function() {
        let ev = document.createEvent('UIEvent');
        ev.initUIEvent('HB_TagChange', true, false, window, 0);
        this.input.dispatchEvent(ev);
    }
}

TagCompleter.InputLine = function(value, tags) {
    this.suggestTags = tags;
    this.value = value;
    this.maxSuggest = Prefs.bookmark.get('addPanel.tagMaxResult');
}

TagCompleter.InputLine.prototype = {
    /*
    get prefs() {
        if (this._prefs) {
            this._prefs = new Prefs('extensions.hatenabookmark.addPanel.');
        }
        return this._prefs;
    },
    */
    get value() this._text,
    set value(val) {
        this._text = val;
    },
    get tags() this.cutoffComment(this.value)[1],
    get body() this.cutoffComment(this.value)[0],
    addTag: function(tagName) {
        let val = this.value;
        let lastIndex = val.lastIndexOf(']');
        if (lastIndex == -1) {
            this.value = '[' + tagName + ']' + val;
        } else {
            let prefix = val.substring(0, lastIndex + 1);
            let suffix = val.substr(lastIndex + 1);
            this.value = prefix + '[' + tagName + ']' + suffix;
        }
        this.uniqTextTags();
    },
    deleteTag: function(tagName) {
        let [comment, tags] = this.cutoffComment(this.value);
        tags = tags.filter(function(t) tagName != t);
        this.updateByCommentTags(comment,tags);
    },
    posWord: function(pos) {
        if (pos == 0) return null;
        let val = this.value;
        if (val.indexOf('[') == -1) return null;
        let lastIndex = val.lastIndexOf('[', pos);
        if (lastIndex >= pos) {
            return null;
        }
        let firstIndex = val.indexOf(']', pos);
        if (firstIndex < pos && (firstIndex != -1)) {
            return null;
        }
        val = val.substring(lastIndex + 1, pos);
        if (val.indexOf(']') != -1) {
            // wow
            return null;
        }
        return val;
    },
    migemoSuggest: function(word) {
        let regex = new RegExp(XMigemoTextUtils.getANDFindRegExpFromTerms(XMigemoCore.getRegExps(word, 'gi')));
        let words = [];
        let suggestTags = this.suggestTags;
        let limit = this.maxSuggest;
        for (let i = 0, len = suggestTags.length;  i < len; i++) {
            let tKey = suggestTags[i];
            if (regex.test(tKey)) {
                if (!words.some(function(w) w == tKey))
                    words.push(tKey);
            }
            if (words.length >= limit) break;
        }
        return words;
    },
    suggest: function(pos) {
        let word = this.posWord(pos);
        if (!word) return [];
        
        if (this.useMigemo && XMigemoCore) {
            return this.migemoSuggest(word);
        } 

        let limit = this.maxSuggest;
        let words = [];
        let w = word.toUpperCase();
        let spaceMatched = function(tKey, index, ws, first) {
            if (ws.length == 0) return true;
            let i;
            if (((i = tKey.indexOf(ws.shift(), index)) >= 0) && !(first && i != 0)) {
                return spaceMatched(tKey, i+2, ws, false);
            }
            return false;
        }

        let sep = w.split(/\s+/);
        let ws = [];
        for (let i = 0;  i < sep.length; i++) {
            if (sep[i]) ws.push(sep[i]);
        }

        let suggestTags = this.suggestTags;
        for (let i = 0, len = suggestTags.length;  i < len; i++) {

            let tKey = suggestTags[i];
            if (spaceMatched(tKey.toUpperCase(), 0, Array.prototype.slice.apply(ws), true)) {
                if (!words.some(function(w) w == tKey))
                    words.push(tKey);
            }
            if (words.length >= limit) break;
        }
        return words;

    },
    insertionTag: function(tagName, pos) {
        let value = this.value;
        let prefix = value.substring(0, pos);
        let suffix = value.substring(pos);
        let lPos = prefix.lastIndexOf('[');
        if (lPos == -1) return false;
        prefix = prefix.substring(0, lPos + 1) + tagName + ']';
        if (suffix.indexOf(']') == 0) {
            // '[tag]]examle' とならないように
            suffix = suffix.substring(1);
        }
        this.value = prefix + suffix;
        return prefix.length;
    },
    updateByCommentTags: function(comment, tags) {
        let text = comment;
        if (tags.length) {
            text = '[' + tags.join('][') +']' + text;
        }
        this.value = text;
    },
    uniqTextTags: function() {
        // input の文字列がいきなりかわると嫌なので、明示的に行う
        let [comment, tags] = this.cutoffComment(this.value);
        this.updateByCommentTags(comment,tags);
    },
    cutoffComment: function(str) {
        let re = /\[([^\[\]]+)\]/g;
        let match;
        let tags = [];
        let lastIndex = 0;
        while ((match = re.exec(str))) {
            lastIndex += match[0].length; 
            if (lastIndex == re.lastIndex) {
                let tag = match[1];
                if (!tags.some(function(t) tag == t))
                    tags.push(match[1]);
            }
        }
        let comment = str.substring(lastIndex) || '';
        return [comment, tags];
    },
}

EventService.createListener('UserChange', function() {
    TagCompleter.clearTags();
}, User);

/*
EventService.createListener('BookmarksUpdated', function() {
    p('clearTags');
});
*/



