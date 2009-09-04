
const EXPORT = ["User"];
const MY_NAME_URL = B_HTTP + 'my.name';

var User;

if (shared.has('User')) {
    User = shared.get('User');
} else {
    /*
     * User オブジェクトは一つだけ
     */
    User = function User_constructor (name, options) {
        this._name = name;
        this.options = options || {};
    };

    extend(User, {
        login: function User_loginCheck () {
            net.post(MY_NAME_URL, User._login, User.loginErrorHandler,
                     true, null, { Cookie: 'rk=' + User.rk });
        },
        _login: function User__login(res) {
            res = decodeJSON(res.responseText);
            if (res.login) {
                User.setUser(res);
                return User.user;
            } else {
                User.clearUser();
                return false;
            }
        },
        loginErrorHandler: function User_loginErrorHandler(res) {
            p('login errro...');
        },
        logout: function User_clearUser () {
            this.clearUser();
        },
        clearUser: function() {
            if (this.user) {
                this.user.clear();
                delete this.user;
            }
        },
        setUser: function User_setCurrentUser (res) {
            let current = this.user;
            if (current) {
                if (current.name == res.name) {
                    current.options.rks = res.rks;
                    current.options.plususer = res.plususer;
                    current.options.ignores_regex = res.ignores_regex;
                    delete current._ignores;
                    return current;
                }
                this.clearUser();
            }
            let user = new User(res.name, res);
            this.user = user;
            EventService.dispatch('UserChange', this);
        },
        rk: (function User_getRk() {
            let cookies = getService("@mozilla.org/cookiemanager;1",
                                     Ci.nsICookieManager).enumerator;
            while (cookies.hasMoreElements()) {
                let cookie = cookies.getNext().QueryInterface(Ci.nsICookie);
                if (cookie.host === ".hatena.ne.jp" && cookie.name === "rk")
                    return cookie.value;
            }
            return "";
        })()
    });
    
    User.prototype = {
        get name() this._name,
        get rk() User.rk,
        get plususer() this.options.plususer == 1,
        get rks() this.options.rks,
        get private() this.options.private == 1,
        get public() !this.private,
        get maxCommentLength() this.options.max_comment_length || 100,
        get ignores() {
            if (this.options.ignores_regex) {
                if (typeof this._ignores == 'undefined') {
                    try {
                        this._ignores = new RegExp(this.options.ignores_regex);
                    } catch(e) {
                        this._ignores = null;
                    }
                }
                return this._ignores;
            }
            return null;
        },
        get bCount() model('Bookmark').countAll(),
        hasBookmark: function user_hasBookmark(url) {
            let res = model('Bookmark').findByUrl(url);
            return res && res[0] ? true : false;
        },
        get database() {
            if (!this._db) {
                let dir = this.configDir;
                dir.append('bookmark.sqlite');
                this._db = new Database(dir);
                this._db.connection.executeSimpleSQL('PRAGMA case_sensitive_like = 1');
            }
            return this._db;
        },
        get dataURL() sprintf(B_HTTP + '%s/search.data', this.name),
        get bookmarkHomepage() UserUtils.getHomepage(this.name, 'b'),
        getProfileIcon: function user_getProfileIcon(isLarge) {
            return UserUtils.getProfileIcon(this.name, isLarge);
        },

        clear: function user_clear() {
            if (this._db) {
                this._db.connection.close();
                p(this._name + "'s database is closed");
            }
        },

        get configDir() {
            let pd = DirectoryService.get("ProfD", Ci.nsIFile);
            pd.append('hatenabookmark');
            if (!pd.exists() || !pd.isDirectory()) {
                pd.create(Ci.nsIFile.DIRECTORY_TYPE, 0755);
            }
            pd.append(this.name);
            if (!pd.exists() || !pd.isDirectory()) {
                pd.create(Ci.nsIFile.DIRECTORY_TYPE, 0755);
            }
            return pd;
        }
    };

    /*
     * cookie observe
     */
    User.LoginObserver = {
        observe: function(aSubject, aTopic, aData) {
            if (aTopic != 'cookie-changed') return;

            let cookie = aSubject.QueryInterface(Ci.nsICookie2);
            if (cookie.host != '.hatena.ne.jp' || cookie.name != 'rk') return;
            /*
             * logout: deleted
             * login: added
             */
            switch (aData)
            {
                case 'added':
                case 'changed':
                    User.rk = cookie.value;
                    User.login();
                    break;
                case 'deleted':
                case 'cleared':
                    User.rk = "";
                    User.logout();
                    break;
                default:
                    break;
            }
        },
        QueryInterface: XPCOMUtils.generateQI([Ci.nsIObserver]),
    }
    User.OfflineObserver = {
        observe: function(aSubject, aTopic, aData) {
            if (aTopic == "network:offline-status-changed" && aState != "offline")
                User.login();
        },
        QueryInterface: XPCOMUtils.generateQI([Ci.nsIObserver]),
    }
    User.ApplicationObserver = {
        observe: function(aSubject, aTopic, aData) {
            if (aTopic == "quit-application-granted") {
                User.logout();
                User.removeObservers();
            }
        },
        QueryInterface: XPCOMUtils.generateQI([Ci.nsIObserver]),
    }
    User.addObservers = function User_s_addObservers() {
        ObserverService.addObserver(User.ApplicationObserver, 'quit-application-granted', false);
        ObserverService.addObserver(User.LoginObserver, 'cookie-changed', false);
        ObserverService.addObserver(User.OfflineObserver, 'network:offline-status-changed', false);
    };
    User.removeObservers = function User_s_removeObservers() {
        ObserverService.removeObserver(User.ApplicationObserver, 'quit-application-granted');
        ObserverService.removeObserver(User.LoginObserver, 'cookie-changed');
        ObserverService.removeObserver(User.OfflineObserver, 'network:offline-status-changed');
    };
    User.addObservers();

    User.LoginChecker = new Timer(1000 * 60 * 15); // 15 分
    User.LoginChecker.createListener('timer', function() {
        if (!User.user) {
            User.login();
        }
    });
    User.LoginChecker.start();

    EventService.createListener('firstPreload', function() {
        // 初回時はログインチェックする
        User.login();
        let preloadTimer = new Timer(5000, 5);
        preloadTimer.createListener('timer', function() {
            if (User.user) {
                preloadTimer.stop();
            } else {
                User.login();
            }
        });
        preloadTimer.stop();
    }, null, 10);

    shared.set('User', User);
};

