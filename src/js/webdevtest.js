function getScript (src, callback) {
    var headElem = document.head || document.getElementsByTagName('head')[0];
    var script = document.createElement("script");
    var once = true;
    script.async = "async";
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.src = src;
    script.onload = script.onreadystatechange = function () {
        if (once && (!script.readyState || /loaded|complete/.test(script.readyState))) {
            once = false;
            callback();
            script.onload = script.onreadystatechange = null;
        }
    };
    headElem.appendChild(script);
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
    return "";
}

const dataProviderXML = () => ({
    preloadData: (path, callback) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange =() => {
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status >= 200 && request.status < 300) {
                    callback(request.responseText);
                } else {
                    console.error(path, "Couldn't load text " + path + ": status " + request.status + ", " + request.responseText);
                }
            }
        }
        request.open("GET", path, true);
        request.send();
    }
})


const dataParserJSON = () => ({
    parse: (text) => {
        var parsed;
        try {
            parsed = JSON.parse(text);
        } catch (e) {
            console.log("Parsing data failed");
        }
        
        return parsed;
    }
})

const dataLoader = (dataProvider, dataParser) => ({
    loadData: (path, callback) => {
        dataProvider.preloadData(path, (text) => {
            var data = dataParser.parse(text);
            if (data) {
                callback(data);
            } else {
                console.error("Could not load data.");
            }
        });
    }
})


class AbstractView {
    constructor(data) {
        this.data;
    }

    display() {
        console.error("Abstract View is abstract!");
    }
}

class ListView extends AbstractView {
    constructor(data) {
        super(data);
    }

    display() {
        console.log("List View");
    }
}

class PromotionView extends AbstractView {
    constructor(data, id) {
        super(data);
        this.id = id;
    }

    display() {
        console.log("Promo view: "+this.id);
    }
}

window.onload = () => {
    getScript('https://code.jquery.com/jquery-1.10.2.js', () => {

        dataHandler = Object.assign({}, dataLoader(dataProviderXML(), dataParserJSON()));

        dataHandler.loadData('js/webdevtest-data.js', (data) => {
            const promoId = getURLParameter("promo");
            let view;
            if (promoId) {
                view = new PromotionView(data, promoId);
            } else {
                view = new ListView(data);
            }
            view.display();
        })
    });
}

