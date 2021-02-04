var express = require('express')
var router = express.Router()
const rp = require('request-promise')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('reached')
});

function sleep(milisecond) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, milisecond);
  })
}

function getHeaders() {
  const headers = {
    'Authorization': `Basic something=`,
    'Content-Type': 'application/json'
  }
  return headers
}

async function completeDraftOrder(shopifyResponse) {
  let id = shopifyResponse.draft_order.id
  const options = {
    headers: getHeaders(),
    method: 'PUT',
    uri: `https://testtrigu.myshopify.com/admin/api/2019-04/draft_orders/${id}/complete.json`,
    resolveWithFullResponse: true
  }

  try {
    await rp(options)
    // console.log(`successfully completed order for id=${id}`)
  } catch (err) {
    console.log(`unable to complete order for id=${id}, error=${err.toString()}`)
  }
}

async function createDraftOrder() {
  let variant_ids = [11307904303140,11307904335908,11307904368676,11307904401444,11307904466980,11307904499748,11307904368676,11141258739748,11307904565284,11307904532516]
  let variantId = variant_ids[Math.floor(Math.random() * Math.floor(10))]

  let customerIds = [1354346070052, 1354341416996, 1262652620836, 1140992409636]
  let customerId = customerIds[Math.floor(Math.random() * Math.floor(4))]
  let postBody = {
    "draft_order": {
      "line_items": [
        {
          "variant_id": variantId,
          "quantity": 1
        }
      ],
      "customer": {
        "id": customerId
      },
      "use_customer_default_address": true
    }
  }

  const options = {
    headers: getHeaders(),
    method: 'POST',
    uri: `https://testtrigu.myshopify.com/admin/api/2019-04/draft_orders.json`,
    body: postBody,
    json: true,
    resolveWithFullResponse: true
  }
  try {
    let shopifyResponse = await rp(options);
    // console.log(`placed draft order with id=${shopifyResponse.body.draft_order.id}, for variant=${variantId}`)
    await completeDraftOrder(shopifyResponse.body)
  } catch (err) {
    console.log(`Unable to send request- ${err.toString()}`)
  }
}

router.post('/draft', async function(req, res) {
  let body = req.body;
  res.status(200).send('ok')
  for (let i = 0; i < body.count; i++) {
    try {
      await createDraftOrder();
      await sleep(15000)
    } catch (err) {
      console.log(`failed with error=${err.toString()}`)
    }
  }
})

module.exports = router;
