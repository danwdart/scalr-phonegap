(function() {
    var App = function() {
        this.start = function() {
            if (!this.isLoggedIn()) {
                this.render('login');
            }
        }.bind(this);
        
        this.isLoggedIn = function() {
            return false;
        };

        this.render = function(tmpl) {
            this.get('tmpl/'+tmpl+'.html', function(data) {
                this.html('main', data);
            }.bind(this));
        }.bind(this);

        this.get = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function() {
                callback(xhr.responseText);
            });
            xhr.open('GET', url, true);
            xhr.send();
        };

        this.html = function(elems, data) {
            var domElems = document.querySelectorAll(elems);
            for (i = 0; i < domElems.length; i++) {
                domElems[i].innerHTML = data;
            }
        };
    },
    app = new App();
    app.start();
})();
