const rp = require('request-promise')
var express = require('express')
var router = express.Router()

function getHeaders() {
  const headers = {
    'Authorization': `Basic something=`,
    'Content-Type': 'application/json'
  }
  return headers
}


function sleep(milisecond) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, milisecond);
  })
}

async function fillImageInVariants(variants, imageId) {
  for (let i = 0; i < variants.length; i++) {
    let putBody = {
      'variant': {
        'id': variants[i].id,
        'image_id': imageId
      }
    }
    const options = {
      headers: getHeaders(),
      method: 'PUT',
      uri: `https://testtrigu.myshopify.com/admin/api/2019-04/variants/${variants[i].id}.json`,
      resolveWithFullResponse: true,
      body: putBody,
      json: true,
    }

    try {
      await rp(options)
      console.log(`successfully put imageid=${imageId} for id=${variants[i].id}`)
    } catch (err) {
      console.log(`unable to complete order for id=${variants[i].id}, error=${err.toString()}`)
    }
  }
}

async function createProduct() {
  let imageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJOwxB_MCf1SHSlM1mbfQKPbr9rlcGbV60lUQJlYrLY9tYxoRI',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vibrant-red-and-yellow-gazania-flower-royalty-free-image-594915222-1554736685.jpg',
    'https://www.arenaflowers.co.in/blog/wp-content/uploads/2017/09/Summer_Flowers_Lotus.jpg',
    'https://i.ytimg.com/vi/ZYifkcmIb-4/maxresdefault.jpg',
    'http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/03/Beautiful-Wallpaper-6.jpg',
    'http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/03/Beautiful-Wallpaper-5.jpg',
    'http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/03/Beautiful-Wallpaper-4.jpg',
    'http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/03/Beautiful-Wallpaper-3.jpg',
    'http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/03/Beautiful-Wallpaper-2.jpg',
    'http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/03/Beautiful-Wallpaper-1.jpg',
  ]

  let productsTitles = ['Shirt', 'Tshirt', 'Pants', 'Pullover', 'Sweater', 'Jeans', 'Bottles', 'Utensils', 'Mouse', 'Keyboard']
  let vendors = ['Motty', 'Varnar', 'Ledoitte', 'Azamon', 'Sasmung', 'Levies', 'Abibas', 'Beerok', 'Kine', 'PushHuuppies']

  let variantsArray = [
    [
      {
        "option1": "Blue",
        "option2": "M",
        "price": "1233",
        "sku": "1451",
        "inventory_quantity": 1000
      },
      {
        "option1": "Black",
        "option2": "L",
        "price": "457",
        "sku": "314",
        "inventory_quantity": 1000
      }
    ],
    [
      {
        "option1": "Black",
        "option2": "M",
        "price": "654",
        "sku": "1654",
        "inventory_quantity": 1000
      },
      {
        "option1": "Black",
        "option2": "L",
        "price": "857",
        "sku": "1857",
        "inventory_quantity": 1000
      }
    ],
    [
      {
        "option1": "Red",
        "option2": "M",
        "price": "1141",
        "sku": "1001",
        "inventory_quantity": 1000
      },
      {
        "option1": "Black",
        "option2": "XL",
        "price": "1041",
        "sku": "1002",
        "inventory_quantity": 1000
      }
    ],
    [
      {
        "option1": "Red",
        "option2": "M",
        "price": "1245",
        "sku": "1174",
        "inventory_quantity": 1000
      },
      {
        "option1": "Black",
        "option2": "XL",
        "price": "113",
        "sku": "1771",
        "inventory_quantity": 1000
      }
    ],
    [
      {
        "option1": "Red",
        "option2": "Half",
        "price": "533",
        "sku": "111",
        "inventory_quantity": 1000
      },
      {
        "option1": "Black",
        "option2": "Full",
        "price": "773",
        "sku": "987",
        "inventory_quantity": 1000
      }
    ]
  ]
  let optionsArray = [
    [
      {
        "name": "Color",
        "values": [
          "Blue",
          "Black",
          "Red"
        ]
      },
      {
        "name": "Size",
        "values": [
          "M",
          "L",
          "XL"
        ]
      }
    ],
    [
      {
        "name": "Color",
        "values": [
          "Blue",
          "Black",
          "Red"
        ]
      },
      {
        "name": "Size",
        "values": [
          "M",
          "L",
          "XL"
        ]
      }
    ],
    [
      {
        "name": "Color",
        "values": [
          "Blue",
          "Black",
          "Red"
        ]
      },
      {
        "name": "Size",
        "values": [
          "M",
          "L",
          "XL"
        ]
      }
    ],
    [
      {
        "name": "Color/Pattern",
        "values": [
          "Blue",
          "Black",
          "Red"
        ]
      },
      {
        "name": "Size",
        "values": [
          "M",
          "L",
          "XL"
        ]
      }
    ],
    [
      {
        "name": "Random",
        "values": [
          "Blue",
          "Black",
          "Red"
        ]
      },
      {
        "name": "Style",
        "values": [
          "Half",
          "Full"
        ]
      }
    ]
  ]

  let tagsArray = ['final_sale, random', 'finale_sale, Soft', 'Random, SOmething', 'Therethere, VeryGood', 'OnSale, final', null, 'Best', 'Bestest', 'JustArrived', 'BuyNow']

  let variantIndex = Math.floor(Math.random() * Math.floor(5))
  let product = {
    product: {
      title: `${productsTitles[Math.floor(Math.random() * Math.floor(10))]}_${Math.random()}`,
      body_html: productsTitles[Math.floor(Math.random() * Math.floor(10))],
      vendor: vendors[Math.floor(Math.random() * Math.floor(10))],
      product_type: vendors[Math.floor(Math.random() * Math.floor(10))],
      images: [
        {
          src: imageUrls[Math.floor(Math.random() * Math.floor(10))]
        }
      ],
      variants: variantsArray[variantIndex],
      options: optionsArray[variantIndex],
      tags: tagsArray[Math.floor(Math.random() * Math.floor(10))]
    }
  }

  const options = {
    headers: getHeaders(),
    method: 'POST',
    uri: `https://testtrigu.myshopify.com/admin/api/2019-04/products.json`,
    body: product,
    json: true,
    resolveWithFullResponse: true
  }
  try {
    let shopifyResponse = await rp(options);
    // console.log(`${JSON.stringify(shopifyResponse)}`)
    console.log(`created product with id=${shopifyResponse.body.product.id}, ${shopifyResponse.body.product.title}`)
    await fillImageInVariants(shopifyResponse.body.product.variants, shopifyResponse.body.product.image.id)
  } catch (err) {
    console.log(`Unable to send request- ${err.toString()}`)
  }
}

router.post('/draft', async function(req, res) {
  let body = req.body;
  res.status(200).send('ok')
  for (let i = 0; i < body.count; i++) {
    try {
      await createProduct();
      await sleep(1000)
    } catch (err) {
      console.log(`failed with error=${err.toString()}`)
    }
  }
})

module.exports = router