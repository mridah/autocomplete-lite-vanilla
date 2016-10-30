/*
    Written by mridul ahuja
    HOW TO USE :
        >> Load JQuery library
        >> Load autocomplete-lite.js library
        >> Initialize autocomplete on element and pass autocomplete list as an array
     
           EXAMPLE :
               <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
               <script src="autocomplete-lite-vanilla.js"></script>
               <input type="text" id="autocomplete_input">
               <script>
                   var a = document.getElementById('autocomplete_input');

                   // initializing
                   a.autocomplete_init(["aaa", "bbb", "ccc", "ddd", "eee", "fff"]);;
               </script>
*/

var mridautocomplete_timer = 0;

HTMLInputElement.prototype.autocomplete_init = function(data) {
    mridautocomplete(this, data);
};


function mridautocomplete(input, data) {

    input = $(input).get(0);

    var mridautocomplete_css = document.getElementById("mridautocomplete_css");

    if(!mridautocomplete_css )
    {
        var style_content = document.createElement('style');
        style_content.innerHTML = '.mridautocomplete-list::-webkit-scrollbar{width: 12px;}.mridautocomplete-list::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 2px;}.mridautocomplete-list::-webkit-scrollbar-thumb{border-radius: 2px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}';
        style_content.id = 'mridautocomplete_css';
        document.body.insertBefore(style_content, document.body.childNodes[0]);
    }
    
    var dataList = [];

    if (Array.isArray(data)) {
        dataList = dataList.concat(data);
    } else {
        console.error('Error : autocomplete-lite takes an array as parameter. ' + typeof data + ' given');
        return;
    }

    var matchData = function(input, dataList) {
        return dataList.filter(function(data) {
            data = data.toLowerCase();
            if (data.includes(input)) {
                return data;
            }
        });
    };

    var changeInput = function(input, dataList) {
        var val = input.value.toLowerCase();
        var inputAncestor = input.parentNode;

        var res = inputAncestor.getElementsByClassName('mridautocomplete-list');

        while(res.length == 0) {
            inputAncestor = inputAncestor.parentNode; 
            res = inputAncestor.getElementsByClassName('mridautocomplete-list');
        }


        res[0].innerHTML = '';
        res[0].style.display = 'none';

        var autoCompleteResult = matchData(val, dataList);
        if (val == "" || autoCompleteResult.length == 0) {
            return;
        }

        autoCompleteResult.forEach(function (e, idx) {

            /* CREATING AUTOCOMPLETE LIST ITEM */
            var p = document.createElement('p');
       
            /* STYLING THE NEW ITEM */
            p.style.margin = '0px';
            p.style.paddingLeft = parseInt(getStyle(input, 'paddingLeft'),10) + parseInt(getStyle(input, 'borderLeftWidth'),10);
            p.style.textAlign = 'left';
            p.style.fontSize = getStyle(input, 'fontSize');
            p.style.cursor = 'default';
            p.style.display = 'block';

            /* ADDING CLASS TO ITEM */
            if (p.classList)
                p.classList.add('mrid-autocomplete-item');
            else
                p.className += ' mrid-autocomplete-item';

            e = e.toLowerCase();

            var first_part = e.split(val)[0];
            var second_part = e.split(val).splice(1).join(val); 

            /* ADDING CONTENT TO ITEM */
            p.innerHTML = first_part + '<span style="color: #4682B4; font-weight: bold;">' + val + '</span>' + second_part;

            input.nextSibling.style.display = 'block';

            pHTML = p.outerHTML;
            res[0].innerHTML += pHTML;
        });

    };

    /* ADDING EVENT LISTENERS */
    document.querySelector('body').addEventListener('click', function(event) {
        if (event.target.tagName.toLowerCase() === 'p' && event.target.classList == 'mrid-autocomplete-item') {
            input.value = event.target.textContent;
            res.innerHTML = '';
            res.style.display = 'none';
        }
    });

    document.querySelector('body').addEventListener('mouseover', function(event) {
        if (event.target.tagName.toLowerCase() === 'p' && event.target.classList == 'mrid-autocomplete-item') {
            event.target.style.backgroundColor = '#DCDCDC';
        }
    });

    document.querySelector('body').addEventListener('mouseout', function(event) {
        if (event.target.tagName.toLowerCase() === 'p' && event.target.classList == 'mrid-autocomplete-item') {
            event.target.style.backgroundColor = '#ffffff';
        }
    });

    var res = document.createElement('div');

    if (res.classList)
        res.classList.add('mridautocomplete-list');
    else
        res.className += ' mridautocomplete-list';
  

    insertAfter(res, input);


    if (getBrowser() == 'Internet Explorer')
    {
        res.style.left = input.clientLeft;
    }
    else
    {
        res.style.left = input.offsetLeft;
    }

    res.style.left = input.offsetLeft;
    res.style.width = getStyle(input, 'width');
    res.style.position = 'absolute';
    res.style.border = '1px solid #dddddd';
    res.style.maxHeight = '150px';
    res.style.overflow = 'scroll';
    res.style.overflowX = 'hidden';
    res.style.fontFamily = getStyle(input, 'fontFamily');
    res.style.fontSize = getStyle(input, 'fontSize');
    res.style.zIndex = '10';


    document.getElementById(input.id).onkeyup = function (e) {
        clearTimeout(mridautocomplete_timer);
        mridautocomplete_timer = setTimeout(function() {
                changeInput(input, dataList);
        }, 100);
    };

    
    document.getElementById(input.id).onkeydown = function (e) {
        clearTimeout(mridautocomplete_timer);
    };


    function search(input, dataList) {
        console.log(mridautocomplete_srch);
    }

  
    function appendHtml(el, elem_type, str) {
        var div = document.createElement(elem_type);
        div.innerHTML = str;
        while (div.children.length > 0) {
           el.appendChild(div.children[0]);
        }
    }


    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }


    function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    }


    function getStyle(el, styleProp) {
        var value, defaultView = (el.ownerDocument || document).defaultView;
        /* W3C STANDARD WAY */
        if (defaultView && defaultView.getComputedStyle) {
            /* SANITIZE PROPERTY NAME TO CSS NOTATION */
            /* (HYPHEN SEPARATED WORDS Eg. font-Size) */
            styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
            return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        } else if (el.currentStyle) { // IE
            /* SANITIZE PROPERTY NAME TO CAMELCASE */
            styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                return letter.toUpperCase();
            });
            value = el.currentStyle[styleProp];
            // CONVERT OTHER UNITS TO PIXELS ON IE
            if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
                return (function(value) {
                            var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                            el.runtimeStyle.left = el.currentStyle.left;
                            el.style.left = value || 0;
                            value = el.style.pixelLeft + "px";
                            el.style.left = oldLeft;
                            el.runtimeStyle.left = oldRsLeft;
                            return value;
                })(value);
            }
            return value;
        }
    }

    function getBrowser()
    {
        if (navigator.userAgent.search("MSIE") >= 0){
            return 'Internet Explorer';
        }
        else if (navigator.userAgent.search("Chrome") >= 0){
            return 'Chrome';
        }
        else if (navigator.userAgent.search("Firefox") >= 0){
            return 'Firefox';
        }
        else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){
            return 'Safari';
        }
        else if (navigator.userAgent.search("Opera") >= 0){
            return 'Opera';
        }
        else{
            return 'Other';
        }
    }

}