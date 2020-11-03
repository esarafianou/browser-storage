let secret1
const data = {}

function xssSubmit(event) {
  const payload = document.getElementById('payload').value;
  xss.innerHTML =  payload;
  event.preventDefault();
}

function storeInClosure() {
  const secret3 = document.getElementById('secret3').value;
  const request = new Request("http://localhost:3000/secret", {method: 'POST', body: '{"secret": "' + secret3 + '"}'});
  fetch(request)
  .then(response => {
    console.log('response')
  })
}
/*
 * Local fetch
 */
let localBackendSecret = (function() {
  let localFetch = window.fetch;
  async function localFetchBackendSecret() {
    let fetchedSecret;
    const request = new Request("http://localhost:3000/secret");
    let response = await localFetch(request)
    fetchedSecret = await response.json()
  }

  return {
    value: function() {
      return localFetchBackendSecret();
    }
  };
})();

/*
 * Override window.fetch to log the response
 * let fetch = window.fetch
 * window.fetch = async function() { let fetchPromise = fetch.apply(this, arguments); let resp = await fetchPromise ; let json = await resp.json(); console.log(json); return fetchPromise}
 */
let backendSecret = (function() {
  async function fetchBackendSecret() {
    let fetchedSecret;
    const request = new Request("http://localhost:3000/secret");
    let response = await window.fetch(request)
    fetchedSecret = await response.json()
  }

  return {
    value: function() {
      return fetchBackendSecret();
    }
  };
})();

function storeInMemory2() {
  const secret_2= document.getElementById('secret2').value;
  data['secret'] = secret_2
}

function storeInMemory() {
  secret_1 = document.getElementById('secret1').value;
}

window.onload = async () => {
  // XSS form
  const form = document.getElementById('xssform');
  const xss = document.getElementById('xss');
  form.addEventListener('submit', xssSubmit);


  //inMemory Function print
  const inMemoryFn = document.getElementById('inMemoryFn');
  inMemoryFn.innerHTML = storeInMemory.toString()

  //inMemory2 Function print
  const inMemoryFn2 = document.getElementById('inMemoryFn2');
  inMemoryFn2.innerHTML = storeInMemory2.toString()

  //fetchSecret Function print
  const fetchSecretFn = document.getElementById('fetchSecretFn');
  fetchSecretFn.innerHTML = `
  let backendSecret = (function() {
  async function fetchBackendSecret() {
    let fetchedSecret;
    const request = new Request("http://localhost:3000/secret");
    let response = await window.fetch(request)
    fetchedSecret = await response.json()
  }

  return {
    value: function() {
      return fetchBackendSecret();
    }
  };
})();
`


  //localFetchSecret Function print
  const localFetchSecretFn = document.getElementById('localFetchSecretFn');
  localFetchSecretFn.innerHTML = `
let localBackendSecret = (function() {
  let localFetch = window.fetch;
  async function localFetchBackendSecret() {
    let fetchedSecret;
    const request = new Request("http://localhost:3000/secret");
    let response = await localFetch(request)
    fetchedSecret = await response.json()
  }

  return {
    value: function() {
      return localFetchBackendSecret();
    }
  };
})();
`
document.querySelectorAll('pre code').forEach((block) => {
  hljs.highlightBlock(block);
});
};

