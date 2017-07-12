(function() {
  var transitionTimer;

  var loading = document.getElementById('loading');
  var main = document.getElementById('main');
  var callPrompt = document.getElementById('prompt');
  var callScript = document.getElementById('script');

  function getOrg(org) {
    function getRandomOrg() {
      var coinToss = Math.random();

      if (coinToss < .20) {
        return 'fp';
      } else if (coinToss < .60) {
        return 'dp';
      } else {
        return 'fftf';
      }
    }

    var orgs = {
      'dp': {
        code: 'dp',
        name: 'Demand Progress',
        url: 'https://demandprogress.org/',
        donate: 'https://secure.actblue.com/donate/nndayofaction?refcode=20170712-bftn'
      },
      'fp': {
        code: 'fp',
        name: 'Free Press Action Fund',
        url: 'https://www.freepress.net/',
        donate: 'https://freepress.actionkit.com/donate/single/'
      },
      'fftf': {
        code: 'fftf',
        name: 'Fight for the Future',
        url: 'https://www.fightforthefuture.org/',
        donate: 'https://donate.fightforthefuture.org/campaigns/bftnlanding/'
      }
    };

    return orgs.hasOwnProperty(org) ? orgs[org] : orgs[getRandomOrg()];
  }

  function getTheme(theme) {
    var themeObj;

    switch(typeof theme === 'string' ? theme : '') {
      case 'money':
        themeObj = {
          className: theme,
          logos: ['images/money.png'],
          headline: 'Please upgrade your plan to proceed.',
          body: 'Just kidding. You can still get to this site *for now*. But if the FCC ends net neutrality, your cable company could charge you extra fees just to use the websites and apps you want. We can stop them and keep the Internet open, fast, and awesome if we all contact the U.S. Congress and the FCC, but we only have a few days left.'
        };
        break;
      case 'stop':
        themeObj = {
          className: theme,
          logos: ['images/stop.png'],
          headline: 'This site has been blocked by your ISP.',
          body: 'Well, not yet. But without net neutrality, cable companies could censor websites, favoring their own business partners. We can stop them and keep the Internet open, fast, and awesome if we all contact the U.S. Congress and the FCC, but we only have a few days left.'
        };
        break;
      case 'slow':
        themeObj = {
          className: theme,
          logos: ['images/slow.png'],
          headline: 'Sorry, we\'re stuck in the slow lane.',
          body: 'Well, not yet. Cable companies want to get rid of net neutrality, so they can slow sites like ours to a crawl and shake us down for extra fees just to reach you. If they get their way, the Internet will never be the same. We can stop them and keep the web fast, open, and awesome if we all contact the U.S. Congress and the FCC, but we only have a few days left.'
        };
        break;
      case 'without':
      default:
        themeObj = {
          className: 'without',
          logos: ['images/stop.png'],
          headline: 'This is the web without net neutrality.',
          body: 'Cable companies want to get rid of net neutrality. Without it, sites like ours could be censored, slowed down, or forced to charge extra fees. We can stop them and keep the Internet open, fast, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
        break;
    }

    if (typeof theme == 'object') {
      var keys = Object.keys(theme);
      var key;
      for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        themeObj[key] = theme[key];
      }
    }

    return themeObj;
  }

  function renderContent(theme) {
    document.body.classList.add(theme.className);

    // Render logos
    var fragment = document.createDocumentFragment();
    var img;

    for (var i = 0; i < theme.logos.length; i++) {
      img = document.createElement('img');
      img.setAttribute('src', theme.logos[i]);
      fragment.appendChild(img);
    }

    document.getElementById('logos').appendChild(fragment);

    // Render headline and body copy
    document.getElementById('headline').textContent = theme.headline;

    var bodyFragment = document.createDocumentFragment();
    bodyFragment.textContent = theme.body + ' ';

    var learnMore = document.createElement('a');
    learnMore.setAttribute('href', 'https://www.battleforthenet.com/#widget-learn-more');
    learnMore.setAttribute('target', '_blank');
    learnMore.textContent = 'Learn more.';
    bodyFragment.appendChild(learnMore);

    document.getElementById('content').appendChild(bodyFragment);
  }

  function renderOrgRotation(org) {
    var fragment = document.createDocumentFragment();

    var orgInput = document.createElement('input');
    orgInput.setAttribute('type', 'hidden');
    orgInput.setAttribute('name', 'org');
    orgInput.setAttribute('value', org.code);
    fragment.appendChild(orgInput);

    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'opt_in');
    checkbox.setAttribute('checked', 'checked');
    fragment.appendChild(checkbox);

    var orgLink = document.createElement('a');
    orgLink.setAttribute('href', org.url);
    orgLink.setAttribute('target', '_blank');
    orgLink.textContent = org.name;
    fragment.appendChild(orgLink);

    var disclaimer = document.createElement('span');
    disclaimer.textContent = ' will contact you about future campaigns. FCC comments are public records.';
    fragment.appendChild(disclaimer);

    document.getElementById('rotation').appendChild(fragment);

    var donate = document.getElementById('donate');
    if (donate && org.donate) donate.setAttribute('href', org.donate);
  }

  function addCloseListeners() {
    // Add close button listener.
    document.getElementById('close').addEventListener('mousedown', function(e) {
      e.preventDefault();
      sendMessage('stop');
    });

    document.getElementById('background').addEventListener('mousedown', function(e) {
      // Ignore events that propagate up
      if (e.target == document.getElementById('background')) sendMessage('stop');
    });
  }

  function sendMessage(requestType, data) {
    data || (data = {});
    data.requestType = requestType;
    data.BFTN_IFRAME_MSG = true;
    parent.postMessage(data, '*');
  }

  function initGoogleAnalytics() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    if (typeof ga !== 'undefined') {
      ga('create', 'UA-26576645-40', 'auto');
      ga('send', 'pageview');
    }
  }

  var animations = {
    main: {
      options: {
        debug: false,
      },
      init: function(options) {
        for (var k in options) this.options[k] = options[k];

        renderContent(getTheme(this.options.theme));
        renderOrgRotation(getOrg(this.options.org));

        if (this.options.uncloseable) {
          document.getElementById('close').classList.add('hidden');
        } else {
          addCloseListeners();
        }

        if (!(this.options.disableGoogleAnalytics || navigator.doNotTrack)) initGoogleAnalytics();

        return this;
      },
      log: function() {
        if (this.options.debug) console.log.apply(console, arguments);
      }
    }
  }

  // Handle iframe messages
  window.addEventListener('message', function(e) {
    if (!e.data || !e.data.BFTN_WIDGET_MSG) return;

    delete e.data.BFTN_WIDGET_MSG;

    switch (e.data.requestType) {
      case 'putAnimation':
        animations[e.data.modalAnimation].init(e.data);
        break;
    }
  });

  function onError(e) {
    // TODO: Error handling
  }

  function onSuccess(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    // TODO: Error handling
    // if (e && e.code >= 400) return onError(e);

    if (loading) {
      loading.addEventListener('transitionend', showAfterAction);
      loading.classList.add('invisible');
    }

    transitionTimer = setTimeout(showAfterAction, 500);
  }

  function showAfterAction(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    if (callPrompt) callPrompt.classList.remove('invisible');

    if (main) {
      main.classList.add('invisible');
      main.classList.add('hidden');
    }

    if (loading) loading.classList.add('hidden');
  }

  // Handle form submission
  var form = document.getElementById('form');
  form.addEventListener('submit', function submitForm(e) {
    e.preventDefault();

    // Prefill after-action call form
    var userPhone = document.getElementById('userPhone');
    var phone = document.getElementById('phone');
    if (userPhone && phone && phone.value) userPhone.value = phone.value;

    var postcode = document.getElementById('postcode');

    var protest = document.getElementById('protest');
    if (postcode && postcode.value) {
      protest.setAttribute('href', [protest.href, '?zipcode=', postcode.value].join(''));
    }

    var zipcode = document.getElementById('zipcode');
    if (postcode && postcode.value && zipcode) zipcode.value = postcode.value;

    var footer = document.getElementById('footer');
    if (footer) {
      footer.classList.remove('hidden');
      footer.classList.remove('invisible');
    }

    if (callPrompt) callPrompt.classList.remove('hidden');
    if (main) main.classList.add('hidden');

    // TODO: Add config option to skip real submit?
    // loading.addEventListener('transitionend', onSuccess);
    // transitionTimer = setTimeout(onSuccess, 500);

    var source = document.getElementById('source');
    if (source) source.value = document.referrer;

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    // TODO: Error handling
    xhr.addEventListener('error', onSuccess);
    xhr.addEventListener('load', onSuccess);

    xhr.open(form.getAttribute('method'), form.getAttribute('action'), true);
    xhr.send(formData);

    if (loading) {
      loading.classList.remove('hidden');
      loading.classList.remove('invisible');
    }
  });

  function showCallScript(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    if (callScript) {
      callScript.classList.remove('hidden');
      callScript.classList.remove('invisible');
    }

    if (callPrompt) {
      callPrompt.classList.add('invisible');
      callPrompt.classList.add('hidden');
    }

    if (loading) loading.classList.add('hidden');
  }

  function onCall(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    if (loading) {
      loading.addEventListener('transitionend', showCallScript);
      loading.classList.add('invisible');
    }

    transitionTimer = setTimeout(showCallScript, 500);
  }

  var call = document.getElementById('call');
  call.addEventListener('submit', function submitCall(e) {
    e.preventDefault();

    var formData = new FormData(call);
    var xhr = new XMLHttpRequest();

    if (loading) {
      loading.addEventListener('transitionend', onCall);
      loading.classList.remove('hidden');
      loading.classList.remove('invisible');
    }

    transitionTimer = setTimeout(onCall, 500);

    if (callPrompt) callPrompt.classList.add('invisible');

    xhr.open(call.getAttribute('method'), call.getAttribute('action'), true);
    xhr.send(formData);
  });

  // Send form field data to the video tool
  document.getElementById('video-link').addEventListener('click', function(e) {
    var full_name = document.getElementById('full_name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var postcode = document.getElementById('postcode').value;
    this.setAttribute('href', "https://video.battleforthenet.com?fcc_name="+full_name+"&fcc_email="+email+"&fcc_address="+address+"&fcc_postcode="+postcode);
  });

  // Start animation
  sendMessage('getAnimation');
})();
